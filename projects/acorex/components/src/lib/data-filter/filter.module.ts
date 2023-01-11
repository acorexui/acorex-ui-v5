import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFilterPanelComponent } from './filter-panel/filter-panel.component';
import { AXFilterColumnStringComponent } from './columns/filter-column-string.component';
import { FormsModule } from '@angular/forms';
import { AXFilterColumnSelectionComponent } from './columns/filter-column-selection.component';
import { AXFilterColumnDateComponent } from './columns/filter-column-date.component';
import { AXFilterColumnNumberComponent } from './columns/filter-column-number.component';
import { AXToolbarFilterViewComponent } from './toolbar/filter-toolbar.component';
import { AXPanelBoxModule } from '../panel-box/panel-box.module';
import { AXDatePickerModule } from '../date-picker/date-picker.module';
import { AXCheckBoxModule } from '../checkbox/checkbox.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXToastModule } from '../toast/toast.module';
import { AXToolbarModule } from '../toolbar/toolbar.module';
import { AXMenuModule } from '../menu/menu.module';
import { AXSelectionListModule } from '../selection-list/selection-list.module';
import { AXButtonModule } from '../button/button.module';
import { AXValidationModule } from '../validation/validation.module';




const COMPONENTS = [
    AXFilterPanelComponent,
    AXFilterColumnStringComponent,
    AXFilterColumnSelectionComponent,
    AXFilterColumnDateComponent,
    AXFilterColumnNumberComponent,
    AXToolbarFilterViewComponent,
]

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule,
        FormsModule,
        AXPanelBoxModule,
        AXDatePickerModule,
        AXCheckBoxModule,
        AXTextBoxModule,
        AXValidationModule,
        AXToastModule,
        AXToolbarModule,
        AXMenuModule,
        AXSelectionListModule,
        AXButtonModule
    ],
    exports: [COMPONENTS],
    providers: [],
})
export class AXFilterModule { }