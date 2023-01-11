import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPasswordBoxModule, AXSelectBoxModule, AXUploadFileModule, AXProgressBarModule, AXLoadingModule, AXFormGroupModule, AXLabelModule, AXTextBoxModule, AXButtonModule, AXValidationModule, AXDatePickerModule, AXDataSourceModule, AXNumberBoxModule, AXTimePickerModule } from '@acorex/components';
import { ValidationPage } from './validation.page';
import { AXTranslatorModule } from '@acorex/core';
import { AXLOVModule } from '@acorex/data-grid';



const MODULES = [AXTextBoxModule, AXFormGroupModule, AXLabelModule, AXValidationModule, AXButtonModule, AXDatePickerModule, AXTranslatorModule, AXLOVModule, AXDataSourceModule, AXPasswordBoxModule, AXSelectBoxModule, AXNumberBoxModule, AXTimePickerModule];

@NgModule({
    declarations: [ValidationPage],
    imports: [CommonModule, ...MODULES],
    exports: [ValidationPage],
    providers: []
})
export class ValidationPageModule { }
