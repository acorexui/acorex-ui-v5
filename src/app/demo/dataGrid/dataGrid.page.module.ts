import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridPage } from './dataGrid.page';
import { AXDataGridModule } from '@acorex/data-grid';
import {
  AXSelectBoxModule,
  AXDataSourceModule,
  AXTabViewModule,
  AXPageModule,
  AXToolbarModule,
  AXFilterModule,
  AXLabelModule,
  AXButtonModule
} from '@acorex/components';
import { AXSeparatorModule } from '@acorex/core';

@NgModule({
  declarations: [DataGridPage],
  imports: [
    CommonModule,
    AXDataGridModule,
    AXDataSourceModule,
    AXPageModule,
    AXLabelModule,
    AXTabViewModule,
    AXToolbarModule,
    AXFilterModule,
    AXSelectBoxModule,
    AXButtonModule,
    AXSeparatorModule
  ],
  exports: [DataGridPage],
  providers: []
})
export class DataGridPageModule {}
