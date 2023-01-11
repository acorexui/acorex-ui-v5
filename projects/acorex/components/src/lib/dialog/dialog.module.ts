import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXDialogComponent } from './dialog.component';
import { AXButtonModule } from '../button/button.module';
import { AXTranslatorModule } from '@acorex/core';

@NgModule({
    declarations: [AXDialogComponent],
    imports: [CommonModule, AXButtonModule,AXTranslatorModule],
    exports: [AXDialogComponent],
    providers: [],
})
export class AXDialogModule { }