import { Component, Input, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AXOverlayService, AXOverlayViewRef } from './overlay.service';
import { AXConnectedPosition } from '@acorex/core';


@Component({
  selector: 'ax-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXPopoverComponent {
  constructor(
    private overlayService: AXOverlayService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef) {

  }
  //
  private targetEl: HTMLElement;
  private overlay: AXOverlayViewRef;
  @ViewChild('tpl')
  private template: TemplateRef<any>;
  //
  @Input('target') target: string | HTMLElement;
  //
  @Input('position') position: AXConnectedPosition;
  //
  @Input('openMode') openMode: 'manual' | 'click' | 'hover' = 'manual';
  //
  @Input('closeMode') closeMode: 'manual' | 'clickout' | 'mouseout' = 'clickout';
  //
  private _visible: boolean = false;
  @Input()
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(v: boolean) {
    if (v !== this._visible) {
      if (v) {
        this.internalShow();
      } else {
        this.internalHide();
      }
      this._visible = v;
      this.cdr.detectChanges();
    }
  }
  //
  toggle() {
    this.visible = !this.visible;
  }

  close() {
    this.zone.run(() => {
      this.visible = false;
    });
  }

  open() {
    this.zone.run(() => {
      this.visible = true;
    });
  }

  private internalShow() {
    if (this.isOpen) {
      return;
    }
    this.overlay = this.overlayService.show(this.template, {}, {
      closeOnClickOutside: this.closeMode === 'clickout',
      targetElement: this.targetEl,
      hasBackdrop: this.closeMode === 'clickout',
      position: this.position,
      onBackdropClick: () => {
        this._visible = false;
      }
    });
  }

  private internalHide() {
    if (this.overlay) {
      this.overlay.dispose();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.targetEl = typeof this.target === 'string' ? document.querySelector<HTMLElement>(this.target) : this.target;
      //
      if (this.closeMode === 'mouseout') {
        this.targetEl.addEventListener('mouseout', this.close.bind(this));
      }
      if (this.openMode === 'hover' && this.targetEl) {
        this.targetEl.addEventListener('mouseover', this.open.bind(this));
      }
      //
      if (this.openMode === 'click' && this.targetEl) {
        this.targetEl.addEventListener('click', this.open.bind(this));
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.openMode === 'click' && this.targetEl) {
      this.targetEl.removeEventListener('mouseover', this.open.bind(this));
      this.targetEl.removeEventListener('click', this.open.bind(this));
      this.targetEl.removeEventListener('mouseout', this.open.bind(this));
    }
  }

  get isOpen(): boolean {
    return this.visible;
  }
}
