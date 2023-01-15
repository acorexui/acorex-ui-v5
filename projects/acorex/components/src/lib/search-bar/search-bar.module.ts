import { AXTranslatorModule } from '@acorex/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AXButtonModule } from '../button/button.module';
import { AXDropdownModule } from '../dropdown/dropdown.module';
import { AXFormGroupModule } from '../form-group/form-group.module';
import { AXLabelModule } from '../label/label.module';
import { AXPopoverModule } from '../popover/popover.module';
import { AXProppertyEditorModule } from '../property-editor/property-editor.module';
import { AXTextBoxModule } from '../textbox/textbox.module';
import { AXValidationModule } from '../validation/validation.module';
import { AXSearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [AXSearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    AXDropdownModule,
    AXButtonModule,
    AXTextBoxModule,
    AXProppertyEditorModule,
    AXFormGroupModule,
    AXLabelModule,
    AXTranslatorModule,
    AXValidationModule,
    AXPopoverModule
  ],
  exports: [AXSearchBarComponent],
  providers: []
})
export class AXSearchBarModule {}
