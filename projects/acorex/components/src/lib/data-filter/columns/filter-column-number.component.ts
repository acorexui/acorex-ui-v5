import { Component, ChangeDetectorRef } from '@angular/core';
import { AXFilterCondition, AXFilterColumnComponent } from '../filter.class';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Observable } from 'rxjs';


@Component({
    selector: 'ax-filter-column-number',
    template: `
    <div class="ax-filter-section">
    <div>
        <select (ngModelChange)="onOperatorChange($event)" class="form-control form-control-sm"  [(ngModel)]="operator">
            <option *ngFor="let o of operators" value="{{o.value}}">
                {{o.title}}
            </option>
        </select>
    </div>
    <div>
        <ax-text-box placeholder="Type here" (textChange)="onTextChange($event)" [(value)]="value" *ngIf="operator!='is-not-empty' && operator!='is-empty'">
        </ax-text-box>
    </div>
</div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnNumberComponent }
    ]
})
export class AXFilterColumnNumberComponent extends AXFilterColumnComponent {

    operator: string = 'equal';

    operators: any[] = [
        {
            title: 'is',
            value: 'equal'
        },
        {
            title: `isn't`,
            value: 'not-equal'
        },
        {
            title: 'less than',
            value: 'less-than'
        },
        {
            title: 'less than or equal',
            value: 'less-than-equal'
        },
        {
            title: 'greater than',
            value: 'greater-than'
        },
        {
            title: 'greater than or equal',
            value: 'greater-than-equal'
        },
        {
            title: 'is empty',
            value: 'is-empty'
        },
        {
            title: `isn't empty`,
            value: 'is-not-empty'
        }
    ];
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }
    private searchChangeObserver: any;
    onOperatorChange(e) {

        this.valueChange.emit();

    }
    onTextChange(e) {
        // TODO: Check this method work correctly
        if (!this.searchChangeObserver) {
            return new Observable(observer => {
                this.searchChangeObserver = observer;
            })
                .pipe(debounceTime(500))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    this.valueChange.emit();
                });
        }
        this.searchChangeObserver.next(e);
    }

    get condition(): AXFilterCondition {
        return {
            condition: this.operator,
            field: this.field,
            dataType: 'number',
            value: this.value
        };
    }

}
