import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXDatePickerComponent } from './date-picker.component';
import { AXDropdownModule } from '../dropdown/dropdown.module';
import { AXCalendarBoxModule } from '../calendar/calendar-box/calendar-box.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXButtonModule } from '../button/button.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [AXDatePickerComponent],
  imports: [CommonModule, FormsModule, AXDropdownModule, AXCalendarBoxModule, AXButtonModule, AXTextBoxModule, TextMaskModule, FormsModule],
  exports: [AXDatePickerComponent],
  providers: []
})
export class AXDatePickerModule {}
