import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXTextBoxComponent } from '../../../textbox/textbox.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
  templateUrl: './text.editor.html'
})
export class AXTextPropertyEditorComponent extends AXProperyEditorComponent<string> {
  @ViewChild(AXTextBoxComponent)
  private textBox: AXTextBoxComponent;

  validation: AXValidation;
  clearButton: boolean = false;
  mask: any;
  maskGuid: boolean = false;
  showMask: boolean = true;

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
