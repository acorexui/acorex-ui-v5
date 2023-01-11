import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXTextBoxModule } from '../../../textbox/textbox.module';
import { AXNumberBoxModule } from '../../../number-box/number-box.module';
import { AXColorPickerModule } from '../../../color-picker/color-picker.module';
import { AXLabelModule } from '../../../label/label.module';
import { AXPageModule } from '../../../page/page.module';
import { AXButtonModule } from '../../../button/button.module';
import { AXCheckBoxModule } from './../../../checkbox/checkbox.module';
import { ColumnPropertyEditorComponent } from './column.editor';
import { AXSelectBoxModule } from '../../../selectbox/selectbox.module';
import { AXDataSourceModule } from '../../../data-source/datasource.module';
import { DragDropModule } from '@angular/cdk/drag-drop';




@NgModule({
    declarations: [ColumnPropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXTextBoxModule, AXNumberBoxModule, AXColorPickerModule, AXLabelModule, AXPageModule, AXButtonModule, AXCheckBoxModule, AXSelectBoxModule, AXDataSourceModule, DragDropModule],
    exports: [ColumnPropertyEditorComponent],
    providers: []
})
export class AXColumnPropertyEditorModule {
    constructor() {
    }
}
