import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AXToolbarItem } from '../../toolbar/toolbar-item';
import { AXValueEvent } from '../../base/events.class';

export type AXListViewDirection = "vertical" | "vertical-wrap" | "horizontal-wrap" | "horizontal";

@Component({
    selector: 'ax-toolbar-list-view',
    template: `
    <div class="btn-group" role="group">
        <button type="button" class="btn btn-light btn-sm" *ngIf="vertical" [class.active]="direction=='vertical'"   (click)="direction='vertical'" title="vertical">
        <i class="far fa-bars"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm"  *ngIf="verticalWrap" [class.active]="direction=='vertical-wrap'" (click)="direction='vertical-wrap'" title="vertical-wrap">
        <i class="far fa-grip-horizontal"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm"  *ngIf="horizontalWrap" [class.active]="direction=='horizontal-wrap'" title="horizontal-wrap'" (click)="direction='horizontal-wrap'" title="horizontal-wrap">
        <i class="far fa-bars fa-rotate-90"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm"  *ngIf="horizontal" [class.active]="direction=='horizontal'" (click)="direction='horizontal'" title="horizontal">
        <i class="far fa-grip-horizontal fa-rotate-90"></i>
        </button>
    </div>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarListViewComponent }]
})
export class AXToolbarListViewComponent {
    constructor() { }

    @Input('vertical')
    vertical: boolean = true;

    @Input('vertical-wrap')
    verticalWrap: boolean = true;

    @Input('horizontal-wrap')
    horizontalWrap: boolean = true;

    @Input('horizontal')
    horizontal: boolean = true;


    @Output()
    onDirectionChanged: EventEmitter<AXValueEvent<AXListViewDirection>> = new EventEmitter<AXValueEvent<AXListViewDirection>>();

    private _direction: AXListViewDirection = "vertical";
    @Input()
    public get direction(): AXListViewDirection {
        return this._direction;
    }
    public set direction(v: AXListViewDirection) {
        if (v != this._direction) {
            const old = this._direction;
            this._direction = v;
            this.onDirectionChanged.emit({
                component: this,
                value: v,
                oldValue: old
            });
        }
    }

}
