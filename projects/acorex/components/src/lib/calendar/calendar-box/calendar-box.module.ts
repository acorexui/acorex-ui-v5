import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXCalendarBoxComponent } from './calendar-box.component';
import { AXCoreModule, AXTranslatorModule } from '@acorex/core';
import { AXPopoverModule } from '../../popover/popover.module';
import { AXButtonModule } from '../../button/button.module';


@NgModule({
  declarations: [AXCalendarBoxComponent],
  imports: [CommonModule, AXButtonModule, AXPopoverModule, AXCoreModule,AXTranslatorModule],
  exports: [AXCalendarBoxComponent],
  providers: []
})
export class AXCalendarBoxModule {
}
