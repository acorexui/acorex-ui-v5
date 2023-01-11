import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPasswordBoxComponent } from './password-box.component';
import { AXButtonModule } from '../button/button.module';
import { AXFormGroupModule } from '../form-group/form-group.module';

const COMPONENT = [AXPasswordBoxComponent];
const MODULES = [CommonModule, AXButtonModule,AXFormGroupModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULES],
  exports: [...COMPONENT],
  providers: []
})
export class AXPasswordBoxModule {}
