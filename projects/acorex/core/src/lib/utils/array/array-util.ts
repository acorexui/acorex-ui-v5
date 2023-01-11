import { AXFetchProp } from '../object/object-util';

// @dynamic
export class AXArrayUtil {


    static pickRandom(array: any[]): any {
        return array[Math.floor(Math.random() * array.length)];
    }


    static insert(array: any[], index, ...rest) {
        array.splice.apply(array, [index, 0].concat(Array.prototype.slice.call(rest, 1)));
        return array;
    }

    static range(min: number, max: number): number[] {
        return new Array(max - min).fill(1).map((d, i) => i);
    }

    static filter(array: any[], filters: any[]): any[] {
        if (filters == null || filters.length === 0) {
            return array;
        }
        const lamda = (item) => {
            let result = true;
            for (const key in filters) {
                if (filters.hasOwnProperty(key)) {
                    const f = filters[key];
                    if (f !== 'AND') {
                        const vals = [];
                        const mt = f.field.match(/\[\:(.*?)\]/);
                        if (mt && mt.length > 1) {
                            const p1 = f.field.replace(mt[0], '');
                            const p2 = mt[1];
                            const prop = AXFetchProp(item, p1);
                            if (prop instanceof Array && prop.length) {
                                vals.push(...prop.map(m => (AXFetchProp(m, p2))));
                            } else {
                                result = false;
                            }
                        } else {
                            vals.push(AXFetchProp(item, f.field));
                        }
                        for (const j in vals) {
                            if (vals.hasOwnProperty(j)) {
                                let v1 = vals[j];
                                const v2 = f.value;
                                if (f.dataType === 'string') {
                                    v1 = v1.toString();
                                    switch (f.condition) {
                                        case 'equal':
                                            result = (v1 && v2) && v1.toLowerCase() === v2.toLowerCase();
                                            break;
                                        case 'not-equal':
                                            result = !((v1 && v2) && v1.toLowerCase() === v2.toLowerCase());
                                            break;
                                        case 'contains':
                                            result = ((v1 && v2) && (v1.toLowerCase().includes(v2.toLowerCase())));
                                            break;
                                        case 'not-contains':
                                            result = !((v1 && v2) && (v1.toLowerCase().includes(v2.toLowerCase())));
                                            break;
                                        case 'start-with':
                                            result = ((v1 && v2) && (v1.toLowerCase().startsWith(v2.toLowerCase())));
                                            break;
                                        case 'end-with':
                                            result = ((v1 && v2) && (v1.toLowerCase().endsWith(v2.toLowerCase())));
                                            break;
                                        case 'is-empty':
                                            result = v1 == null || v1 === undefined;
                                            break;
                                        case 'is-not-empty':
                                            result = !(v1 == null || v1 === undefined);
                                            break;
                                        default:
                                            console.error('The condition is not defined');
                                            result = false;
                                    }
                                } else if (f.dataType === 'date') {
                                } else if (f.dataType === 'number') {
                                    v1 = Number(v1);
                                    switch (f.condition) {
                                        case 'equal':
                                            result = v1 === v2;
                                            break;
                                        case 'not-equal':
                                            result = v1 !== v2;
                                            break;
                                        case 'contains':
                                            result = v2 && v2 instanceof Array && v2.includes(v1);
                                            break;
                                        case 'less-than':
                                            result = v1 < v2;
                                            break;
                                        case 'less-than-equal':
                                            result = v1 <= v2;
                                            break;
                                        case 'greater-than':
                                            result = v1 > v2;
                                            break;
                                        case 'greater-than-equal':
                                            result = v1 >= v2;
                                            break;
                                        case 'is-empty':
                                            result = v1 == null || v1 === undefined;
                                            break;
                                        case 'is-not-empty':
                                            result = !(v1 == null || v1 === undefined);
                                            break;
                                        default:
                                            console.error('The condition is not defined');
                                            result = false;
                                    }
                                } else {
                                    console.error('The datatype is not supported');
                                    result = false;
                                }
                                if (result) {
                                    break;
                                }
                            }
                        }
                    }
                    if (!result) {
                        return false;
                    }
                }
            }
            return true;
        };
        return array.filter(lamda);
    }

}





