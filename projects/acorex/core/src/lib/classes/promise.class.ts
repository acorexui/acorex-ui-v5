export class AXPromise<T> {

    private _executor: (then?: (e?: T) => void) => void;
    private thenAction?: (e?: T) => void;

    static resolve<T>(value: T): AXPromise<T> {
        const r = new AXPromise<T>(z => {
            z(value);
        }).then(() => { });
        return r;
    }

    constructor(executor: (then?: (e?: T) => void) => void) {
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.thenAction);
        }, 50);
    }


    then(action?: (e?: T) => void): AXPromise<T> {
        this.thenAction = action;
        return this;
    }
}
