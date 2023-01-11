import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LovPage } from './lov.page';
import { AXLOVModule, AXDataGridModule } from '@acorex/data-grid';
import { AXDataSourceModule, AXPageModule, AXButtonModule } from '@acorex/components';

@NgModule({
    declarations: [LovPage],
    imports: [CommonModule, AXLOVModule, AXDataGridModule, AXDataSourceModule, AXPageModule, AXButtonModule],
    exports: [LovPage],
    providers: [],
})
export class LovPageModule { }