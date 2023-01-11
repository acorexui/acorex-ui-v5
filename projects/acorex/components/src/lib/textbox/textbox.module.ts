import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTextBoxComponent } from './textbox.component';
import { AXButtonModule } from '../button/button.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
const COMPONENT = [AXTextBoxComponent];
const MODULES = [CommonModule, AXButtonModule, TextMaskModule, FormsModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULES],
  exports: [...COMPONENT],
  providers: []
})
export class AXTextBoxModule { }
