import { Component, ContentChild, TemplateRef, Input, ChangeDetectorRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'ax-grid-detail-template',
    template: `<ng-content></ng-content>`
})

export class AXDataGridDetailTemplateComponent {
    @ContentChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    renderer: any;
    params: any;
    constructor() {
        this.renderer = AXDataGridDetailTemplateRenderer;
    }
    ngOnInit(): void {
        this.params = {
            templateRef: this.templateRef
        }
    }

    @Input()
    height: number = 100;
}

@Component({
    template: `<ng-container *ngTemplateOutlet='templateRef; context: { $implicit: data }'></ng-container>`
})

export class AXDataGridDetailTemplateRenderer implements ICellRendererAngularComp {

    refresh(params: any): boolean {
        return false;
    }

    templateRef: TemplateRef<any>;
    data: any;

    agInit(params: any): void {
        this.data = params.data;
        this.templateRef = params.templateRef;
    }
}