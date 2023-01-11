import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core';
import { AXMenuItem } from '@acorex/core';
import { AXBaseEvent } from '../base/events.class';
import { AXContextMenuComponent } from './context-menu.component';
import { Subscription } from 'rxjs';

export type AXContextMenuPromiseFunction = (item: any) => Promise<AXMenuItem[]>;
export type AXContextMenuFunction = (item: any) => AXMenuItem[];
export class AXContextMenuItemClickEvent extends AXBaseEvent {
  dataItem?: any;
  menuItem: AXMenuItem;
}

@Directive({
  selector: '[axContextMenu]'
})
export class AXContextMenuDirective {
  @Input()
  contextMenu: AXContextMenuComponent;

  @Input()
  contextDataItem: any;

  @Input()
  contextMenuItems: AXMenuItem[] | AXContextMenuPromiseFunction | AXContextMenuFunction;

  @Output()
  onContextMenuItemClick: EventEmitter<AXContextMenuItemClickEvent> = new EventEmitter<AXContextMenuItemClickEvent>();

  @Input()
  rtl: boolean = false;

  internalItems: AXMenuItem[] = [];

  private clickSubscribe: Subscription;
  private closeSubscribe: Subscription;

  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: MouseEvent) {
    this.getMenuItems().then(items => {
      e.stopPropagation();
      e.preventDefault();
      this.createContextMenu();
      this.contextMenu.items = items;


      this.contextMenu.open(e.x, e.y, this.rtl);


    });
  }



  constructor(
    private ref: ElementRef,
    private factoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
  }

  ngOnInit(): void {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
  }

  createContextMenu(): void {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ax-overlay-wrapper');
    wrapper.addEventListener('click', this.wrapperClick.bind(this));
    wrapper.addEventListener('contextmenu', this.wrapperRClick.bind(this));
    //
    document.body.appendChild(wrapper);
    const factory = this.factoryResolver.resolveComponentFactory(AXContextMenuComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    this.contextMenu = componentRef.instance;
    wrapper.appendChild(componentRef.location.nativeElement);
    //
    this.clearComponentSubscriptions();
    this.createComponentSubscriptions();
  }

  wrapperClick(e: MouseEvent) {
    this.remove();
  }

  wrapperRClick(e: MouseEvent) {
    if (document.elementsFromPoint(e.clientX, e.clientY).includes(this.ref.nativeElement)) {
      e.stopPropagation();
      e.preventDefault();

      this.contextMenu.open(e.x, e.y, this.rtl);
    }
    else {
      e.preventDefault();
      this.remove();
    }
  }



  private clearComponentSubscriptions() {
    if (this.clickSubscribe) {
      this.clickSubscribe.unsubscribe();
      this.clickSubscribe = undefined;
    }
    if (this.closeSubscribe) {
      this.closeSubscribe.unsubscribe();
      this.closeSubscribe = undefined;
    }
  }

  private createComponentSubscriptions() {
    this.clickSubscribe = this.contextMenu.onItemClick.subscribe(c => {
      this.remove();
      this.onContextMenuItemClick.emit({
        component: this,
        dataItem: this.contextDataItem,
        htmlElement: this.ref.nativeElement,
        menuItem: c
      });
    }) as any;
    this.closeSubscribe = this.contextMenu.onClosed.subscribe(c => {
      this.clearComponentSubscriptions();
    }) as any;
  }

  private remove() {
    this.viewContainerRef.clear();
    this.clearComponentSubscriptions();
    document.querySelector('.ax-overlay-wrapper')?.remove();
  }

  private getMenuItems(): Promise<AXMenuItem[]> {
    return new Promise<AXMenuItem[]>((resolve, reject) => {
      if (typeof (this.contextMenuItems) === 'function') {
        const val = this.contextMenuItems(this.contextDataItem);
        if (val instanceof Promise) {
          val.then(_data => {
            resolve(_data);
          });
        } else {
          resolve(val);
        }
      } else if (Array.isArray(this.contextMenuItems)) {
        resolve(this.contextMenuItems);
      }
      else {
        resolve([]);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearComponentSubscriptions();
  }
}
