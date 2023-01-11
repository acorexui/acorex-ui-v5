import { Component, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { AXMenuItem } from '@acorex/core';
import { AXElementSize } from '../base/element.class';
import { AXBaseEvent } from '../base/events.class';

@Component({
  selector: 'ax-context-menu',
  templateUrl: './context-menu.component.html',
  host: { class: 'ax context-menu-container' }
})
export class AXContextMenuComponent {
  @Input()
  size: AXElementSize = 'md';

  @Input()
  width: number;

  @Input()
  items: AXMenuItem[] = [];

  @Output()
  onItemClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onClosed: EventEmitter<AXBaseEvent> = new EventEmitter<AXBaseEvent>();

  @ViewChild('contex')
  contex: ElementRef<HTMLUListElement>;



  show: boolean = false;

  constructor(private container: ElementRef) {
  }

  ngAfterViewInit(): void {
  }

  close() {
    this.show = false;
    this.onClosed.emit({
      component: this
    });
  }



  open(_left, _top, _rtl = false) {
    this.show = true;
    setTimeout(() => {
      const containRec = this.container.nativeElement.getBoundingClientRect();
      let left = _rtl === false ? _left : _left - containRec.width;
      let top = _top;
      if (_rtl === false && _left + containRec.width > window.innerWidth) {
        left = window.innerWidth - containRec.width;
      } else if (_rtl === true && _left - containRec.width < 0) {
        left = 0;
      }
      if (top + containRec.height > window.innerHeight) {
        top = _top - containRec.height;
      }
      this.container.nativeElement.style.left = left + 'px';
      this.container.nativeElement.style.top = top + 'px';

    }, 5);


  }



  handleClickItem(item: AXMenuItem) {
    if (!item.disable || item.disable === undefined) {
      this.onItemClick.emit(item);
    }
  }
}
