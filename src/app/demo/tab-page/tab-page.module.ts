import { NgModule } from '@angular/core';

import { TabPage } from './tab-page.page';
import { AXTabPageModule } from '@acorex/components'
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, AXTabPageModule],
    exports: [],
    declarations: [TabPage],
    providers: [],
})
export class TabPageModule {

}
