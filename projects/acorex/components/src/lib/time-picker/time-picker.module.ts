import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTimePickerComponent } from './time-picker.component';
import { AXButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
    declarations: [AXTimePickerComponent],
    imports: [ CommonModule, FormsModule, AXButtonModule, TextMaskModule ],
    exports: [AXTimePickerComponent],
    providers: [],
})
export class AXTimePickerModule {}