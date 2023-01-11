import { Pipe, PipeTransform } from '@angular/core';
import { AXTranslator } from './translator';

@Pipe({ name: 'trans', pure: true })
export class AXTranslatorPipe implements PipeTransform {

    constructor() { }

    // transform(value: string, lang?: string): Promise<string> {
    //     return new Promise<string>((resolve, reject) => {
    //         if (!value) {
    //             resolve(value);
    //         }
    //         resolve(this.translate.get(value, lang));
    //     });

    // }

    transform(value: string, lang?: string): string {
        return AXTranslator.get(value, lang);
    }
}
