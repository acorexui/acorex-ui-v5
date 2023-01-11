import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTextareaPropertyEditorComponent } from './textarea.editor';
import { FormsModule } from '@angular/forms';
import { AXTextAreaModule } from '../../../textarea/textarea.module';
import { AXValidationModule } from '../../../validation/validation.module';




@NgModule({
    declarations: [AXTextareaPropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXTextAreaModule, AXValidationModule],
    exports: [AXTextareaPropertyEditorComponent],
    providers: []
})
export class AXTextareaPropertyEditorModule {
    constructor() {
    }
}
