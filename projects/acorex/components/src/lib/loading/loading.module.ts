import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLoadingIndicatorComponent } from './loading-indicator.component';
import { AXLoadingPanelComponent } from './loading-panel.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    declarations: [AXLoadingIndicatorComponent, AXLoadingPanelComponent],
    imports: [CommonModule, A11yModule],
    exports: [AXLoadingIndicatorComponent, AXLoadingPanelComponent],
    providers: [],
})
export class AXLoadingModule { }