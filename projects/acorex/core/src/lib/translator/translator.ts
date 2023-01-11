import { Subject, Observable } from 'rxjs';
import { getPropByPath} from '../utils/object/object-util';
import merge from 'lodash-es/merge';

// @dynamic
export class AXTranslator {
    private static lang: string = 'en';
    private static dataChangeSubject = new Subject<any>();


    static get onChange(): Observable<any> {
        return AXTranslator.dataChangeSubject.asObservable();
    }

    public static load(lang: string, value: any) {
        if (typeof value === 'object') {
            if (!AXTranslator[`__data__${lang}`]) {
                AXTranslator[`__data__${lang}`] = {};
            }
            AXTranslator[`__data__${lang}`] = merge(AXTranslator[`__data__${lang}`], value);
        }
    }

    public static use(lang: string) {
        AXTranslator.lang = lang;
    }

    public static get(key: string, lang?: string): string {
        return getPropByPath(AXTranslator[`__data__${lang || AXTranslator.lang}`], key) || key;
    }
}