import { EventEmitter, ViewChild, Directive } from '@angular/core';
import { AXDataEvent } from './events.class';
import { AXMenuItemClickEvent } from '../menu/menu.component';
import { AXButtonItem } from '@acorex/core';
import { AXPageComponent } from '../page/page.component';
import { Subject } from 'rxjs';

export const TAB_META_KEY = '__meta__';

export class AXPageCloseEvent extends AXDataEvent<any> {
}
export class AXPageClosing {
    cancel: boolean = false;
    data?: any;
}

export class AXPageResult {
    sender: any;
    data?: any;
}

export class AXPageClosedPromise extends Promise<AXPageResult> {

    private closeMethod: () => void;
    constructor(
        executor: (resolve: (value?: AXPageResult | PromiseLike<AXPageResult>) => void,
            reject: (reason?: any) => void) => void
    ) {
        super(executor);
    }

    public close() {
        if (this.closeMethod) {
            this.closeMethod();
        }
    }
}

@Directive()
export abstract class AXBasePageComponent {

    @ViewChild(AXPageComponent, { static: true })
    private pageContainer: AXPageComponent;

    private _isLoading: boolean = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }
    public set isLoading(v: boolean) {
        this._isLoading = v;
        if (this.pageContainer) {
            this.pageContainer.isLoading = this.isLoading;
        }
    }


    onClosed: EventEmitter<AXPageCloseEvent> = new EventEmitter<AXPageCloseEvent>();

    close(data?: any) {
        this.onClosed.emit({
            component: this,
            data: data
        });
    }

    onClosing(e: AXPageClosing): void | Promise<void> {
    }

    onActivated()
    {
      
    }

    ngOnDestroy() {
        this.onClosed.unsubscribe();
    }
}

@Directive()
export abstract class AXBasePopupPageComponent extends AXBasePageComponent {


    constructor() {
        super();
        setTimeout(() => {
            this.configFooterButtons(this.getFooterButtons());
        });
    }


    private _footerButtons: AXButtonItem[] = [];
    onFooterButtonsChanged = new Subject<AXButtonItem[]>();

    protected get footerButtons(): AXButtonItem[] {
        return this._footerButtons || [];
    }

    protected configFooterButtons(buttons?: AXButtonItem[]) {
        if (buttons) {
            this._footerButtons = buttons;
            this.onFooterButtonsChanged.next(buttons);
        }
        else {
            this.onFooterButtonsChanged.next(this.footerButtons);
        }
    }

    onFooterButtonClick(e: AXMenuItemClickEvent) {
    }

    getFooterButtons(): AXButtonItem[] {
        return [];
    }
}


