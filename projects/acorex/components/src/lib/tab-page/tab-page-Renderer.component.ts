import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXTabPageService } from './tab-page.service';
import { TAB_META_KEY } from '../base/base-page.class';
import { AXTabPageHostComponent } from './tab-page-host.component';
import { Subscription } from 'rxjs';


@Component({
    selector: 'ax-tab-page-renderer',
    template: `<template #container></template>`,
    host: { 'class': 'ax tab-page-renderer' }
})
export class AXTabPageRendererComponent {

    childs: ComponentRef<AXTabPageHostComponent>[] = [];

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    private subscriptions: Subscription[] = [];

    constructor(
        private resolver: ComponentFactoryResolver,
        private tabService: AXTabPageService,
        private cdr: ChangeDetectorRef
    ) {
        this.subscriptions.push(tabService.activated.subscribe(tab => {
            this.childs.forEach((v: ComponentRef<AXTabPageHostComponent>) => {
                v.changeDetectorRef.detach();
                v.location.nativeElement.hidden = true;
            });
            const v = this.childs.find(t => (t as any).uid === tab[TAB_META_KEY].uid) as ComponentRef<AXTabPageHostComponent>;
            if (v) {
                v.location.nativeElement.hidden = false;
                v.changeDetectorRef.reattach();
                v.instance.active();
            }
            else {
                try {
                    const factory = this.resolver.resolveComponentFactory(AXTabPageHostComponent);
                    const componentRef = this.container.createComponent(factory);
                    (componentRef as any).uid = tab[TAB_META_KEY].uid;
                    const host = componentRef.instance as AXTabPageHostComponent;
                    host.tab = tab;
                    this.childs.push(componentRef);
                    setTimeout(() => {
                        componentRef.changeDetectorRef.detectChanges();
                        //host.active();
                    }, 10);
                } catch (error) {
                    console.error(error);
                }
            }
        }));

        this.subscriptions.push(tabService.closed.subscribe(tab => {
            const hostref = this.childs.find(c => (c as any).uid === tab[TAB_META_KEY].uid);
            if (hostref) {
                hostref.destroy();
            }
            this.childs = this.childs.filter(c => (c as any).uid !== tab[TAB_META_KEY].uid);
        }));
    }

    ngOnDestroy() {
        this.tabService.clear();
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }
}