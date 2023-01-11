import { AXButtonItem, AXTranslator } from '@acorex/core';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AXBasePopupPageComponent } from '../../base/base-page.class';
import { AXMenuItemClickEvent } from '../../menu/menu.component';
import { AXQueryBuilderGroup, AXQueryBuilderPopup, AXQueryBuilderRule } from '../query-builder.class';

import { AXDataSourceReadParams } from '../../data-source/read-param'
import { AXToastService } from '../../toast/toast.service';
import { AXValidationFormComponent } from '../../validation/validation-form.component';
@Component({
    templateUrl: './query-builder-popup.component.html'
})

export class AXQueryBuilderPopupComponent extends AXBasePopupPageComponent {
    @ViewChild(AXValidationFormComponent) form: AXValidationFormComponent;
    constructor(private toast: AXToastService) {
        super();
    }
    group: AXQueryBuilderGroup;
    items: AXQueryBuilderRule[] = [];
    groupCopy: AXQueryBuilderGroup;
    complateValue: boolean = true;
    provideData: any;
    makeJsonString(items: any[]) {
        return new Promise((resolve, reject) => {
            items.forEach((element, index, array) => {
                if (element.items) {
                    this.makeJsonString(element.items);
                } else {
                    if (element.control && element.control.options && (element.control.options.dataSource === '' || element.control.options.dataSource === undefined)) {
                        element.control.options.dataSource = this.provideData;
                    }
                }
                if (index === array.length - 1) {
                    resolve(array[0]);
                }
            });
        });
    }
    ngAfterViewInit() {
        var groupString = JSON.stringify(this.group);
        this.groupCopy = JSON.parse(groupString);
        this.makeJsonString(this.groupCopy.items);
        for (let i = 0; i < this.groupCopy.items.length; i++) {
            this.getNoValueRule(this.groupCopy.items[i]);
        }
        if (this.items.length < 1) {
            this.close(this.group);
        }

    }
    getValue(v) {
        return v.indexOf('????') == 0 ? v.split('|')[1] : v;
    }
    getNoValueRule(gr) {
        // for (let i = 0; i < gr.items.length; i++) {
        if (gr.condition) {
            for (let i = 0; i < gr.items.length; i++) {
                this.getNoValueRule(gr.items[i]);
            }

        } else {
            if (gr.onDemandLabel?.indexOf('????') == 0) {
                this.items.push(gr);
            }
        }

        //  }
    }

    ngOnInit(): void {

    }


    textValueChange(e, rule) {
        rule.value = e.value;
        rule.text = e.value;

    }
    selectedItemsChange(e, rule) {
        let n = this.getOption('textField', rule);
        rule.text = e[0][n];
        if (rule && rule.control.options.valueField) {
            rule.value = e[0][rule.control.options.valueField];
        } else {
            rule.value = e[0].value;
        }
        rule.valueItem[0] = e[0];

    }
    valueChange(e, rule) {
        rule.value = e.value;
        rule.text = e.value;

    }
    valueBooleanChange(e, rule) {
        rule.text = e.value == undefined ? e[0].value : e.value;
        rule.value = e.value == undefined ? e[0].value : e.value;

    }
    getOption(name: string, rule) {
        return rule.control.options ? rule.control.options[name] : null;
    }
    getProvideData = (e: AXDataSourceReadParams) => {
        if (e.extra && e.extra.control.options && e.extra.control.options.dataSource) {
            return e.extra.control.options.dataSource({ ...e, optionsData: { ...e.extra.control.options } });
        }
    };

    provideDataBoolean = (e) => {
        return new Promise((resolve) => {
            resolve([
                {
                    value: 'true',
                    text: AXTranslator.get('queryBuilder.true')
                },
                {
                    value: 'false',
                    text: AXTranslator.get('queryBuilder.false')
                }

            ])
        })
    }

    findNullValue(gr) {
        for (let i = 0; i < gr.length; i++) {
            if (gr[i].value === null || gr[i].value === undefined || gr[i].value === '') {
                this.complateValue = false;
            }
        }


        // if (gr.condition) {
        //     for (let i = 0; i < gr.items.length; i++) {
        //         this.findNullValue(gr.items[i]);
        //     }

        // } else {
        //     if (gr.onDemandLabel?.indexOf('????') == 0 || gr.value === null || gr.value === undefined || gr.value === '') {
        //         this.complateValue = false;
        //     }
        // }

    }

    onFooterButtonClick(e: AXMenuItemClickEvent) {
        if (e.name === 'confirm') {
            this.form.validate().then(c => {
                if (c.result === true) {
                    this.close(this.groupCopy);
                }
            });
        }
        if (e.name === 'cancel') {
            this.close();
        }

    }

    getFooterButtons(): AXButtonItem[] {
        return [
            {
                text: AXTranslator.get('common.confirm'),
                name: 'confirm',
                style: 'ax primary',
                icon: 'far fa-check-circle'
            },
            {
                text: AXTranslator.get('common.cancel'),
                name: 'cancel',
                style: 'ax light',
                icon: 'far fa-times'
            }
        ]
    }
}