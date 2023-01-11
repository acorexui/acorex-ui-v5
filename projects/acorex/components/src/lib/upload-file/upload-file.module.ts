import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXUploadFileComponent } from './upload-file.component';
import { AXButtonModule } from '../button/button.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXProgressBarModule } from '../progress-bar/progress-bar.module';
import { AXLabelModule } from '../label/label.module';
import { AXFormGroupModule } from '../form-group/form-group.module';

@NgModule({
  declarations: [AXUploadFileComponent],
  imports: [CommonModule, AXButtonModule, AXTextBoxModule, AXProgressBarModule, AXLabelModule, AXFormGroupModule],
  exports: [AXUploadFileComponent],
  providers: []
})
export class AXUploadFileModule {}
