import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AXMenuItem } from '@acorex/core';
import { AXToolbarItem } from '../../../toolbar/toolbar-item';
import { AXToolbarMenuComponent } from '../../../toolbar/menu/toolbar-menu.component';




@Component({
    selector: 'ax-toolbar-scheduler-view',
    template: `
        <ax-toolbar-menu [items]="items" selection="single" (onItemClick)="onItemClick($event)"></ax-toolbar-menu>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerViewsComponent }]
})
export class AXToolbarSchedulerViewsComponent {
    constructor() { }

    @ViewChild(AXToolbarMenuComponent, { static: true }) menu: AXToolbarMenuComponent;
    items: AXMenuItem[] = [];

    update(): void {
        this.menu.update();
    }

    @Output()
    onViewChanged: EventEmitter<string> = new EventEmitter<string>();

    onItemClick(e: AXMenuItem) {
        this.onViewChanged.emit(e.name);
    }

}
