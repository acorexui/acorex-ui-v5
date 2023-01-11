import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXRangePropertyEditorComponent } from './range.editor';
import { FormsModule } from '@angular/forms';
import { AXTextBoxModule } from '../../../textbox/textbox.module';
import { AXNumberBoxModule } from '../../../number-box/number-box.module';
import { AXColorPickerModule } from '../../../color-picker/color-picker.module';
import { AXLabelModule } from '../../../label/label.module';
import { AXPageModule } from '../../../page/page.module';
import { AXButtonModule } from '../../../button/button.module';
import { AXTranslatorModule } from '@acorex/core';
import { AXValidationModule } from '../../../validation/validation.module';




@NgModule({
    declarations: [AXRangePropertyEditorComponent],
    imports: [
        CommonModule,
        FormsModule,
        AXTranslatorModule,
        AXTextBoxModule,
        AXNumberBoxModule,
        AXColorPickerModule,
        AXLabelModule,
        AXPageModule,
        AXValidationModule,
        AXButtonModule
    ],
    exports: [AXRangePropertyEditorComponent],
    providers: []
})
export class AXRangePropertyEditorModule {
    constructor() {
    }
}