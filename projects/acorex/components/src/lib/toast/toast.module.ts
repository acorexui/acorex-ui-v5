import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXToastService } from './toast.service';
import { AXToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { AXToastMessageComponent } from './toast-message/toast-message.component';
@NgModule({
    declarations: [AXToastWrapperComponent, AXToastMessageComponent],
    imports: [CommonModule],
    exports: [AXToastWrapperComponent],
    providers: [AXToastService]
})
export class AXToastModule { }
