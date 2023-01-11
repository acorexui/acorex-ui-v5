import { NgModule } from '@angular/core';
import { AXTreeViewComponent } from './tree-view.component';
import { CommonModule } from '@angular/common';
import { AXDataSourceModule } from '../data-source/datasource.module';
import { AXCheckBoxModule } from '../checkbox/checkbox.module';
import { AXContextMenuModule } from '../context-menu/context-menu.module';


@NgModule({
    declarations: [AXTreeViewComponent],
    imports: [AXDataSourceModule, CommonModule, AXCheckBoxModule, AXContextMenuModule],
    exports: [AXTreeViewComponent],
    providers: []
})

export class AXTreeViewModule { }