import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXButtonComponent } from './button.component';

const COMPONENT = [AXButtonComponent];
const MODULES = [CommonModule];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: [],
})
export class AXButtonModule { }
