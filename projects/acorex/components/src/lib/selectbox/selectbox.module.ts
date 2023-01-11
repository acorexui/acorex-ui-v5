import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSelectBoxComponent } from './selectbox.component';
import { AXDropdownModule } from '../dropdown/dropdown.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXTranslatorModule, AXScrollModule } from '@acorex/core';
import { AXCheckBoxModule } from '../checkbox/checkbox.module';
import { AXLoadingModule } from '../loading/loading.module';
import { AXSearchBoxModule } from '../searchbox/searchbox.module';
import { AXSelectBox2Component } from './selectbox2.component';


const COMPONENT = [AXSelectBoxComponent, AXSelectBox2Component];
const MODULES = [
    CommonModule,
    AXDropdownModule,
    AXTextBoxModule,
    AXTranslatorModule,
    AXScrollModule,
    AXCheckBoxModule,
    AXLoadingModule,
    AXSearchBoxModule
];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: []
})
export class AXSelectBoxModule { }
