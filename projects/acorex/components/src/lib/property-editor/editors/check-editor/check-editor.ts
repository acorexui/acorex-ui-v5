import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AXCheckBoxComponent } from '../../../checkbox/checkbox.component';
import { AXValidation } from '../../../validation/validation.component';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
    template: `
    <ax-check-box 
        [disabled]="disabled"
        [label]="label" 
        [size]="size"
        [indeterminate]="indeterminate"
        [readonly]="readonly"
        [value]="value"
        (onValueChanged)="handleValueChange($event)"
    >
        <ax-validation [rules]="validation?.rules">
        </ax-validation>
    </ax-check-box>
    `,
})
export class AXCheckBoxPropertyEditorComponent extends AXProperyEditorComponent<any>  {
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr)
    }
    @ViewChild(AXCheckBoxComponent, { static: true })
    private checkBox: AXCheckBoxComponent;

    disabled: boolean = false;
    indeterminate: boolean = false;
    label: string;
    readonly: boolean = false;
    size: 'sm' | 'md' | 'lg' = 'md';
    validation: AXValidation;

    handleValueChange(e: any) {
        super.handleValueChange(e.value);
    }

    ngAfterViewInit() {
        this.registerForValidationForm(this.checkBox);
        this.onRenderCompleted.emit();
    }
}
