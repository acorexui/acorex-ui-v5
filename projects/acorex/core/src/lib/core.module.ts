import { NgModule } from '@angular/core';
import { AXDateTimePipe } from './pipe/datetime.pipe';
import { AXEventService } from './services/event.service';
import { AXStorageService } from './services/storage.service';
import { AXScrollModule } from './utils/scroll/scroll.module';
import { AXTranslatorModule } from './translator/translator.module';

const PIPES = [AXDateTimePipe];
const MODULES = [AXScrollModule, AXTranslatorModule];
const SERVICES = [AXEventService,
  AXStorageService
];


@NgModule({
  declarations: [...PIPES],
  imports: [...MODULES],
  exports: [...PIPES],
  providers: [...SERVICES]
})
export class AXCoreModule { }
