import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerPage } from './datepicker.page';
import { AXDatePickerModule, AXCalendarBoxModule ,AXButtonModule} from '@acorex/components';
import { AXCoreModule } from '@acorex/core';


const MODULES = [AXDatePickerModule, AXCalendarBoxModule, AXCoreModule,AXButtonModule];

@NgModule({
    declarations: [DatePickerPage],
    imports: [CommonModule, ...MODULES],
    exports: [DatePickerPage],
    providers: []
})
export class DatePickerPageModule { }
