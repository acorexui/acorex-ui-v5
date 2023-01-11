import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXToolbarItem } from '../toolbar-item';
import { AXValueEvent } from '../../base/events.class';
import { AXBaseInputComponent } from '../../base/element.class';


@Component({
    selector: 'ax-toolbar-search',
    templateUrl: './toolbar-search.component.html',
    styleUrls: ['./toolbar-search.component.scss'],
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSearchComponent }]
})

export class AXToolbarSearchComponent {
    constructor() { }

    private searchChangeObserver: any;

    @ViewChild('input', { static: true }) inputSearch: ElementRef;

    @Output()
    onValueChanged: EventEmitter<AXValueEvent<string>> = new EventEmitter<AXValueEvent<string>>();

    private _text: string;
    @Input()
    public get text(): string {
        return this._text;
    }
    public set text(v: string) {
        if (v !== this._text) {
            const old = this._text;
            this._text = v;
            this.onValueChanged.emit({
                component: this,
                value: v,
                oldValue: old
            });
        }
    }

    public focus() {
        this.inputSearch.nativeElement.focus();
    }

    onSearchChanged(text: string) {
        if (!this.searchChangeObserver) {
            Observable.create(observer => {

                this.searchChangeObserver = observer;
            })
                .pipe(debounceTime(500))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    this.text = c;
                });
        }
        this.searchChangeObserver.next(text);
    }
}
