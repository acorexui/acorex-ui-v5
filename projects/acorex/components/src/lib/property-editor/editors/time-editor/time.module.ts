import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXValidationModule } from '../../../validation/validation.module';
import { AXTimePickerModule } from '../../../time-picker/time-picker.module';
import { AXTimePropertyEditorComponent } from './time.editor';




@NgModule({
    declarations: [AXTimePropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXTimePickerModule, AXValidationModule],
    exports: [AXTimePropertyEditorComponent],
    providers: []
})
export class AXTimePropertyEditorModule {
    constructor() {
    }
}