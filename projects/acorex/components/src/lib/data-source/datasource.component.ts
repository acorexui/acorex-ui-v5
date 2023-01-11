import { Component, ContentChild, EventEmitter, Input } from "@angular/core";
import { AXDataSourceReadParams, AXDataSourceRead, AXDataSourceReceivedResult } from './read-param';
import { AXBaseEvent, AXValueEvent } from '../base/events.class';
import { AXDataEvent } from '../base/events.class';


export class AXDataSourceReceivedEvent extends AXDataEvent<AXDataSourceReceivedResult>
{

}


@Component({
    selector: "ax-data-source",
    template: "<ng-content></ng-content>"
})
export class AXDataSourceComponent {

    onDataReceived: EventEmitter<AXDataSourceReceivedEvent> = new EventEmitter<AXDataSourceReceivedEvent>();
    onFetchStart: EventEmitter<AXBaseEvent> = new EventEmitter<AXBaseEvent>();

    @Input()
    provideData: (params: AXDataSourceReadParams) => Promise<any>;

    @Input()
    params: any;

    fetch(params: AXDataSourceReadParams) {
        this.onFetchStart.emit({ component: this });
        if (this.provideData) {
            if (params === null) {
                params = this.params === undefined ? null : this.params;
            } else {
                params.extra = this.params;
            }

            //
            this.provideData(params).then(_data => {
                const data: AXDataSourceReceivedResult = new AXDataSourceReceivedResult();
                data.result = _data;
                data.requestId = params == null ? null : params.requestId;
                this.onDataReceived.emit({
                    component: this,
                    data: data
                });
            });
        }
    }

}
