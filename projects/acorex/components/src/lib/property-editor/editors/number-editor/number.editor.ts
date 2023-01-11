import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXNumberBoxComponent } from '../../../number-box/number-box.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
  template: `
    <ax-number-box
      (onValueChanged)="handleValueChange($event)"
      [value]="value"
      [showSeparator]="showSeparator"
      [decimalNumber]="decimalNumber"
      [min]="minValue"
      [max]="maxValue"
      [allowClear]="clearButton"
      [showCounter]="showCounter"
    >
      <ax-validation [rules]="validation?.rules"> </ax-validation>
    </ax-number-box>
  `
})
export class AXNumberBoxPropertyEditorComponent extends AXProperyEditorComponent<number> {
  showSeparator: boolean = true;
  decimalNumber: number = 2;
  minValue?: number = null;
  maxValue?: number = null;
  validation: AXValidation;
  clearButton: boolean = false;
  showCounter: boolean = true;

  @ViewChild(AXNumberBoxComponent)
  private textBox: AXNumberBoxComponent;

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }

  handleValueChange(e: any) {
    super.handleValueChange(e.value);
  }

  ngAfterViewInit() {
    this.registerForValidationForm(this.textBox);
    this.onRenderCompleted.emit();
  }
}
