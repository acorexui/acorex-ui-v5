import { AXBasePageComponent, AXTabStripChangedEvent, AXTabStripItem } from '@acorex/components';
import { AXWidgetConfig } from '@acorex/layout';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface AXWidgetGalleryItem {
    title: string;
    description: string;
    config: AXWidgetConfig;
    group: string;
    icon?: string;
}


@Component({
    templateUrl: './widget-gallery.component.html',
    styleUrls: ['./widget-gallery.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXWidgetGalleryComponent extends AXBasePageComponent implements OnInit {

    constructor() {
        super();
    }

    tabItems: AXTabStripItem[] = [];
    galleryItems: AXWidgetGalleryItem[] = [];
    visibleItems: AXWidgetGalleryItem[] = [];

    handleOnTabchanged(e: AXTabStripChangedEvent) {
        this.visibleItems = this.galleryItems.filter(c => c.group === e.seledtedTab.id).slice();
    }

    ngOnInit() {
        if (this.galleryItems.some(c => c.group)) {
            this.galleryItems.forEach(i => {
                if (!this.tabItems.some(c => c.text === i.group)) {
                    this.tabItems.push({
                        id: i.group,
                        text: i.group
                    });
                }
            });
            this.tabItems[0].active = true;
            this.visibleItems = this.galleryItems.filter(c => c.group === this.tabItems[0].id).slice();
        }
        else {
            this.visibleItems = this.galleryItems.slice();
        }
    }

    handleAddWidgetMouseClick(e: MouseEvent, widget: AXWidgetGalleryItem) {
        this.close(widget.config);
    }
}