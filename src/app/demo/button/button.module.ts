import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPage } from './button.page';
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
    AXDrawerModule,
    AXPageModule
} from '@acorex/components';
import { AXCoreModule } from '@acorex/core';

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
    AXDrawerModule,
    AXCoreModule,
    AXPageModule
];

@NgModule({
    declarations: [ButtonPage],
    imports: [CommonModule, ...MODULES],
    exports: [ButtonPage],
    providers: []
})
export class ButtonsPageModule { }