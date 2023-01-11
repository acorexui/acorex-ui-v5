
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';

import { AXSchedulerViewType } from '../scheduler.class';
import { AXCalendarBoxComponent } from '../../calendar-box/calendar-box.component';

import { AXMenuItem, AXDateTime, AXDateTimeRange } from '@acorex/core';
import { AXToolbarItem } from '../../../toolbar/toolbar-item';
import { AXToolbarMenuComponent } from '../../../toolbar/menu/toolbar-menu.component';
import { AXPopoverComponent } from '../../../popover/popover.component';
import { AXValueEvent } from '../../../base/events.class';


@Component({
    selector: 'ax-toolbar-scheduler-navigator',
    template: `
    <div id="nav">
    <ax-toolbar-menu [items]="items"  (onItemClick)="onItemClick($event)"></ax-toolbar-menu>
    <ax-popover target="#nav" placement="bottom-end" alignment="top-end" #pop>
        <ax-calendar-box (onValueChanged)="onDateChange($event)" [depth]="viewDepth" #cal></ax-calendar-box>
    </ax-popover>
</div>`,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerNavigatorComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXToolbarSchedulerNavigatorComponent {
    constructor(private cdr: ChangeDetectorRef) { }

    @ViewChild(AXToolbarMenuComponent, { static: true })
    toolbar: AXToolbarMenuComponent;

    @ViewChild('pop', { static: true })
    pop: AXPopoverComponent;

    @ViewChild('cal', { static: true })
    cal: AXCalendarBoxComponent;

    viewDepth: string = 'day';


    items: AXMenuItem[] = [];

    ngAfterViewInit(): void {
        this.items = [
            {
                name: 'prev',
                startIcon: 'fas fa-angle-left',
                tooltip: 'Prev'
            },
            {
                name: 'today',
                text: 'Today',
                tooltip: 'Today'
            },
            {
                name: 'next',
                startIcon: 'fas fa-angle-right',
                tooltip: 'Next'
            },
            {
                name: 'current',

            }];
    }


    @Output()
    onNavigate: EventEmitter<'next' | 'back' | AXDateTime> = new EventEmitter<'next' | 'back' | AXDateTime>();

    onItemClick(e: AXMenuItem) {
        if (e.name === 'current') {
            this.pop.toggle();
        }
        else if (e.name === 'today') {
            this.goto(new AXDateTime());
        }
        else {
            this.onNavigate.emit(e.name as any);
            this.pop.close();
        }
    }


    onDateChange(e: AXValueEvent<AXDateTime>) {
        this.goto(e.value);
    }

    goto(date: AXDateTime) {
        this.onNavigate.emit(date);
        this.pop.close();
    }


    set(range: AXDateTimeRange, type: AXSchedulerViewType) {
        if (range) {
            let text: string = '';
            const calDate: AXDateTime = range.startTime;
            const sameDay = range.startTime.compaireNew(range.endTime, 'YMD') === 0;
            const sameMonth = range.startTime.compaireNew(range.endTime, 'YM') === 0;
            const sameYear = range.startTime.compaireNew(range.endTime, 'Y') === 0;
            if (type !== 'month' && sameDay) {
                text = range.startTime.format('MMMM DD, YYYY');
            }
            //
            else if (type !== 'month' && sameMonth && sameYear) {
                text = `${range.startTime.format('MMMM DD')} - ${range.endTime.format('DD, YYYY')}`;
            }
            else if (type !== 'month' && sameYear) {
                text = `${range.startTime.format('MMM DD')} - ${range.endTime.format('MMM DD, YYYY')}`;
            }
            else if (type !== 'month') {
                text = `${range.startTime.format('MMM DD, YYYY')} - ${range.endTime.format('MMM DD, YYYY')}`;
            }
            else if (type === 'month') {
                text = range.startTime.add('day', 15).format('MMMM YYYY');
            }
            this.items[3].text = text;
            if (type === 'month') {
                this.viewDepth = 'month';
            }
            else {
                this.viewDepth = 'day';
            }
            //
            this.cal.focusedValue = calDate;
            this.cal.navigate(calDate);
            this.pop.close();
            //
            this.toolbar.update();
        }
    }

}
