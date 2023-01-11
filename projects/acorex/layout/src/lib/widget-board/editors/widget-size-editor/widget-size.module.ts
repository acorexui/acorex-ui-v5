import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AXWidgetSizePropertyEditorComponent } from './widget-size.editor';
import { AXNumberBoxModule } from '@acorex/components';




@NgModule({
    declarations: [AXWidgetSizePropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXNumberBoxModule],
    exports: [AXWidgetSizePropertyEditorComponent],
    providers: []
})
export class AXWidgetSizePropertyEditorModule {
   
}