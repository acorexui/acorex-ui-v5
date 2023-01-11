import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXDropdownComponent } from './dropdown.component';
import { AXFormGroupModule } from '../form-group/form-group.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXButtonModule } from '../button/button.module';
import { AXPopoverModule } from '../popover/popover.module';
import { OverlayModule } from '@angular/cdk/overlay';

const COMPONENT = [AXDropdownComponent];
const MODULES = [CommonModule, AXFormGroupModule, AXTextBoxModule, AXButtonModule, AXPopoverModule, OverlayModule];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: [],
})
export class AXDropdownModule { }
