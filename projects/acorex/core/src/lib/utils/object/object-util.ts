// @dynamic
export class AXObjectUtil {
    static deepJSONClone(obj: any): any {
        return obj ? JSON.parse(JSON.stringify(obj)) : null;
    }

    static deepCopy(obj) {
        let copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' !== typeof obj) { return obj; }
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = AXObjectUtil.deepCopy(obj[i]);
            }
            return copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) { copy[attr] = AXObjectUtil.deepCopy(obj[attr]); }
            }
            return copy;
        }
        throw new Error('Unable to copy obj! Its type isn\'t supported.');
    }
}

export function AXFetchProp(obj, prop: string) {
    if (typeof obj === 'undefined') {
        return false;
    }
    const index = prop.indexOf('.');

    if (index > -1) {
        return AXFetchProp(obj[prop.substring(0, index)], prop.substr(index + 1));
    }

    return obj[prop];
}




export function getPropByPath(obj, path, defaultVal?) {
    path = path
        .replace(/\[/g, '.')
        .replace(/]/g, '')
        .split('.');

    path.forEach((level) => {
        if (obj) {
            obj = obj[level];
        }
    });

    if (obj === undefined) {
        return defaultVal;
    }
    return obj;
}

export function setPropByPath(obj, path, value) {
    if (Object(obj) !== obj) { return obj; } // When obj is not an object
    // If not yet an array, get the keys from the string-path
    if (!Array.isArray(path)) { path = path.toString().match(/[^.[\]]+/g) || []; }
    path.slice(0, -1).reduce((a, c, i) => // Iterate all of them except the last one
        Object(a[c]) === a[c] // Does the key exist and is its value an object?
            // Yes: then follow that path
            ? a[c]
            // No: create the key. Is the next key a potential array-index?
            : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                ? [] // Yes: assign a new array object
                : {}, // No: assign a new plain object
        obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
    return obj[path[0]]; // Return the top-level object to allow chaining
}


