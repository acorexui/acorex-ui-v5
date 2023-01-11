import { Component, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AXSchedulerBaseViewComponent } from '../scheduler-view.component';
import { AXSchedulerSlot, AXSchedulerEvent } from '../../scheduler.class';
import { AXDateTime, AXDateTimeRange } from '@acorex/core';

@Component({
    templateUrl: './scheduler-daytime-view.component.html',
    styleUrls: ['./scheduler-daytime-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerDayTimeViewComponent }]
})
export class AXSchedulerDayTimeViewComponent extends AXSchedulerBaseViewComponent {
    constructor(private elm: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef) { super(); }
    times: any[] = [];
    private vScroll: HTMLElement;
    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.vScroll = this.elm.nativeElement.querySelector<HTMLElement>('.v-scroll');
        this.header = this.elm.nativeElement.querySelector<HTMLElement>('.header');
        this.body = this.elm.nativeElement.querySelector<HTMLElement>('.body');
        this.view = this.elm.nativeElement.querySelector<HTMLElement>('.view');
        this.container = this.elm.nativeElement.closest('.view-container') as HTMLElement;
    }

    updateSize(): void {
        const firstTr = this.body.querySelector('tr');
        if (firstTr) {
            let index = 0;
            this.header.querySelectorAll('th').forEach(c => {
                const td = firstTr.children.item(index++) as HTMLElement;
                td.style.width = `${c.offsetWidth}px`;
            });
            this.vScroll.style.height = `calc(100% - ${this.header.clientHeight}px)`;
            if (this.container) {
                this.view.style.height = `${this.container.clientHeight}px`;
            }
        }
        this.arrangeEvents();
    }

    navigate(date: AXDateTime = new AXDateTime()) {
        this.times = [];
        this.slots = [];
        for (let i = 0; i < this.interval; i++) {
            const d = date.addDay(i);
            const range = new AXDateTimeRange(d, d);
            const slot: AXSchedulerSlot = {
                range,
                events: this.getEvents(range, 'day')
            };
            this.slots.push(slot);
        }
        for (let i = 0; i < 24; i++) {
            this.times.push({
                display: ('0' + i).slice(-2) + ':00',
                value: i
            });
        }
        this.navigatorDate = date;
        this.cdr.detectChanges();
    }

    next(): void {
        this.navigate(this.navigatorDate.addDay(this.interval));
    }
    prev(): void {
        this.navigate(this.navigatorDate.addDay(-this.interval));
    }

    arrangeEvents() {
        const events = this.elm.nativeElement.querySelectorAll<HTMLElement>('.event');
        if (events.length) {
            const height = events[0].closest('td').offsetHeight;
            events.forEach(e => {
                const uid = e.attributes.getNamedItem('data-uid').value;
                const event = this.events.find(c => c.uid === uid);
                const dur = Math.ceil(Math.abs(event.range.duration('hours')));
                let total = dur + 1;
                if (event.range.startTime.hour + total > 23) {
                    total = 24 - event.range.startTime.hour;
                }
                e.style.height = (total * height) + 'px';
            });
        }
    }

    findEventIndex(event: AXSchedulerEvent): number {
        const a = this.events.filter(c =>
            c.range.startTime.equal(event.range.startTime, 'day')
        ).sort((d1, d2) => {
            return d1.range.startTime.compaireNew(d2.range.startTime);
        });

        return a.indexOf(event);
    }
}
