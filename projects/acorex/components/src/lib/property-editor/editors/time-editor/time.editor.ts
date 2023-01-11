import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXDatePickerComponent } from '../../../date-picker/date-picker.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
    template: `
    <ax-time-picker [showCurentTime]="showCurentTime" [timeType]="timeType" [allowClear]="clearButton" (onValueChanged)="handleValueChange($event)">
        <ax-validation [rules]="validation?.rules">
        </ax-validation>
    </ax-time-picker>
         `,
})
export class AXTimePropertyEditorComponent extends AXProperyEditorComponent<String>  {


    timeType: any;
    validation: AXValidation;
    showCurentTime: boolean = false;
    clearButton: boolean = false;

    @ViewChild(AXDatePickerComponent)
    private time: AXDatePickerComponent;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    handleValueChange(e: any) {
        super.handleValueChange(e.value?.time);
    }

    ngAfterViewInit() {
        this.registerForValidationForm(this.time);
        this.onRenderCompleted.emit();
    }

}
