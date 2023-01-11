import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AXSelectionListComponent } from '../../../selection-list/selection-list.component';
import { AXCheckBoxComponent } from '../../../checkbox/checkbox.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
  template: `
    <ax-selection-list
      [disabled]="disabled"
      [size]="size"
      [readonly]="readonly"
      [value]="value"
      [items]="items"
      [mode]="mode"
      (selectedItemsChange)="handleValueChange($event)"
      [direction]="direction"
      [(selectedItems)]="selectedItems"
    >
      <ax-validation [rules]="validation?.rules"> </ax-validation>
    </ax-selection-list>
  `
})
export class AXSelectionListPropertyEditorComponent extends AXProperyEditorComponent<any> {
  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }
  @ViewChild(AXSelectionListComponent, { static: true })
  private selectionList: AXSelectionListComponent;

  disabled: boolean = false;
  indeterminate: boolean = false;
  label: string;
  readonly: boolean = false;
  size: 'sm' | 'md' | 'lg' = 'md';
  validation: AXValidation;
  items: any = [];
  mode: 'multiple' | 'single' = 'single';
  direction: 'horizontal' | 'vertical' = 'horizontal';
  textField: string = null;
  valueField: string = null;
  selectedItems: any = [];

  handleValueChange(e: any) {
    super.handleValueChange(e);
  }

  ngAfterViewInit() {
    this.registerForValidationForm(this.selectionList);
    this.onRenderCompleted.emit();
  }
}
