import { Component,  ChangeDetectorRef, ViewChild, TemplateRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { AXTranslator } from '@acorex/core';
import { AXProperyEditorComponent } from '../../property-editor.class';
import { AXPopupService } from '../../../popup/popup.service';
import { AXValidationFormComponent } from '../../../validation/validation-form.component';


export interface AXRangeModel {
    title: string;
    color?: string;
    minValue: number;
    maxValue: number;
}



@Component({
    templateUrl: './range.editor.html',
    styleUrls: ['./range.editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXRangePropertyEditorComponent extends AXProperyEditorComponent<AXRangeModel[]>  {


    private form: AXValidationFormComponent;

    @ViewChild('tplEdit')
    tplEdit: TemplateRef<any>;

    ranges: AXRangeModel[] = [];

    editRow: AXRangeModel;

    showSeparator: boolean = true;
    decimalNumber: number = 2;

    constructor(protected cdr: ChangeDetectorRef, private popupService: AXPopupService) {
        super(cdr);
    }


    ngOnInit() {
        this.ranges = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
        this.cdr.detectChanges();
    }


    ngAfterViewInit() {
        this.onRenderCompleted.emit();
    }

    // getRanges() {
    //     return this.ranges.sort((a, b) => a.minValue - b.minValue);
    // }

    onFormInit(e) {
        this.form = e.component;
    }


    handleEditClick(item: AXRangeModel) {
        this.editRow = Object.assign({}, item);
        const popup = this.popupService.open(this.tplEdit, {
            size: 'sm',
            footerButtons: [
                {
                    name: 'confirm',
                    text: AXTranslator.get('common.confirm'),
                    style: 'success',
                    submitBehavior: true,
                    cancelBehavior: false,
                    onClick: () => {
                        this.form.validate().then(c => {
                            if (c.result) {
                                super.handleValueChange(this.ranges);
                                Object.assign(item, this.editRow);
                                popup.close();
                                this.editRow = null;
                                this.cdr.detectChanges();
                            }
                        });
                    }
                },
                {
                    name: 'cancel',
                    text: AXTranslator.get('common.cancel'),
                    style: 'danger blank',
                    submitBehavior: false,
                    cancelBehavior: true,
                    onClick: () => {
                        popup.close();
                        this.editRow = null;
                        this.cdr.detectChanges();
                    }
                }
            ],
            title: AXTranslator.get('common.edit')
        });
    }

    handleAddClick() {
        const min = this.ranges?.length ? Math.max(...this.ranges.map(c => c.maxValue)) : 0;
        this.editRow = {
            title: '',
            minValue: min,
            maxValue: min + 1,
            color: null
        };
        const popup = this.popupService.open(this.tplEdit, {
            title: AXTranslator.get('common.add-item'),
            size: 'sm',
            footerButtons: [
                {
                    name: 'confirm',
                    text: AXTranslator.get('common.confirm'),
                    style: 'success',
                    submitBehavior: true,
                    cancelBehavior: false,
                    onClick: () => {
                        this.form.validate().then(c => {
                            if (c.result) {
                                super.handleValueChange(this.ranges);
                                this.ranges.push(this.editRow);
                                popup.close();
                                this.editRow = null;
                                this.cdr.detectChanges();
                            }
                        });
                    }
                },
                {
                    name: 'cancel',
                    text: AXTranslator.get('common.cancel'),
                    style: 'danger blank',
                    submitBehavior: false,
                    cancelBehavior: true,
                    onClick: () => {
                        popup.close();
                        this.editRow = null;
                        this.cdr.detectChanges();
                    }
                }
            ],
        });
        this.cdr.detectChanges();
    }

    handleRemoveClick(item: AXRangeModel) {
        this.ranges = this.ranges.filter(c => c.minValue !== item.minValue);
        super.handleValueChange(this.ranges);
    }

}
