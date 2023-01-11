import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXUploadFileModule, AXProgressBarModule, AXLoadingModule, AXFormGroupModule, AXLabelModule } from '@acorex/components';
import { UploadPage } from './upload.page';

const MODULES = [AXUploadFileModule, AXProgressBarModule, AXLoadingModule, AXFormGroupModule, AXLabelModule];

@NgModule({
    declarations: [UploadPage],
    imports: [CommonModule, ...MODULES],
    exports: [UploadPage],
    providers: []
})
export class UploadPageModule {}
