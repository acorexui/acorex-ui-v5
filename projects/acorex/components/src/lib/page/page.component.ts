import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXLoadingService } from '../loading/loading.service';

@Component({
  selector: 'ax-page',
  template: `
  <div class="page-content-wrap">
    <div class="ax-page-toolbar">
      <ng-content select="ax-toolbar"></ng-content>
    </div>
    <ng-content select="ax-page-content"></ng-content>
    <ng-content select="ax-page-footer"></ng-content>
  </div>
`
})
export class AXPageComponent {
  constructor(
    private el: ElementRef<HTMLElement>,
    private loadingService: AXLoadingService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngAfterViewInit(): void {
  }

  private _loadingId: number;

  private _isLoading: boolean = false;
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(v: boolean) {
    this._isLoading = v;
    if (this._loadingId && !v) {
      this.loadingService.hide(this._loadingId);
      this._loadingId = null;
    }
    if (v) {
      this._loadingId = this.loadingService.show(this.el.nativeElement);
    }
  }
}
