import { Directive, HostListener, Input } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[horizontalScroll]'
})
export class AXHorizontalScrollDirective {
  constructor(private el: ElementRef<HTMLElement>) { }

  @Input('horizontalScroll')
  scrollValue = 40;

  @HostListener('wheel', ['$event'])
  onMouseWheel(e) {
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    this.el.nativeElement.scrollLeft -= delta * this.scrollValue;
  }
}
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[verticalScroll]'
})
export class AXVerticalScrollDirective {
  constructor(private el: ElementRef<HTMLElement>) { }

  @Input('verticalScroll')
  scrollValue = 40;

  @HostListener('wheel', ['$event'])
  onMouseWheel(e) {
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    this.el.nativeElement.scrollTop -= delta * this.scrollValue;
  }
}
