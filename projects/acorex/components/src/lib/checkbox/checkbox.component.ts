import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AXBaseComponent, AXBaseSizableComponent, AXBaseValueComponent, AXElementSize, AXValidatableComponent } from '../base/element.class';
import { AXValueEvent, AXHtmlEvent } from '../base/events.class';

export class AXCheckBoxItemClick extends AXHtmlEvent<MouseEvent> {
  value?: boolean;
}

@Component({
  selector: 'ax-check-box',
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AXValidatableComponent, useExisting: AXCheckBoxComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXCheckBoxComponent extends AXValidatableComponent implements AXBaseSizableComponent, AXBaseComponent, AXBaseValueComponent<boolean> {
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;

  @Input()
  readonly: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  size: AXElementSize = 'md';

  @Input()
  label: string = '';

  @Input()
  tabIndex: number = 0;

  @Input()
  indeterminate: boolean = false;

  focus(): void { }
  constructor(protected cdr: ChangeDetectorRef, private ref: ElementRef) {
    super();
  }
  // Value
  @Output()
  onValueChanged: EventEmitter<AXValueEvent<boolean>> = new EventEmitter<AXValueEvent<boolean>>();
  @Output()
  valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  @Output()
  onClick: EventEmitter<AXCheckBoxItemClick> = new EventEmitter<AXCheckBoxItemClick>();

  private _value?: boolean = false;
  public get value(): boolean {
    return this._value;
  }

  @Input()
  public set value(v: boolean) {
    if (v != this._value && v !== undefined) {
      const old = this._value;
      this._value = v;
      this.valueChange.emit(v);
      this.onValueChanged.emit({
        component: this,
        value: v,
        oldValue: old,
        htmlElement: this.ref.nativeElement
      });
    }
  }

  // handelChange(e) {
  //   const val = e.target.checked;
  //   this.value = val;
  // }

  ngOnInit(): void {
    if (!this.indeterminate && this.value == null) {
      this.value = false;
    }
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    //  setTimeout(() => {
    if (!this.disabled && !this.readonly) {
      //TODO: check intermddiate;
      this.value = !this.value;
      this.onClick.emit({
        component: this,
        htmlElement: this.ref.nativeElement,
        htmlEvent: e,
        value: this.value
      });
    }
    //  }, 100);
  }
}
