import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { AXBaseComponent, AXBaseSizableComponent, AXBaseValueComponent, AXElementSize } from '../base/element.class';
import { AXValueEvent } from '../base/events.class';

@Component({
  selector: 'ax-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXSwitchComponent extends AXBaseComponent implements AXBaseSizableComponent, AXBaseValueComponent<boolean> {


  @Output()
  onValueChanged: EventEmitter<AXValueEvent<boolean>> = new EventEmitter<AXValueEvent<boolean>>();

  @Output()
  valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  tabIndex: number = 0;

  private _value: boolean;
  @Input()
  public get value(): boolean {
    return this._value;
  }
  public set value(v: boolean) {
    if (this._value !== v) {
      const oldValue = this._value;
      this._value = v;
      this.valueChange.emit(v);
      this.onValueChanged.emit({
        component: this,
        oldValue,
        value: v
      });
    }
  }


  @Input()
  readonly: boolean;

  @Input()
  disabled: boolean;

  @Input()
  size: AXElementSize = 'md';

  constructor(protected cdr: ChangeDetectorRef) {
    super();
  }

  focus(): void { }
}
