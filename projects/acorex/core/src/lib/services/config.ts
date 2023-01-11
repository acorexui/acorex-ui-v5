import { Subject, Observable } from 'rxjs';
import { getPropByPath, setPropByPath } from '../utils/object/object-util';

// @dynamic
export class AXConfig {
    private static dataModel: any = {};
    private static dataChangeSubject = new Subject<any>();


    static get onChange(): Observable<any> {
        return AXConfig.dataChangeSubject.asObservable();
    }

    static set(config: any): any;
    static set(path: string, value?: any): void;
    static set(arg1?: any, arg2?: any) {

        if (arg1 && typeof arg1 == 'string') {
            setPropByPath(AXConfig.dataModel, arg1, arg2);
            AXConfig.dataChangeSubject.next(AXConfig.dataModel);
            return;
        }
        if (arg1 && typeof arg1 == 'object') {
            Object.assign(AXConfig.dataModel, arg1);
            AXConfig.dataChangeSubject.next(AXConfig.dataModel);
            return;
        }
        if (!arg1 && !arg2) {
            return AXConfig.dataChangeSubject.asObservable();
        }
    }

    static get(path: string): any {
        return getPropByPath(AXConfig.dataModel, path);
    }
}