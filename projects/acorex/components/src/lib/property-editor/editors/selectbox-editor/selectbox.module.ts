import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXSelectBoxPropertyEditorComponent } from './selectbox.editor';
import { AXSelectBoxModule } from '../../../selectbox/selectbox.module';
import { AXDataSourceModule } from '../../../data-source/datasource.module';
import { AXValidationModule } from '../../../validation/validation.module';
import { AXSearchBarSelectBoxEditorComponent } from '../searchbar-selectbox-editor/searchbar-selectbox-editor';

@NgModule({
  declarations: [AXSelectBoxPropertyEditorComponent, AXSearchBarSelectBoxEditorComponent],
  imports: [CommonModule, FormsModule, AXSelectBoxModule, AXDataSourceModule, AXValidationModule],
  exports: [AXSelectBoxPropertyEditorComponent],
  providers: []
})
export class AXSelectBoxPropertyEditorModule {
  constructor() {}
}
