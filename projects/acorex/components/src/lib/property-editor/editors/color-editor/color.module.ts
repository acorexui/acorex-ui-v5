import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXColorPropertyEditorComponent } from './color.editor';
import { AXColorPickerModule } from '../../../color-picker/color-picker.module';
import { AXValidationModule } from '../../../validation/validation.module';




@NgModule({
    declarations: [AXColorPropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXColorPickerModule, AXValidationModule],
    exports: [AXColorPropertyEditorComponent],
    providers: []
})
export class AXColorPropertyEditorModule {
    constructor() {
    }
}