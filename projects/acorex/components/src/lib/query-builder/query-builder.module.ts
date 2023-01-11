import { NgModule } from '@angular/core';
import { AXQueryBuilderComponent } from './query-builder.component';
import { AXButtonModule } from '../button/button.module';
import { CommonModule } from '@angular/common';
import { AXPanelBoxModule } from '../panel-box/panel-box.module';
import { AXSelectBoxModule } from '../selectbox/selectbox.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXQueryBuilderRuleComponent } from './query-builder-rule.component';
import { AXQueryBuilderGroupComponent } from './query-builder-group.component';
import { AXTranslatorModule } from '@acorex/core';
import { AXNumberBoxModule } from '../number-box/number-box.module';
import { AXDataSourceModule } from '../data-source/datasource.module';
import { AXFormGroupModule } from '../form-group/form-group.module';
import { AXQueryBuilderPopupComponent } from './query-builder-popup/query-builder-popup.component';
import { AXLabelModule } from '../label/label.module';
import { AXCheckBoxModule } from '../checkbox/checkbox.module';
import { AXValidationModule } from '../validation/validation.module';
import { AXQueryBuilderService } from './query-builder.service';
import { AXDatePickerModule } from '../date-picker/date-picker.module';

const MODUELS = [
    CommonModule,
    AXButtonModule,
    AXPanelBoxModule,
    AXSelectBoxModule,
    AXDataSourceModule,
    AXTextBoxModule,
    AXNumberBoxModule,
    AXFormGroupModule,
    AXTranslatorModule,
    AXLabelModule,
    AXCheckBoxModule,
    AXValidationModule,
    AXDatePickerModule
]

@NgModule({
    declarations: [AXQueryBuilderComponent, AXQueryBuilderGroupComponent, AXQueryBuilderRuleComponent, AXQueryBuilderPopupComponent],
    imports: [MODUELS],
    exports: [AXQueryBuilderComponent],
    providers: [AXQueryBuilderService]
})

export class AXQueryBuilderModule { }