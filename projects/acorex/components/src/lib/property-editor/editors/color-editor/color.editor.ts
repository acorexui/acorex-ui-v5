import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXColorPickerComponent } from '../../../color-picker/color-picker.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
    template: `
        <ax-color-picker  [(value)]="value">
            <ax-validation [rules]="validation?.rules">
            </ax-validation>
        </ax-color-picker>
    `,
})
export class AXColorPropertyEditorComponent extends AXProperyEditorComponent<string>  {

    validation: AXValidation;

    @ViewChild(AXColorPickerComponent)
    private textBox: AXColorPickerComponent;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngAfterViewInit() {
        this.registerForValidationForm(this.textBox);
        this.onRenderCompleted.emit();
    }

}
