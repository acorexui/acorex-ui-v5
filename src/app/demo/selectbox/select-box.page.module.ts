import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AXSelectBoxModule,
  AXTextBoxModule,
  AXDataSourceModule,
  AXLabelModule,
  AXPageModule,
  AXButtonModule,
  AXDropdownModule,
  AXCheckBoxModule,
  AXFormGroupModule
} from '@acorex/components';

import { SelectBoxPage } from './select-box.page';

@NgModule({
  declarations: [SelectBoxPage],
  imports: [
    CommonModule,
    AXSelectBoxModule,
    AXDataSourceModule,
    AXLabelModule,
    AXPageModule,
    AXButtonModule,
    AXDropdownModule,
    AXCheckBoxModule,
    AXTextBoxModule,
    AXButtonModule,
    AXFormGroupModule
  ],
  exports: [SelectBoxPage],
  providers: []
})
export class SelectBoxPageModule {}
