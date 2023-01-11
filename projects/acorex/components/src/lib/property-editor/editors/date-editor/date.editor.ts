import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXDatePickerComponent } from '../../../date-picker/date-picker.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';
import { AXCalendarType } from '@acorex/core'

@Component({
    template: `
    <ax-date-picker [size]="size" [dateType]="dateType" [showToday]="showToday" [disabled]="disabled" [allowClear]="clearButton" [readonly]="readonly" [max]="max" [min]="min" [placeholder]="placeholder" [showTodayButton]="showTodayButton" [selectableHoliday]="selectableHoliday" (onValueChanged)="handleValueChange($event)"
             [type]="type" [textAlign]="textAlign" [(value)]="value">
             <ax-validation [rules]="validation?.rules">
            </ax-validation>
    </ax-date-picker>
         `,
})
export class AXDatePropertyEditorComponent extends AXProperyEditorComponent<Date>  {

    showTodayButton: boolean = true;
    selectableHoliday: boolean = true;
    type: AXCalendarType = 'gregorian';
    textAlign: 'right' | 'left' | null = null;
    validation: AXValidation;
    placeholder: string = ''
    min: Date;
    max: Date;
    readonly: boolean;
    disabled: boolean;
    clearButton: boolean = false;
    showToday: boolean = false;
    dateType: any;
    size: string = 'md';

    @ViewChild(AXDatePickerComponent)
    private date: AXDatePickerComponent;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    handleValueChange(e: any) {
        super.handleValueChange(e.value);
    }

    ngAfterViewInit() {
        this.registerForValidationForm(this.date);
        this.onRenderCompleted.emit();
    }

}
