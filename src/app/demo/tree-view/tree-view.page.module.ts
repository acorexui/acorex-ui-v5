import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTreeViewModule, AXDataSourceModule, AXButtonModule } from '@acorex/components';

import { TreeViewPage } from './tree-view.page';

@NgModule({
    declarations: [TreeViewPage],
    imports: [
        CommonModule,
        AXTreeViewModule,
        AXDataSourceModule,
        AXButtonModule
    ],
    exports: [TreeViewPage],
    providers: [],
})
export class TreeViewPageModule { }