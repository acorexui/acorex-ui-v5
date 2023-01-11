import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXNumberBoxPropertyEditorComponent } from './number.editor';
import { AXNumberBoxModule } from '../../../number-box/number-box.module';
import { AXValidationModule } from '../../../validation/validation.module';




@NgModule({
    declarations: [AXNumberBoxPropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXNumberBoxModule, AXValidationModule],
    exports: [AXNumberBoxPropertyEditorComponent],
    providers: []
})
export class AXNumberBoxPropertyEditorModule {
    constructor() {
    }
}