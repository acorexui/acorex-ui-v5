import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { AXMenuItem } from '@acorex/core';

@Component({
    selector: 'ax-menu-item',
    template: `
      <div  class="ax-menu-item {{item.style}}" [attr.data-level]="level" (click)="showSubItems($event)" [ngClass]="{'disabled': item.disable}" >
        <i *ngIf="item.startIcon" class="icon {{item.startIcon}}"></i>
        <span class="text">{{ item.text }}</span>
        <i *ngIf="item.endIcon" class="icon {{item.endIcon}}"></i>
        <i class="far fa-angle-down icon drop-icon" *ngIf="item?.items?.length && item.text"></i>
      </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AXMenuItemComponent {
    @Input() item: AXMenuItem;
    @Input() level: number;
    @Output() showSubMenu = new EventEmitter<SubItemsEvent>();

    constructor(private element: ElementRef) { }

    showSubItems(event: Event) {
        event.stopPropagation();
        if (this.item?.items?.length) {
            this.showSubMenu.emit({ item: this.item, element: this.element, level: this.level });
        }
    }
}
export interface SubItemsEvent {
    element: ElementRef;
    item: AXMenuItem;
    level: number;
}
