import { Component,  ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXTextBoxComponent } from '../../../textbox/textbox.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
    templateUrl: './textarea.editor.html',
})
export class AXTextareaPropertyEditorComponent extends AXProperyEditorComponent<string>  {


    @ViewChild(AXTextBoxComponent)
    private textBox: AXTextBoxComponent;


    validation: AXValidation;
    clearButton: boolean = false;
    placeholder: string = null;
    rows: number = 3;


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
