import { NgModule } from '@angular/core';

import { QueryBuilderPage } from './query-builder.page';
import { AXQueryBuilderModule, AXButtonModule } from '@acorex/components';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [QueryBuilderPage],
    imports: [
        CommonModule,
        AXQueryBuilderModule,
        AXButtonModule
    ],
    exports: [QueryBuilderPage],
    providers: [],
})
export class QueryBuilderPageModule { }