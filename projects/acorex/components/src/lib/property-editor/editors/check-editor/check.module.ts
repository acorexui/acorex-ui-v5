import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXCheckBoxModule } from '../../../checkbox/checkbox.module';
import { AXValidationModule } from '../../../validation/validation.module';
import { FormsModule } from '@angular/forms';
import { AXCheckBoxPropertyEditorComponent } from './check-editor';

@NgModule({
    declarations: [AXCheckBoxPropertyEditorComponent],
    imports: [CommonModule, AXCheckBoxModule, FormsModule, AXValidationModule],
    exports: [AXCheckBoxPropertyEditorComponent],
    providers: [],
})
export class AXCheckPropertyEditorModule { }