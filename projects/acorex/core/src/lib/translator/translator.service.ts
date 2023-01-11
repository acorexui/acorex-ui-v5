import { Injectable } from '@angular/core';
import { AXTranslator } from './translator';

@Injectable({ providedIn: 'platform' })
export class AXTranslatorService {

    public load(lang: string, value: any) {
        AXTranslator.load(lang, value);
    }

    public use(lang: string) {
        AXTranslator.use(lang);
    }

    public get(key: string, lang?: string): string {
        return AXTranslator.get(lang, lang);
    }
}

