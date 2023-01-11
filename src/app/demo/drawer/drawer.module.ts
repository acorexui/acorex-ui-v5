import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  DrawerPage } from './drawer.page';
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
    AXCoreModule,
    AXPageModule,
    AXDrawerModule
];

@NgModule({
    declarations: [DrawerPage],
    imports: [CommonModule, ...MODULES],
    exports: [DrawerPage],
    providers: []
})
export class DrawerPageModule { }