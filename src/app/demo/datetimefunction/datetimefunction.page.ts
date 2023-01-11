import { Component, ViewChild } from '@angular/core';
import { AXDatePickerComponent } from '@acorex/components';
import { AXDateTime, AXCalendarMonth } from '@acorex/core';


@Component({
    templateUrl: './datetimefunction.page.html',
    styleUrls: ['./datetimefunction.page.scss']
})
export class DateTimeFunctionPage {
    constructor() { }

    date: AXDateTime = new AXDateTime();
    toISOString: string;
    toString: string;
    year: string;
    type: string;
    second: string;
    monthOfYear: string;
    //  month: AXCalendarMonth;
    minute: string;
    hour: string;
    firstDayOfWeek: string;
    endDayOfWeek: string;
    dayOfYear: string;
    dayInWeek: string;
    date_: string;
    dayP1: string;
    dayP2: string;
    monthP1: string;
    startOf: string;
    endOf: string;
    format: string;
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.date.dayInMonth;
        this.toISOString = this.date.toISOString();
        this.toString = this.date.toString();
        this.year = this.date.year.toString();
        this.type = this.date.type;
        this.second = this.date.second.toString();
        this.monthOfYear = this.date.monthOfYear.toString()
        //  this.month.range = this.date.month.range;
        this.minute = this.date.minute.toString();
        this.hour = this.date.hour.toString();
        this.firstDayOfWeek = this.date.firstDayOfWeek.toString();
        this.endDayOfWeek = this.date.endDayOfWeek.toString();
        this.dayOfYear = this.date.dayOfYear.toString();
        this.dayInWeek = this.date.dayInWeek.toString();
        this.date_ = this.date.date.toString();
        this.dayP1 = this.date.add('day', 1).toString();
        this.dayP2 = this.date.addDay(2).toString();
        this.monthP1 = this.date.addMonth(1).toString();
        this.startOf = this.date.startOf().toString();
        this.endOf = this.date.endOf().toString();
        this.format = this.date.format('YYYY').toString();
    }
}