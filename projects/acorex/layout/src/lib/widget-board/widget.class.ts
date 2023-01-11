import { EventEmitter, Injectable } from '@angular/core';
import { AXValueEvent, AXBaseEvent, propertyEditor, AXDataEvent } from '@acorex/components';
import { AXHtmlUtil, AXTranslator } from '@acorex/core';

export interface AXWidgetConfig {
    uniqueName: string;
    component: any;
    title: string;
    sizeX: number;
    sizeY: number;
    col?: number;
    row?: number;
    options?: any;
    props?: any;
    readonly?: boolean;
}

export interface AXWidgetConfigChanged extends AXBaseEvent {
    config: AXWidgetConfig;
}



export interface AXWidgetBoardConfigChanged extends AXBaseEvent {

}

export interface AXWidgetConfigSavedEvent extends AXDataEvent<AXWidgetSaveAsData> {

}


export interface AXWidgetSaveAsData {
    title?: string;
    description?: string;
    icon?: string;
    group?: string;
    //
    uniqueName: string;
    component: any;
    options?: any;
    props?: any;
}

// @dynamic
// TODO: Add Angular decorator.
@Injectable()
export abstract class AXWidgetComponent {

    readonly uid: string = AXHtmlUtil.getUID();
    provideValue: (e: any) => any;

    onBusyChanged: EventEmitter<AXValueEvent<boolean>> = new EventEmitter<AXValueEvent<boolean>>();

    private _isBusy: boolean = true;
    public get isBusy(): boolean {
        return this._isBusy;
    }
    public set isBusy(v: boolean) {
        if (v !== this._isBusy) {
            const eventData: AXValueEvent<boolean> = {
                component: this,
                oldValue: this._isBusy,
                value: v
            };
            this._isBusy = v;
            this.onBusyChanged.emit(eventData);
        }
    }

    @propertyEditor({
        editorClass: 'ax/editors/widget-size',
        title: 'common.size',
        visible: false,
        order: -99,
    })
    widgetSize: number[];

    @propertyEditor({
        editorClass: 'ax/editors/select',
        title: 'common.refresh-rate',
        visible: true,
        order: -98,
        editorOptions: {
            items: () => {
                return [1, 2, 3, 5, 10, 20, 30, 60].map(c => ({
                    id: 60000 * c,
                    text: AXTranslator.get('dateTime.duration.format_minute').replace('{0}', c.toString())
                }));
            },
            allowNull: false,
            allowSearch: false,
            selectionDataMode: 'value',
            selectionMode: 'single',
            valueField: 'id',
        }
    })
    refreshRate: any = [{
        id: 60000 * 5,
        text: AXTranslator.get('dateTime.duration.format_minute').replace('{0}', '5')
    }];

    // ???
    getRefreshRate() {
        return Array.isArray(this.refreshRate) && this.refreshRate.length ? this.refreshRate[0].id : this.refreshRate;
    }

    private intervalId: number;

    constructor() {
        this.onConfiguredChanged.subscribe(() => {
            if (this.isConfigured === true && this.getRefreshRate()) {
                this.restartRefreshTimer();
            }
            else {
                this.stopRefreshTimer();
            }
        });
    }


    private startRefreshTimer() {
        this.intervalId = window.setInterval(this.refresh.bind(this), this.getRefreshRate());
    }

    private stopRefreshTimer() {
        window.clearInterval(this.intervalId);
    }

    private restartRefreshTimer() {
        this.stopRefreshTimer();
        this.startRefreshTimer();
    }

    ngOnDestroy() {
        this.stopRefreshTimer();
    }

    public redraw() {

    }

    public refresh() {
        this.restartRefreshTimer();
    }

    onConfiguredChanged: EventEmitter<void> = new EventEmitter<void>();

    get isConfigured(): boolean {
        return true;
    }

    public setValue(name: string, value?: any) {
        this[name] = value;
        this.onConfiguredChanged.emit();
    }

    public getValue(name: string): Promise<any> {
        const val = this[name];
        const config = this['__meta__'].config;
        const runtime = config.props[name]?.runtime;
        if (runtime && this.provideValue) {
            const res = this.provideValue({
                name,
                value: val,
                uniqueName: config.uniqueName,
                options: config.options,
            });
            if (this.provideValue instanceof Promise) {
                return res;
            }
            else {
                return Promise.resolve(res);
            }
        }
        return Promise.resolve(val);
    }

}