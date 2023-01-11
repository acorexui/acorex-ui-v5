import {
    Component,
    ViewEncapsulation, Input,
    ElementRef, HostBinding, ComponentFactoryResolver, ViewChild,
    ViewContainerRef, Output, EventEmitter, ChangeDetectionStrategy,
    ChangeDetectorRef, ComponentRef
} from '@angular/core';
import { AXWidgetConfig, AXWidgetComponent, AXWidgetConfigChanged, AXWidgetConfigSavedEvent } from './widget.class';
import { AXObjectUtil, AXRenderService } from '@acorex/core';
import { AXPopupService, AXPropertyDecorators, AXPropertyDecorator, AXLoadingService } from '@acorex/components';
import { AXWidgetConfigComponent } from './widget-config.component';
import { AXMenuItem } from '@acorex/core';
import { AXTranslator } from '@acorex/core';
import { AXWidgetSaveComponent } from './widget-save.component';





@Component({
    selector: 'ax-widget-host',
    templateUrl: "./widget-host.component.html",
    host: { class: 'ax widget-host', tabindex: '0' },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AXWidgetHostComponent {

    private _widget: AXWidgetComponent;
    public get widget(): AXWidgetComponent {
        return this._widget;
    }

    _hasProps: boolean = false;


    _hasMenu: boolean = false;

    @Input()
    provideValue: (e: any) => any;


    get element(): HTMLDivElement {
        return this.ref.nativeElement;
    }


    configMenuItem: AXMenuItem[] = [
        {
            icon: 'far fa-ellipsis-h',
            items: []
        }
    ];


    @Output()
    onRemove: EventEmitter<AXWidgetHostComponent> = new EventEmitter<AXWidgetHostComponent>();

    @Output()
    onConfigChanged: EventEmitter<AXWidgetConfigChanged> = new EventEmitter<AXWidgetConfigChanged>();


    @Output()
    onResized: EventEmitter<AXWidgetConfigChanged> = new EventEmitter<AXWidgetConfigChanged>();

    @Output()
    onSave: EventEmitter<AXWidgetConfigSavedEvent> = new EventEmitter<AXWidgetConfigSavedEvent>();

    @Input()
    config: AXWidgetConfig;

    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;



    @Input()
    readonly: boolean = false;

    private componentRef: ComponentRef<any>;
    //private isLoading: boolean = true;

    // get isBusy() {
    //     return this._widget?.isBusy || this.isLoading;
    // }


    private _loadingId: number;

    private _isLoading: boolean = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }
    public set isLoading(v: boolean) {
        this._isLoading = v;
        if (this._loadingId && !v) {
            this.loadingService.hide(this._loadingId);
            this._loadingId = null;
        }
        if (v) {
            this._loadingId = this.loadingService.show(this.ref.nativeElement);
        }
    }


    get isConfigured(): boolean {
        return this._widget?.isConfigured || false;
    }


    constructor(
        private ref: ElementRef<HTMLDivElement>,
        private componentFactoryResolver: ComponentFactoryResolver,
        private rendererService: AXRenderService,
        private cdr: ChangeDetectorRef,
        private popup: AXPopupService,
        private loadingService: AXLoadingService

    ) {

    }


    ngOnInit() {
        this.isLoading = true;
    }


    async ngAfterViewInit() {
        let component: any;
        if (typeof this.config.component === 'string') {
            const route = await this.rendererService.findLoadedComponentByRoute(this.config.component, 20);
            component = route?.component;
        }
        else if (typeof this.config.component === 'function') {
            component = this.config.component;
        }
        if (component == null) {
            console.error(`Invalid Widget Component!`, this.config);
            this.onRemove.emit(this);
            return;
        }

        const widgetFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.componentRef = this.vc.createComponent(widgetFactory);
        this._widget = this.componentRef.instance as AXWidgetComponent;
        this._widget.provideValue = this.provideValue;
        if (this._widget.onBusyChanged) {
            this._widget.onBusyChanged.subscribe((d) => {
                if (!this._widget.widgetSize) {
                    this._widget.setValue('widgetSize', [this.sizeX, this.sizeY]);
                }
                else {
                    this.setSizeFromOptions();
                }
                this.isLoading = d.value;
                this.cdr.detectChanges();
            });
        }
        if (this._widget.onConfiguredChanged) {
            this._widget.onConfiguredChanged.subscribe(() => {
                this.setSizeFromOptions();
            });
        }
        //
        if (this.config.options) {
            Object.assign(this._widget, this.config.options);
        }
        this._hasProps = AXPropertyDecorators.getProperties(this._widget).length > 0;

        this.isLoading = false;
        this.config['__meta__'].instance = this;
        this._widget['__meta__'] = {};
        this._widget['__meta__'].config = this.config;
        //
        this.configMenuItem[0].items.push({
            name: 'refresh',
            icon: 'far fa-undo',
            text: AXTranslator.get('common.refresh'),
            onClick: () => {
                this?.widget?.refresh();
            }
        });
        //
        if (this._hasProps) {
            this.configMenuItem[0].items.push({
                name: 'configs',
                icon: 'far fa-cogs',
                text: AXTranslator.get('common.configs'),
                onClick: () => {
                    this.openConfigDialog();
                }
            });
        }
        this.configMenuItem[0].items.push({
            name: 'save',
            icon: 'far fa-save',
            text: AXTranslator.get('common.save-as'),
            onClick: () => {
                this.openSaveDialog();
            }
        });
        if (true) {
            this.configMenuItem[0].items.push({
                name: 'remove',
                icon: 'far fa-times',
                style: 'ax danger blank',
                text: AXTranslator.get('common.remove'),
                onClick: () => {
                    this.onRemove.emit(this);
                }
            });
        }
        this._hasMenu = this.configMenuItem[0].items.length > 0;
        this.cdr.detectChanges();
    }

    @HostBinding('attr.data-size-x')
    @Input()
    sizeX: number = 1;

    @HostBinding('attr.data-size-y')
    @Input()
    sizeY: number = 1;

    @HostBinding('attr.data-col')
    @Input()
    col: number = 1;


    @HostBinding('attr.data-row')
    @Input()
    row: number = 1;


    private setSizeFromOptions() {
        this._widget.getValue('widgetSize').then(c => {
            const oldSizeX = this.sizeX;
            const oldSizeY = this.sizeY;
            if (c && Array.isArray(c) && (oldSizeX !== c[0] || oldSizeY !== c[1])) {
                this.config.sizeX = this.sizeX = c[0];
                this.config.sizeY = this.sizeY = c[1];
                this.onResized.emit({
                    component: this._widget,
                    config: this.config
                });
            }
            this.cdr.detectChanges();
        });
    }

    remove(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.readonly)
            this.onRemove.emit(this);
        return false;
    }

    handleConfig(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.readonly)
            this.openConfigDialog();
        return false;
    }

    private openConfigDialog() {
        const ppp = this.getMergedProps();
        this.popup.open(AXWidgetConfigComponent, {
            title: AXTranslator.get('common.configs'),
            size: 'sm',
            data: {
                props: ppp.map(c => ({ property: c.options, value: this._widget[c.options.name] })),
                widget: this.widget
            }
        }).then(c => {
            if (c.data) {
                if (!this.config.options) {
                    this.config.options = {};
                }
                c.data.forEach(p => {
                    this._widget.setValue(p.property.name, p.value);
                    this.config.options[p.property.name] = p.value;
                });
                this.emitConfigChanged();
                this._widget.redraw();
                this.cdr.detectChanges();
            }
        });
    }

    private openSaveDialog() {
        const ppp = this.getMergedProps();
        this.popup.open(AXWidgetSaveComponent, {
            title: AXTranslator.get('common.save-as'),
            size: 'sm',
            data: {
                config: this.config,
                props: ppp.map(c => ({ property: c.options, value: this._widget[c.options.name] }))
            }
        }).then(c => {
            if (c.data) {
                this.onSave.emit({
                    component: this._widget,
                    data: c.data
                });
            }
        });
    }



    handleOptionClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.openConfigDialog();
        return false;
    }

    ngOnDestroy() {
        this.vc.clear();
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    private getMergedProps(): AXPropertyDecorator[] {
        const ppp = AXObjectUtil.deepCopy(AXPropertyDecorators.getProperties(this._widget)) as AXPropertyDecorator[];
        for (const key in this.config.props) {
            if (Object.prototype.hasOwnProperty.call(this.config.props, key)) {
                const newP = this.config.props[key];
                const existPropDec = ppp.find(p => p.property === key);
                if (existPropDec) {
                    Object.assign(existPropDec.options, newP);
                }
            }
        }
        return ppp;
    }

    private emitConfigChanged() {
        this.onConfigChanged.emit({
            component: this._widget,
            config: this.config
        });
    }

}