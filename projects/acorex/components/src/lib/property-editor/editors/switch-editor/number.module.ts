import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXNumberBoxModule } from '../../../number-box/number-box.module';
import { AXValidationModule } from '../../../validation/validation.module';
import { AXSwitchPropertyEditorComponent } from './number.editor';
import { AXSwitchModule } from '../../../switch/switch.module';




@NgModule({
    declarations: [AXSwitchPropertyEditorComponent],
    imports: [CommonModule, FormsModule, AXNumberBoxModule, AXValidationModule, AXSwitchModule],
    exports: [AXSwitchPropertyEditorComponent],
    providers: []
})
export class AXSwitchPropertyEditorModule {
    constructor() {
    }
}