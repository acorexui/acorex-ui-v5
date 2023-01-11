import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef, ComponentRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXTabPage, AXTabPageService } from './tab-page.service';
import { AXRenderService } from '@acorex/core';
import { AXBasePageComponent, AXPageCloseEvent, TAB_META_KEY } from '../base/base-page.class';
import { AXLoadingService } from '../loading/loading.service';

@Component({
    selector: 'ax-tab-page-host',
    template: `
        <div class='ax-loading-host'>
            <div class='ax-tab-page-host' >
                <div [hidden]="isLoading" style="height:100%" class='ax-tab-page-host-container'>
                    <ng-template #container></ng-template>
                </div>
            </div>
        </div>
    `
})

export class AXTabPageHostComponent implements OnInit {

    tab: AXTabPage;
    private componentRef: ComponentRef<any>;
    isLoading: boolean;
    _loadingId: number;

    @ViewChild('container', { read: ViewContainerRef, static: true })
    private container: ViewContainerRef;

    constructor(
        private resolver: ComponentFactoryResolver,
        private ref: ElementRef<HTMLDivElement>,
        private rendererService: AXRenderService,
        private tabService: AXTabPageService,
        private loadingService: AXLoadingService,
        private cdr: ChangeDetectorRef,
    ) {
    }


    ngOnInit() {
        this.isLoading = true;
    }

    active() {
        const func = this.componentRef?.instance?.onActivated;
        if (func) {
            const f = (func as Function).bind(this.componentRef.instance);
            f()
        }
    }

    async ngAfterViewInit() {
        this._loadingId = this.loadingService.show(this.ref.nativeElement.querySelector('.ax-tab-page-host-container'));
        //
        let data: any = {};
        //
        let component: any;
        if (typeof this.tab.content === 'string') {
            const route = await this.rendererService.findLoadedComponentByRoute(this.tab.content, 20);
            component = route?.component;
            data = Object.assign(data, route.data);
        }
        else if (typeof this.tab.content === 'function') {
            component = this.tab.content;
        }
        if (component == null) {
            // TODO: 404 page component
            this.isLoading = false;
            console.error(`Invalid page Component! ${this.tab.content}`);
            return;
        }
        //
        data = Object.assign(data, this.tab.data);
        //
        try {
            const factory = this.resolver.resolveComponentFactory(component);
            this.componentRef = this.container.createComponent(factory);
            if (!this.componentRef.instance.onClosed) {
                throw Error('The Component must be inherited from AXBasePageComponent!');
            }
            this.componentRef.instance.onClosed.subscribe((e: AXPageCloseEvent) => {
                this.tabService.close(this.tab);
            });
            //
            const com = this.componentRef.instance as any;
            //
            Object.assign(com, data);
            //
            this.tab[TAB_META_KEY].component = com;
            this.isLoading = false;
            this.loadingService.hide(this._loadingId);
            this.componentRef.changeDetectorRef.detectChanges();
        } catch (error) {
            // TODO: 404 page component
            console.error(error);
        } finally {
            //this.isLoading = false;
        }
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.hostView.destroy();
            this.componentRef.destroy();
            this.container.clear();
        }
        this.loadingService.hide(this._loadingId);
    }
}