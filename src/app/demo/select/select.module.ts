import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPage } from './select.page';
import { AXDataSourceModule, AXSelectBoxModule, AXButtonModule } from '@acorex/components';

@NgModule({
  imports: [
    CommonModule,
    AXDataSourceModule,
    AXSelectBoxModule,
    AXButtonModule
  ],
  declarations: [SelectPage],
  exports: [SelectPage]
})
export class SelectPageModule { }
