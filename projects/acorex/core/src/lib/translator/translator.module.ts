import { NgModule } from '@angular/core';
import { AXTranslatorPipe } from './translator.pipe';
import * as en from '../locale/en.json';
import * as fa from '../locale/fa.json';
import { AXTranslator } from './translator';


@NgModule({
    imports: [],
    exports: [AXTranslatorPipe],
    declarations: [AXTranslatorPipe],
    providers: [],
})
export class AXTranslatorModule {
    constructor() {
        AXTranslator.load('en', en);
        AXTranslator.load('fa', fa);
    }
}
