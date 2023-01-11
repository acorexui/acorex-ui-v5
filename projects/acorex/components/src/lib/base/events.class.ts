export class AXBaseEvent {
    component: any;
    htmlElement?: HTMLElement;
}

export class AXHtmlEvent<E extends Event> extends AXBaseEvent {

    htmlEvent?: E;
}

export class AXValueEvent<T> extends AXBaseEvent {
    value?: T;
    oldValue?: T;
}

export class AXDataEvent<T> extends AXBaseEvent {
    data?: T;
}

export class AXEvent<T, E extends Event>
{

}
export interface AXEvent<T, E extends Event> extends AXDataEvent<T>, AXHtmlEvent<E> {

}






