import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AXBaseEvent } from '../base/events.class';

export declare class AXTabStripItem {
  id: string;
  name?: string;
  text?: string;
  tooltip?: string;
  icon?: string;
  visible?: boolean;
  disable?: boolean;
  data?: any;
  style?: string;
  active?: boolean;
}

export class AXTabStripChangedEvent extends AXBaseEvent {
  seledtedTab: AXTabStripItem;
}

@Component({
  selector: 'ax-tab-strip',
  templateUrl: './tab-strip.component.html'
})
export class AXTabStripComponent implements OnInit {
  constructor(private ref: ElementRef) {}

  ngOnInit(): void {}

  @Input()
  items: AXTabStripItem[] = [];

  @Output()
  onTabChanged: EventEmitter<AXTabStripChangedEvent> = new EventEmitter<AXTabStripChangedEvent>();

  handleClick(i: AXTabStripItem) {
    if (!i.disable) {
      this.items.forEach((c) => (c.active = false));
      i.active = true;
      this.onTabChanged.emit({
        component: this,
        seledtedTab: i,
        htmlElement: this.ref.nativeElement
      });
    }
  }
}
