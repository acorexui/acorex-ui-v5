import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPage } from './calendar.page';
import { AXCalendarBoxModule } from '@acorex/components';

const MODULES = [AXCalendarBoxModule];

@NgModule({
    declarations: [CalendarPage],
    imports: [CommonModule, ...MODULES],
    exports: [CalendarPage],
    providers: []
})
export class CalendarPageModule {}
