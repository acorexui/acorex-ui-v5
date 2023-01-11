import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  NgZone,
  Input,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import { AXClosbaleComponent, AXComponent } from '../base/components.class';

export type AXDrawerMode = 'push' | 'overlay';
export type AXDrawerLocation = 'start' | 'end';

@Component({
  selector: 'ax-drawer',
  template: `
    <ng-content select=".header"> </ng-content>
    <ng-content> </ng-content>
  `,
  host: { class: 'ax-drawer' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: AXComponent, useExisting: AXDrawerComponent },
    { provide: AXClosbaleComponent, useExisting: AXDrawerComponent }
  ]
})
export class AXDrawerComponent {
  constructor(private _elementRef: ElementRef, _cdr: ChangeDetectorRef, private _zone: NgZone) {
    this._elementRef.nativeElement['__axContext__'] = this;
  }

  @Output()
  public locationChange: EventEmitter<AXDrawerLocation> = new EventEmitter<AXDrawerLocation>();

  private _location: AXDrawerLocation;
  @Input()
  public get location(): AXDrawerLocation {
    return this._location;
  }
  public set location(v: AXDrawerLocation) {
    if (v != this._location) {
      this._location = v;
      this.locationChange.emit(v);
      this._checkProps();
    }
  }

  @Output()
  public modeChange: EventEmitter<AXDrawerMode> = new EventEmitter<AXDrawerMode>();

  private _mode: AXDrawerMode = 'overlay';
  @Input()
  public get mode(): AXDrawerMode {
    return this._mode;
  }
  public set mode(v: AXDrawerMode) {
    if (v != this._mode) {
      this._mode = v;
      this.modeChange.emit(v);
      this._checkProps();
    }
  }

  @Output()
  public collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _collapsed: boolean = true;
  @Input()
  public get collapsed(): boolean {
    return this._collapsed;
  }
  public set collapsed(v: boolean) {
    if (v != this._collapsed) {
      this._collapsed = v;
      this.collapsedChange.emit(v);
      this._checkProps();
    }
  }

  ngAfterViewInit(): void {
    this._detectBoundingSize();
  }

  ngDoCheck() {
    this._detectBoundingSize();
  }

  private _detectBoundingSize() {
    this._zone.runOutsideAngular(() => {
      const host = this._elementRef.nativeElement;
      if (host.clientWidth) host.style.setProperty('--ax-el-width', `${host.clientWidth}px`);
    });
  }

  private _checkProps() {
    this._detectBoundingSize();
    this._removeBackdrop();
    if (this.mode == 'overlay') {
      if (!this.collapsed) {
        this._addBackdrop();
      }
    }
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  close() {
    this.collapsed = true;
  }

  open() {
    this.collapsed = false;
  }

  @HostBinding('class')
  private get __hostClass(): string {
    //return `ax-drawer-${this.mode} ax-drawer-${this.location} ${this.collapsed ? 'ax-collapsed' : 'ax-expanded'} ${!this._loaded ? 'ax-preload' : ''}`;
    return `ax-drawer-${this.mode} ax-drawer-${this.location} ${this.collapsed ? 'ax-collapsed' : 'ax-expanded'}`;
  }

  private _backdropElement: HTMLElement | any;
  // private _loaded: boolean = false;

  private _addBackdrop() {
    this._zone.runOutsideAngular(() => {
      this._backdropElement = document.createElement('div');
      this._backdropElement.classList.add('ax-backdrop');
      this._backdropElement.onclick = () => {
        this._zone.run(() => {
          this.close();
        });
      };
      this._elementRef.nativeElement.parentElement?.appendChild(this._backdropElement);
    });
  }
  private _removeBackdrop() {
    this._zone.runOutsideAngular(() => {
      if (this._backdropElement) {
        this._elementRef.nativeElement.parentElement?.removeChild(this._backdropElement);
        this._backdropElement = null;
      }
    });
  }
}
