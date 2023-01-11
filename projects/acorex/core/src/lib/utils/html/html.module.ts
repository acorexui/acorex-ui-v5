import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXHtmlToTextPipe } from '../../pipe/htmlToText.pipe';

@NgModule({
  declarations: [AXHtmlToTextPipe],
  imports: [CommonModule],
  exports: [AXHtmlToTextPipe],
  providers: []
})
export class AXHtmlModule { }
