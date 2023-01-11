import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    AXTextBoxModule,
    AXButtonModule,
    AXFormGroupModule,
    AXLabelModule,
    AXDropdownModule,
    AXSelectBoxModule,
    AXDataSourceModule,
    AXCheckBoxModule,
    AXSearchBoxModule,
    AXSelectionListModule,
    AXPopupModule,
    AXDatePickerModule
} from '@acorex/components';
import { DateTimeFunctionPage } from './datetimefunction.page';


const MODULES = [
    AXTextBoxModule,
    AXButtonModule,
    AXFormGroupModule,
    AXLabelModule,
    AXDropdownModule,
    AXSelectBoxModule,
    AXDataSourceModule,
    AXCheckBoxModule,
    AXSearchBoxModule,
    AXSelectionListModule,
    AXPopupModule,
    AXDatePickerModule
];

@NgModule({
    declarations: [DateTimeFunctionPage],
    imports: [CommonModule, ...MODULES],
    exports: [DateTimeFunctionPage],
    providers: []
})
export class DateTimeFunctionPageModule { }