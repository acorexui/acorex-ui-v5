import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFormGroupComponent } from './form-group.component';

const COMPONENT = [AXFormGroupComponent];
const MODULES = [CommonModule];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: [],
})
export class AXFormGroupModule { }