import { Component, ContentChild, TemplateRef, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'ax-row-template',
    template: `<ng-content></ng-content>`
})

export class AXDataGridRowTemplateComponent {
    @ContentChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    renderer: any;
    params: any;
    constructor() {
        this.renderer = AXDataGridRowTemplateRenderer;
    }
    ngOnInit(): void {
        this.params = {
            templateRef: this.templateRef
        }
    }
}

@Component({
    template: `<ng-container *ngTemplateOutlet='templateRef; context: { $implicit: data }'></ng-container>`
})

export class AXDataGridRowTemplateRenderer implements ICellRendererAngularComp {

    templateRef: TemplateRef<any>;

    data: any;

    refresh(params: any): boolean {
        return false;
    }

    agInit(params: any): void {
        this.data = params.data.callRecords;
        this.templateRef = params.templateRef;
    }
}