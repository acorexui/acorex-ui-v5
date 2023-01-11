import { AXConditionalColorModel, propertyEditor } from '@acorex/components';
import { AXColorUtil, AXTranslator } from '@acorex/core';
import { AXWidgetComponent } from '@acorex/layout';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';

@Component({
    templateUrl: './query-scalar-widget.component.html',
    styleUrls: ['./query-scalar-widget.component.scss'],
    host: { style: ' height:100%;' }
})
export class QueryScalerWidgetComponent extends AXWidgetComponent implements OnInit {

    @propertyEditor({
        editorClass: 'ax/editors/text',
        title: 'common.title',
        order: 1,
    })
    title: string;


    @propertyEditor({
        editorClass: 'ax/editors/text',
        title: 'common.query',
        order: 3,
    })
    query: string;

    @propertyEditor({
        editorClass: 'ax/editors/text',
        title: 'common.description',
        order: 4,
    })
    description: string;

    @propertyEditor({
        editorClass: 'ax/editors/color',
        title: 'common.bgColor',
        order: 5,
    })
    backColor: string = '#1a8b99';

    foreColor: string = '#000000';

    val: number = 0;


    @propertyEditor({
        editorClass: 'ax/editors/conditional-color',
        title: 'دامنه ها',
        order: 5,
    })
    ranges2: AXConditionalColorModel[];

    get isConfigured(): boolean {
        return this.query != null;
    }


    constructor(private zone: NgZone, private cdr: ChangeDetectorRef, private ref: ElementRef<HTMLDivElement>) {
        super();
    }

    ngOnInit(): void {
        this.isBusy = false;
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
        if (this.isConfigured) {
            this.redraw();
        }
    }

    async redraw() {
        this.ref.nativeElement.style.setProperty('--size', `${this.widgetSize[1] * 8}px`);
        this.foreColor = this.findTextColor(this.backColor);
        const val = await this.getValue('query');
        if (Array.isArray(val) && val.length) {
            this.val = val[0].sourceField;
        }
        this.cdr.detectChanges();
    }

    findTextColor(color: string) {
        if (!color) {
            return '#000';
        }
        return !(AXColorUtil.contrastToWhite(color) > 2.0) ? '#000' : '#fff';
    }
}