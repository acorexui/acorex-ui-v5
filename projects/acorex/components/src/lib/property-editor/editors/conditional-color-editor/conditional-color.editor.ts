import { Component, ChangeDetectorRef, ViewChild, TemplateRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { AXObjectUtil, AXTranslator } from '@acorex/core';
import { AXDataType, AXProperyEditorComponent } from '../../property-editor.class';
import { AXPopupService } from '../../../popup/popup.service';
import { AXValidationFormComponent } from '../../../validation/validation-form.component';




export interface AXConditionalColorModel {
    color: string;
    operator: string;
    value: any;
    display?: string;
}



@Component({
    templateUrl: './conditional-color.editor.html',
    styleUrls: ['./conditional-color.editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXConditionalColorPropertyEditorComponent extends AXProperyEditorComponent<AXConditionalColorModel[]>  {


    form: AXValidationFormComponent;

    @ViewChild('tplEdit')
    tplEdit: TemplateRef<any>;

    @Input()
    dataType: AXDataType = 'number';

    // @Input()
    // mode: string[] = ['color', 'title'];

    operators: { value: string, text: string, dataTypes?: AXDataType[] }[] = [];

    ranges: AXConditionalColorModel[] = [];

    editRow: AXConditionalColorModel;

    showSeparator: boolean = true;
    decimalNumber: number = 2;

    booleanItems = [{ value: true, text: AXTranslator.get('queryBuilder.true') }, { value: false, text: AXTranslator.get('queryBuilder.false') }];

    constructor(protected cdr: ChangeDetectorRef, private popupService: AXPopupService) {
        super(cdr);
    }


    onFormInit(e) {
        this.form = e.component;
    }

    ngOnInit() {
        this.ranges = this.value ? AXObjectUtil.deepCopy(this.value) : [];
        this.updateOperations();
    }



    updateOperations() {
        this.operators = [
            {
                value: '<',
                text: AXTranslator.get('queryBuilder.lt'),
                dataTypes: ['string', 'number', 'date']
            },
            {
                value: '<=',
                text: AXTranslator.get('queryBuilder.lte'),
                dataTypes: ['string', 'number', 'date']
            },
            {
                value: '>',
                text: AXTranslator.get('queryBuilder.gt'),
                dataTypes: ['string', 'number', 'date']
            },
            {
                value: '>=',
                text: AXTranslator.get('queryBuilder.gte'),
                dataTypes: ['string', 'number', 'date']
            },
            {
                value: '==',
                text: AXTranslator.get('queryBuilder.equal'),
                dataTypes: ['string', 'boolean', 'number', 'date']
            },
            {
                value: '<>',
                text: AXTranslator.get('queryBuilder.not-equal'),
                dataTypes: ['string', 'boolean', 'number', 'date']
            }
        ].filter(c => c.dataTypes == null || c.dataTypes.includes(this.dataType)) as any;
    }


    ngAfterViewInit() {
        this.cdr.detectChanges();
        this.onRenderCompleted.emit();
    }

    handleEditClick(item: AXConditionalColorModel) {
        this.updateOperations();
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
        this.updateOperations();
        this.editRow = {
            value: this.getDefaultValue(),
            color: null,
            operator: '=='
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
    }
    getDefaultValue(): any {
        switch (this.dataType) {
            case 'boolean':
                return true;
            case 'number':
                return 0;
            default:
                return null;
        }
    }

    handleRemoveClick(item: AXConditionalColorModel) {
        this.ranges = this.ranges.filter(c => !(c.value === item.value && c.operator === item.operator));
        super.handleValueChange(this.ranges);
    }


    getTitle(opr: string) {
        const oprItem = this.operators.find(c => c.value === opr);
        return oprItem ? AXTranslator.get(oprItem.text) : '';
    }

    getIcon(opr: string) {
        switch (opr) {
            case '==':
                return 'fa-equals';
            case '<>':
                return 'fa-not-equal';
            case '<':
                return 'fa-less-than';
            case '<=':
                return 'fa-less-than-equal';
            case '>':
                return 'fa-greater-than';
            case '>=':
                return 'fa-greater-than-equal';
            default:
                return null;
        }
    }

}
