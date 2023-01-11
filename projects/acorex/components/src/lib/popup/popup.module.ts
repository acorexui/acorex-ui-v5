import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPopupComponent } from './popup.component';
import { AXPopupService } from './popup.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { A11yModule } from '@angular/cdk/a11y';
import { AXButtonModule } from '../button/button.module';
import { AXTranslatorModule } from '@acorex/core';
import { AXLoadingModule } from '../loading/loading.module';
@NgModule({
    declarations: [AXPopupComponent],
    imports: [CommonModule, DragDropModule, A11yModule, AXButtonModule, AXTranslatorModule, AXLoadingModule],
    exports: [AXPopupComponent],
    providers: [AXPopupService]
})
export class AXPopupModule { }
