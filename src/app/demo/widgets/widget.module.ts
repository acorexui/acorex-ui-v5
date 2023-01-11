import { NgModule } from '@angular/core';

import { WidgetPage } from './widget.page';
import { AXWidgetBoardModule } from '@acorex/layout';
import { AXToolbarModule, AXPageModule, AXTabStripModule } from '@acorex/components';
import { AXCoreModule } from '@acorex/core';
import { AXWidgetGalleryComponent } from './widget-gallery.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, AXWidgetBoardModule, AXToolbarModule, AXCoreModule, AXPageModule, AXTabStripModule],
    exports: [],
    declarations: [WidgetPage, AXWidgetGalleryComponent],
    providers: [],
})
export class WidgetPageModule {
}
