import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBoxPage } from './panelbox.page';
import { AXPanelBoxModule } from '@acorex/components';

const MODULES = [AXPanelBoxModule];

@NgModule({
    declarations: [PanelBoxPage],
    imports: [CommonModule, ...MODULES],
    exports: [PanelBoxPage],
    providers: []
})
export class PanelBoxPageModule {}
