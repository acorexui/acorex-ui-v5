import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXProperyEditorComponent } from '../../property-editor.class';
import { AXValidation } from '../../../validation/validation.component';
import { AXSelectBoxComponent } from '../../../selectbox/selectbox.component';

@Component({
    templateUrl: './selectbox.editor.html',
})
export class AXSelectBoxPropertyEditorComponent extends AXProperyEditorComponent<any>  {


    valueField: string = 'id';
    textField: string = 'text';
    selectionMode: string = 'single';
    selectionDataMode: string = 'value';
    allowSearch: boolean = true;
    allowNull: boolean = false;
    disabled: boolean = false;
    items: any = [];
    remoteOperation = false;

    validation: AXValidation;

    @ViewChild(AXSelectBoxComponent, { static: true })
    selectBox: AXSelectBoxComponent;



    private _filter: any;
    public get filter(): any {
        return this._filter;
    }
    public set filter(v: any) {
        this._filter = v;
        if (this.value && this.initiated) {
            this.value = null;
            this.selectBox?.refresh();
        }
    }


    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    handleValueChange(e: any) {
        super.handleValueChange(e.selectedValues);
    }

    ngAfterViewInit() {
        this.registerForValidationForm(this.selectBox);
        this.onRenderCompleted.emit();
    }

    provideData = (e): Promise<any> => {
        return new Promise((resolve) => {
            const func = () => {
                if (Array.isArray(this.items)) {
                    resolve(this.items.slice());
                }
                else if (typeof this.items === 'function') {
                    const a = Object.assign(e, { sender: this })
                    resolve(this.items(a));
                }
                else {
                    resolve([]);
                }
            };
            const intVal = setInterval(() => {
                if (this.initiated) {
                    func();
                    clearInterval(intVal);
                }
            },50);
        });
    }
}
