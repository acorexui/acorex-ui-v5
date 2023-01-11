import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupPage } from './popup.page';
import { AXButtonModule, AXPopoverModule } from '@acorex/components';

@NgModule({
    declarations: [PopupPage],
    imports: [CommonModule, AXButtonModule, AXPopoverModule],
    exports: [PopupPage],
    providers: [],
})
export class PopupPageModule { }