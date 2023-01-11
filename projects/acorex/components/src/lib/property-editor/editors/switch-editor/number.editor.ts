import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXProperyEditorComponent } from '../../property-editor.class';

@Component({
    template: `
        <ax-switch (onValueChanged)="handleValueChange($event)" [value]="value"></ax-switch>
    `,
})
export class AXSwitchPropertyEditorComponent extends AXProperyEditorComponent<boolean>  {



    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }


    handleValueChange(e: any) {
        super.handleValueChange(e.value);
    }

    ngAfterViewInit() {
        this.onRenderCompleted.emit();
    }

}
