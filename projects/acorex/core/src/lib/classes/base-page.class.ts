import { EventEmitter, Injectable } from '@angular/core';

/**
 * @deprecated Use AXBasePageComponent from @acorex/components
 */
// TODO: Add Angular decorator.
@Injectable()
export abstract class AXBasePageComponent {

    onClosed: EventEmitter<any> = new EventEmitter<any>();

    close(data?: any) {
        this.onClosed.emit({
            component: this,
            data: data
        });
    }

    onClosing(e: any): void | Promise<void> {
    }

    ngOnDestroy() {
        this.onClosed.unsubscribe();
    }


}


