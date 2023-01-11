import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXValidationModule } from '../../../validation/validation.module';
import { AXDatePickerModule } from '../../../date-picker/date-picker.module';
import { AXDatePropertyEditorComponent } from './date.editor';




@NgModule({
    declarations: [AXDatePropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXDatePickerModule, AXValidationModule],
    exports: [AXDatePropertyEditorComponent],
    providers: []
})
export class AXDatePropertyEditorModule {
    constructor() {
    }
}