import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXTextBoxModule } from '../../../textbox/textbox.module';
import { AXNumberBoxModule } from '../../../number-box/number-box.module';
import { AXColorPickerModule } from '../../../color-picker/color-picker.module';
import { AXLabelModule } from '../../../label/label.module';
import { AXPageModule } from '../../../page/page.module';
import { AXButtonModule } from '../../../button/button.module';
import { AXTranslator, AXTranslatorModule } from '@acorex/core';
import { AXConditionalColorPropertyEditorComponent } from './conditional-color.editor';
import { AXValidationModule } from '../../../validation/validation.module';
import { AXSelectBoxModule } from '../../../selectbox/selectbox.module';




@NgModule({
    declarations: [AXConditionalColorPropertyEditorComponent],
    imports: [
        CommonModule,
        FormsModule,
        AXTranslatorModule,
        AXTextBoxModule,
        AXNumberBoxModule,
        AXColorPickerModule,
        AXLabelModule,
        AXPageModule,
        AXButtonModule,
        AXSelectBoxModule,
        AXValidationModule,
    ],
    exports: [AXConditionalColorPropertyEditorComponent],
    providers: []
})
export class AXConditionalColorPropertyEditorModule {
    constructor() {
        AXTranslator.load('en', {
            'conditional-color-property-editor': {
                'replaced-color': 'Replaced Color',
                'replaced-title': 'Replaced Title',
            }
        });
        //
        AXTranslator.load('fa', {
            'conditional-color-property-editor': {
                'replaced-color': 'رنگ جایگزین',
                'replaced-title': 'متن جایگزین',
            }
        });
    }
}