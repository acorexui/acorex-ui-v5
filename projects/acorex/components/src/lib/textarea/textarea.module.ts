import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTextAreaComponent } from './textarea.component';

const COMPONENT = [AXTextAreaComponent];
const MODULES = [CommonModule];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: [],
})
export class AXTextAreaModule { }