import {
  Component, Input, ChangeDetectorRef, ChangeDetectionStrategy,
  ViewEncapsulation, ContentChild, ViewChild, ElementRef
} from '@angular/core';
import { AXBaseComponent, AXBaseSizableComponent, AXElementSize, AXValidatableComponent } from '../base/element.class';

@Component({
  selector: 'ax-form-group',
  templateUrl: './form-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style:'width: 100%; display:contents;' }
})
export class AXFormGroupComponent extends AXBaseComponent implements AXBaseSizableComponent {
  @Input()
  size: AXElementSize = 'md';

  @ViewChild('div')
  div: ElementRef

  @ContentChild(AXValidatableComponent)
  private component: AXValidatableComponent;

  required: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }


  ngAfterViewInit(): void {
    this.required = this.component?.validation?.rules?.some(c => c.type === 'required');
    this.div.nativeElement.classList.add(this.size)
    if (this.required) {
      this.div.nativeElement.classList.add('required-state')
    }
  }

}
