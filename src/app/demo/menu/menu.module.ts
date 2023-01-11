import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPage } from './menu.page';
import { AXContextMenuModule } from '@acorex/components';
import { AXMenuModule, AXToolbarModule } from '@acorex/components';

const MODULES = [AXMenuModule, AXToolbarModule, AXContextMenuModule];

@NgModule({
    declarations: [MenuPage],
    imports: [CommonModule, ...MODULES],
    exports: [MenuPage],
    providers: []
})
export class MenuPageModule { }
