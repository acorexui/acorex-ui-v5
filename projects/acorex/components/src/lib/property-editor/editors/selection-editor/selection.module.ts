import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AXSelectionListModule } from '../../../selection-list/selection-list.module';
import { AXValidationModule } from '../../../validation/validation.module';
import { AXSelectionListPropertyEditorComponent } from './selection-editor';

@NgModule({
    declarations: [AXSelectionListPropertyEditorComponent],
    imports: [CommonModule, AXSelectionListModule, FormsModule, AXValidationModule],
    exports: [AXSelectionListPropertyEditorComponent],
    providers: [],
})
export class AXSelectionPropertyEditorModule { }