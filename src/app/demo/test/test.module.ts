import {
  AXButtonModule,
  AXFormGroupModule,
  AXLabelModule,
  AXPageModule,
  AXPasswordBoxModule,
  AXTextBoxModule
} from '@acorex/components';
import { AXCoreModule } from '@acorex/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestPage } from './test.page';
const MODULES = [
  AXCoreModule,
  AXPageModule,
  AXButtonModule,
  AXTextBoxModule,
  AXFormGroupModule,
  AXLabelModule,
  AXPasswordBoxModule
];
@NgModule({
  declarations: [TestPage],
  imports: [CommonModule, ...MODULES],
  exports: [TestPage],
  providers: []
})
export class TestPageModule { }
