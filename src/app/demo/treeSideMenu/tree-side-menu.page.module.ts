import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeSideMenuPage } from './tree-side-menu.page';
import { AXDataSourceModule, AXButtonModule, AXTreeSideMenuModule } from '@acorex/components';

@NgModule({
    declarations: [TreeSideMenuPage],
    imports: [CommonModule, AXDataSourceModule, AXButtonModule, AXTreeSideMenuModule],
    exports: [TreeSideMenuPage],
    providers: [],
})

export class TreeSideMenuPageModule { }