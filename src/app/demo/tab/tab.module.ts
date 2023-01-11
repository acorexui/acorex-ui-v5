import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTabPageModule, AXTabViewModule, AXTabStripModule } from '@acorex/components';
import { TabViewPage } from './tab.page';

const MODULES = [AXTabPageModule, AXTabViewModule, AXTabStripModule];

@NgModule({
    declarations: [TabViewPage],
    imports: [CommonModule, ...MODULES],
    exports: [TabViewPage],
    providers: []
})
export class TabViewModule {}
