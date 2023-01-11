import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXPropertyConfig, AXBasePopupPageComponent, AXMenuItemClickEvent, AXProperyEditorValueChangeEvent, AXValidationFormComponent } from '@acorex/components';
import { AXButtonItem, AXTranslator } from '@acorex/core';
import { AXWidgetComponent } from './widget.class';


@Component({
    templateUrl: './widget-config.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AXWidgetConfigComponent extends AXBasePopupPageComponent {

    @ViewChild(AXValidationFormComponent) form: AXValidationFormComponent;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }


    widget: AXWidgetComponent;
    props: AXPropertyConfig[] = [];
    displayProps: AXPropertyConfig[] = [];


    changes: AXPropertyConfig[] = [];

    context: any = {};


    getFooterButtons(): AXButtonItem[] {
        return [
            {
                name: 'okay',
                submitBehavior: true,
                text: AXTranslator.get('common.confirm'),
                style: 'success'
            },
            {
                name: 'cancel',
                cancelBehavior: true,
                text: AXTranslator.get('common.cancel'),
                style: 'danger blank'
            }
        ];
    }





    onFooterButtonClick(e: AXMenuItemClickEvent) {
        if (e.name === 'cancel') {
            this.close();
        }
        if (e.name === 'okay') {
            this.form.validate().then(c => {
                if (c.result) {
                    this.close(this.changes);
                }
            });
        }
    }

    handleValueChange(e: AXProperyEditorValueChangeEvent) {
        const prop = this.changes.find(c => c.property.name === e.property.name);
        if (prop) {
            prop.value = e.value;
        }
        else {
            this.changes.push({ property: e.property, value: e.value });
        }
        this.updateContext();
    }

    ngOnInit() {
        this.displayProps = this.props.filter(c => c.property.visible !== false).sort((a, b) => a.property.order - b.property.order);
        this.updateContext();
    }


    private updateContext() {
        const ctx = {};
        this.props.forEach(p => {
            ctx[p.property.name] = p.value;
        });
        this.changes.forEach(p => {
            ctx[p.property.name] = p.value;
        });
        this.context = ctx;
    }


    identify(index, item: AXPropertyConfig) {
        return item.property.name;
    }

}