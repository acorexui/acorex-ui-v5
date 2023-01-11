import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTextPropertyEditorComponent } from './text.editor';
import { FormsModule } from '@angular/forms';
import { AXTextBoxModule } from '../../../textbox/textbox.module';
import { AXValidationModule } from '../../../validation/validation.module';




@NgModule({
    declarations: [AXTextPropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXTextBoxModule, AXValidationModule],
    exports: [AXTextPropertyEditorComponent],
    providers: []
})
export class AXTextPropertyEditorModule {
    constructor() {
    }
}