import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,

} from '@angular/core';
import { AXWidgetConfig, AXWidgetSaveAsData } from './widget.class';
import { AXButtonItem, AXHtmlUtil, AXObjectUtil, AXTranslator } from '@acorex/core';
import { AXPropertyConfig, AXMenuItemClickEvent, AXBasePopupPageComponent } from '@acorex/components';



@Component({
    templateUrl: "./widget-save.component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXWidgetSaveComponent extends AXBasePopupPageComponent {
    config: AXWidgetConfig;
    props: AXPropertyConfig[] = [];
    displayProps: { name: string, title: string, allow: boolean }[];

    data: AXWidgetSaveAsData;

    getFooterButtons(): AXButtonItem[] {
        return [
            {
                name: 'okay',
                submitBehavior: true,
                text: AXTranslator.get('common.confirm'),
                style: 'ax success'
            },
            {
                name: 'cancel',
                cancelBehavior: true,
                text: AXTranslator.get('common.cancel'),
                style: 'ax light'
            }
        ];
    }

    ngOnInit() {
        const titleProp = this.props.find(c => c.property.name === 'title' || c.property.name === 'name');
        const title = titleProp?.value || this.config.title;
        const pp: any = {};
        this.props?.forEach(c => {
            pp[c.property.name] = c.property;
        });
        this.data = {
            component: this.config.component,
            title,
            uniqueName: `${this.config.uniqueName}-${AXHtmlUtil.getUID()}`,
            options: AXObjectUtil.deepJSONClone(this.config.options),
            props: AXObjectUtil.deepJSONClone(pp)
        };
        this.displayProps = this.props
            .filter(c => c.property.visible !== false)
            .sort((a, b) => a.property.order - b.property.order)
            .map(c => ({
                name: c.property.name,
                title: c.property.title,
                allow: true
            }));
    }



    onFooterButtonClick(e: AXMenuItemClickEvent) {
        if (e.name === 'cancel') {
            this.close();
        }
        if (e.name === 'okay') {
            this.props.forEach(p => {
                const pp = this.displayProps.find(c => c.name === p.property.name);
                if (pp == null || !pp.allow) {
                    let ppp = this.data.props[p.property.name];
                    if (ppp) {
                        ppp.visible = false;
                    }
                    else {
                        ppp = { visible: false };
                    }
                }
            });
            this.close(this.data);
        }
    }
}