import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'ax-content',
  template: ` <ng-content> </ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AXDecoratorContentComponent  {
  constructor(elementRef: ElementRef, cdr: ChangeDetectorRef) {
  }
}
