import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPage } from './input.page';
import {
  AXTextBoxModule,
  AXFormGroupModule,
  AXButtonModule,
  AXSearchBoxModule,
  AXLabelModule,
  AXTextAreaModule,
  AXPasswordBoxModule,
  AXNumberBoxModule,
  AXTimePickerModule,
  AXDatePickerModule,
  AXValidationModule,
  AXPageModule,
  AXCheckBoxModule, AXSelectionListModule,
  AXTooltipModule,
  AXToolbarModule,
  AXDataSourceModule,
  AXSelectBoxModule
} from '@acorex/components';
import { AXLOVModule, AXDataGridModule } from '@acorex/data-grid';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AXPageModule,
    AXFormGroupModule,
    AXTextBoxModule,
    AXLabelModule,
    AXButtonModule,
    AXSearchBoxModule,
    AXLOVModule,
    AXTextAreaModule,
    AXPasswordBoxModule,
    AXNumberBoxModule,
    AXTimePickerModule,
    AXDatePickerModule,
    AXValidationModule,
    AXTooltipModule,
    AXCheckBoxModule,
    AXSelectionListModule,
    AXToolbarModule,
    AXDataGridModule,
    AXDataSourceModule,
    AXSelectBoxModule,
    RouterModule.forChild([{
      component: InputPage,
      path: ''
    }]),

  ],
  declarations: [InputPage],
  exports: [InputPage]
})
export class InputPageModule { }
