import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXProperyEditorComponent } from '@acorex/components';

@Component({
    templateUrl: './widget-size.editor.html'
})
export class AXWidgetSizePropertyEditorComponent extends AXProperyEditorComponent<number[]>  {

    sizeX: number;
    sizeY: number;

    minX: number = 1;
    maxX: number = 10;

    minY: number = 1;
    maxY: number = 10;


    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit() {
        if (Array.isArray(this.value)) {
            this.sizeX = this.value[0];
            this.sizeY = this.value[1];
        }
        else {
            this.sizeX = 2;
            this.sizeY = 2;
        }
    }

    handleMinValueChange(e: any) {
        this.sizeX = e.value;

        if (this.sizeY > 0) {
            super.handleValueChange([this.sizeX, this.sizeY]);
        }
    }

    handleMaxValueChange(e: any) {
        this.sizeY = e.value;
        if (this.sizeX > 0) {
            super.handleValueChange([this.sizeX, this.sizeY]);
        }
    }



    ngAfterViewInit() {
        this.onRenderCompleted.emit();
    }

}