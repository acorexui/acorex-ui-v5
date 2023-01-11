import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLabelComponent } from './label.component';

const COMPONENT = [AXLabelComponent];
const MODULES = [CommonModule];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: [],
})
export class AXLabelModule { }