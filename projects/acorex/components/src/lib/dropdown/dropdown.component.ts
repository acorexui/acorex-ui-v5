import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  ElementRef,
  AfterViewInit,
  HostListener,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewContainerRef,
  TemplateRef,
  OnDestroy,
  DebugElement
} from '@angular/core';
import { AXBaseDropdownComponent } from '../base/element.class';
import { AXHtmlEvent } from '../base/events.class';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AXConfig } from '@acorex/core';

@Component({
  selector: 'ax-drop-down',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:contents;' }
})
export class AXDropdownComponent extends AXBaseDropdownComponent implements AfterViewInit, OnDestroy {
  @ViewChild('baseTemplate') baseTemplate: TemplateRef<any>;
  @ViewChild('content', { static: false }) content: ElementRef<HTMLDivElement>;
  @ViewChild('endButtons', { static: false }) endButtons: ElementRef<HTMLDivElement>;
  @ViewChild('el', { static: true }) dropdownEL: ElementRef<HTMLDivElement>;

  @Input()
  rtl: boolean = AXConfig.get('layout.rtl');

  @Input()
  readonly: boolean = false;

  @Input()
  loading: boolean = false;

  @Output()
  dropdownToggle: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onButtonClick: EventEmitter<AXHtmlEvent<MouseEvent>> = new EventEmitter<AXHtmlEvent<MouseEvent>>();

  @HostListener('keydown', ['$event'])
  onKeydownHandler(e: KeyboardEvent) {
    if (!this.disabled && e.key === 'Enter' && e.type === 'keydown') {
      if (!this.readonly) {
        this.toggle();
        // this.dropdownToggle.emit({ mode: 'enter' });
      }
    }
    if (e.key === 'Escape') {
      if (this.isOpen) {
        this.close();
        e.stopPropagation();
      }
    }
  }

  @Input()
  dropdownWidth: string = "300px";

  private overlayRef: OverlayRef;
  private templatePortal: TemplatePortal;

  constructor(
    private cdr: ChangeDetectorRef,
    private ref: ElementRef<HTMLDivElement>,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
    setTimeout(() => {
      this.ref.nativeElement.classList.add(this.rtl ? 'rtl' : 'ltr');
      this.dropdownEL.nativeElement.classList.add(this.rtl ? 'rtl' : 'ltr');
    }, 5);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.endButtons && this.endButtons.nativeElement.childNodes.length !== 0) {
        this.content.nativeElement.style.paddingInlineEnd = `${this.endButtons.nativeElement.clientWidth}px`;
      }
      if (this.fitParent == true) {
        this.dropdownWidth = `${this.dropdownEL.nativeElement.offsetWidth}px`;
      }
    }, 5);
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }

  handleArrowClick(e: AXHtmlEvent<MouseEvent>) {
    setTimeout(() => {
      this.toggle();
    }, 0);
  }

  toggle() {
    if (this.disabled !== true) {
      this.isOpen ? this.close() : this.open();
    }
  }

  close() {
    if (!this.isOpen) {
      return;
    }
    this.overlayRef?.detach();
    this.dropdownToggle.emit({ mode: 'close' });
  }

  open() {
    if (this.isOpen) {
      return;
    }
    this.ensureOverlayCreated();
    this.overlayRef.attach(this.templatePortal);
    this.dropdownToggle.emit({ mode: 'open' });
  }

  private ensureOverlayCreated() {
    if (!this.overlayRef) {
      const targetEl = document.querySelector<HTMLElement>('#' + this.uid);
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(targetEl)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          },
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'bottom'
          }
        ])
        .withPush(false);
      this.overlayRef = this.overlay.create({
        positionStrategy,

        //width: this.dropdownEL.nativeElement.clientWidth,
        scrollStrategy: this.overlay.scrollStrategies.reposition({
          autoClose: true
        }),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop'
      });
      this.overlayRef.setDirection(this.rtl ? 'rtl' : 'ltr');
      this.overlayRef.backdropClick().subscribe(() => this.close());
    }
    if (!this.templatePortal) {
      this.templatePortal = new TemplatePortal(this.baseTemplate, this.viewContainerRef);
    }
  }

  get isOpen(): boolean {
    return this.overlayRef ? this.overlayRef.hasAttached() : false;
  }

  updatePosition(): void {
    this.overlayRef?.updatePosition();
  }
  focus() { }
}
