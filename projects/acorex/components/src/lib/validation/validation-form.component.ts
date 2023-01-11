import {
  Component,
  OnInit,
  QueryList,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { AXValidationResult } from './validation.class';
import { AXValidatableComponent } from '../base/element.class';
import { AXBaseEvent } from '../base/events.class';
@Component({
  selector: 'ax-validation-form',
  template: '<ng-content></ng-content>'
})
export class AXValidationFormComponent {

  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) { }


  private widgets: AXValidatableComponent[] = [];


  @ContentChildren(AXValidatableComponent, { descendants: true })
  private widgetsQuery: QueryList<AXValidatableComponent>;

  @Input()
  validateOn: 'blur' | 'change' | 'submit' = 'submit';

  @Output()
  onInit: EventEmitter<AXBaseEvent> = new EventEmitter<AXBaseEvent>();


  ngAfterViewInit() {
    this.onInit.emit({
      component: this,
      htmlElement: this.ref.nativeElement
    });
  }

  validate(): Promise<AXValidationResult> {
    this.widgets.push(...this.widgetsQuery.toArray().filter(c => !this.widgets.includes(c)));
    //
    this.widgets.forEach(w => {
      if (w.validation && w.validation.validateOn == null) {
        w.validation.validateOn = this.validateOn;
      }
    });

    return new Promise<AXValidationResult>(resolve => {
      if (!this.widgets || this.widgets.length === 0) {
        return Promise.resolve({ result: true });
      }
      Promise.all(this.widgets.map((c) => c.validate())).then((rules: any) => {
        const failed = rules.filter((c: any) => !c.result);
        if (failed.length) {
          resolve({
            result: false,
            items: failed
          });
        }
        else {
          resolve({ result: true });
        }
      });
    });
  }


  addWidget(widget: AXValidatableComponent) {
    if(widget)
      this.widgets.push(widget);
  }

}
