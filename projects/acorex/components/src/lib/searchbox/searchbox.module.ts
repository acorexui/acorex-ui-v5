import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSearchBoxComponent } from './searchbox.component';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXButtonModule } from '../button/button.module';
import { AXFormGroupModule } from '../form-group/form-group.module';
import { AXTranslatorModule } from '@acorex/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AXSearchBoxComponent],
  imports: [CommonModule, AXTextBoxModule, AXButtonModule, AXFormGroupModule, AXTranslatorModule, FormsModule],
  exports: [AXSearchBoxComponent],
  providers: []
})
export class AXSearchBoxModule { }
