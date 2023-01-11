import {
  Component,
  Input,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  OnInit,
  ComponentFactoryResolver,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  ComponentRef,
  OnDestroy,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { AXBaseComponent } from '../base/element.class';
import { AXPageCloseEvent, TAB_META_KEY } from '../base/base-page.class';
import { AXButtonItem, AXRenderService } from '@acorex/core';
import { AXLoadingService } from '../loading/loading.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AXPopupComponent extends AXBaseComponent implements OnDestroy {

  isLoading: boolean = true;
  _loadingId: number;
  private onFooterButtonsSubscription: Subscription;

  constructor(
    private resolver: ComponentFactoryResolver,
    private ref: ElementRef<HTMLDivElement>,
    private rendererService: AXRenderService,
    private loadingService: AXLoadingService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngAfterViewInit() {
    this._loadingId = this.loadingService.show(this.ref.nativeElement.querySelector('.ax-popup-body-container'));
    if (typeof this.content === 'string') {
      this.rendererService.findLoadedComponentByRoute(this.content, 20).then(route => {
        setTimeout(() => {
          this.loadComponent(route?.component);
        }, 300);
      });
    }
    else if (this.content instanceof TemplateRef) {
      const view = this.content.createEmbeddedView({ $implicit: this.data });
      this.popupBody.insert(view);
      this.isLoading = false;
      this.loadingService.hide(this._loadingId);
    }
    else if (typeof this.content === 'function') {
      setTimeout(() => {
        this.loadComponent(this.content);
      });
    }
  }


  private loadComponent(component: any) {

    if (component == null) {
      //TODO: 404 page component
      console.error(`Invalid page Component! ${this.content}`);
      return;
    }
    ///
    try {
      const factory = this.resolver.resolveComponentFactory(component);
      this.comRef = this.popupBody.createComponent(factory);
      const com = this.comRef.instance as any;
      if (com.onClosed) {
        com.onClosed.subscribe((e: AXPageCloseEvent) => {
          this.onClosed.emit(e);
        });
      }
      this[TAB_META_KEY].component = com;
      Object.assign(this[TAB_META_KEY].component, this.data);
      //
      if (com.getFooterButtons) {
        this.footerButtons = com.getFooterButtons();
      }
      if (com.onFooterButtonsChanged) {
        this.onFooterButtonsSubscription = (com.onFooterButtonsChanged as EventEmitter<AXButtonItem[]>).subscribe(c => {
          this.footerButtons = c;
          this.cdr.detectChanges();
        }) as any;
      }
      //
      this.focus();
      this.isLoading = false;
      this.loadingService.hide(this._loadingId);
      setTimeout(() => {
        this.comRef.changeDetectorRef.detectChanges();
      }, 100);
      this.cdr.detectChanges();
    } catch (error) {
      //TODO: 404 page component
      console.error(error);
    }
  }

  @ViewChild('popupBody', { read: ViewContainerRef, static: true })
  private popupBody: ViewContainerRef;

  @HostListener('keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.closable) {
      this.onCloseClick();
    }
  }

  private comRef: ComponentRef<any>;

  title: string;

  onClosed: EventEmitter<AXPageCloseEvent> = new EventEmitter<AXPageCloseEvent>();

  size: 'sm' | 'md' | 'lg' | 'full' = 'sm';
  modal: boolean = true;

  data: any = {};

  maximizable: boolean = false;

  closable: boolean = true;

  content: any;

  headerButtons: AXButtonItem[] = [];

  footerButtons: AXButtonItem[] = [];

  onCloseClick() {
    this.onClosed.emit({
      component: this[TAB_META_KEY].component,
      htmlElement: this.ref.nativeElement,
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.comRef) {
      this.comRef.destroy();
    }
    if (this.onFooterButtonsSubscription) {
      this.onFooterButtonsSubscription.unsubscribe();
    }
    this.cdr.detectChanges();
    this.loadingService.hide(this._loadingId);
  }

  focus() {
    setTimeout(() => this.ref.nativeElement.focus());
  }

  onFullScreen() { }

  handleFooterButtonClick(e: AXButtonItem) {
    if (e.onClick) {
      e.onClick();
    }
    else if (this[TAB_META_KEY].component.onFooterButtonClick) {
      this[TAB_META_KEY].component.onFooterButtonClick({
        component: this[TAB_META_KEY].component,
        name: e.name,
        data: e,
        htmlElement: this.ref.nativeElement,
      });
    }
  }
}
