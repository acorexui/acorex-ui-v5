import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesPage } from './services.page';
import { AXHttpModule, AXHttpService } from '@acorex/core';
import { ServicesService } from './services.service';

const MODULES = [AXHttpModule];

@NgModule({
    declarations: [ServicesPage],
    imports: [CommonModule, ...MODULES],
    exports: [ServicesPage],
    providers: [ServicesService]
})
export class ServicesPageModule { }
