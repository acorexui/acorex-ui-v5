import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { AXDrawerComponent } from './drawer.component';

@Component({
  selector: 'ax-drawer-container',
  template: `
    <ng-content select="ax-drawer[location='start']"> </ng-content>
    <ng-content> </ng-content>
    <ng-content select="ax-drawer[location='end']"> </ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AXDrawerContainerComponent  {
  constructor(
    private elementRef: ElementRef,
    cdr: ChangeDetectorRef,
    private _zone: NgZone
  ) {
  }

  ngDoCheck() {
    const host = this.elementRef.nativeElement;
    Array.from(host.querySelectorAll('ax-drawer'))
      .map((c) => c['__axContext__'] as AXDrawerComponent)
      .some((c) => !c?.collapsed)
      ? host.classList.add('ax-visible')
      : host.classList.remove('ax-visible');
  }
}
