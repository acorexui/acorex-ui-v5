import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AXSwitchComponent } from './switch.component';

@NgModule({
    declarations: [AXSwitchComponent],
    imports: [CommonModule, FormsModule],
    exports: [AXSwitchComponent],
    providers: []
})
export class AXSwitchModule {

}