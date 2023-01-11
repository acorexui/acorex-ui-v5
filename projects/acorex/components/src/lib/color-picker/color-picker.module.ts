import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXColorPickerComponent } from './color-picker.component';
import { AXColorBoxComponent } from './color-box/color-box.component';
import { AXValidationModule } from '../validation/validation.module';
import { AXDropdownModule } from '../dropdown/dropdown.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AXColorPickerComponent, AXColorBoxComponent],
    imports: [CommonModule, FormsModule, AXDropdownModule, AXValidationModule, AXTextBoxModule],
    exports: [AXColorPickerComponent, AXColorBoxComponent],
    providers: []
})
export class AXColorPickerModule { }