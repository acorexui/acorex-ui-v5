import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { SubItemsEvent } from './menu-item.component';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { AXMenuItem } from '@acorex/core';

@Component({
    selector: 'ax-menu2',
    template: `
     <div class="ax ax-menu ax-menu-vertical" [attr.data-level]="level">
        <ax-menu-item
            *ngFor="let item of items"
            [level]="level"
            [item]="item"
            (showSubMenu)="showSubmenu($event)">
        </ax-menu-item>
     </div>
    `,
    styleUrls: ['./menu2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXMenu2Component implements OnDestroy {
    subItemsOverlays = new Array<OverlayRef>();
    level: number = 0;

    @Input() items: AXMenuItem[];
    @Output() selected = new EventEmitter<AXMenuItem>();
    //@ViewChild(TemplateRef) template;

    constructor(
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private elementRef: ElementRef
    ) { }

    showSubmenu(event: SubItemsEvent) {
        const position: ConnectedPosition[] = [];
        if (event.level === 0) {
            position.push({
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            });
        } else {
            position.push({
                originX: 'end',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            });
        }

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(event.element)
            .withPositions(position);
        const overlayRef = this.overlay.create({
            positionStrategy,
            hasBackdrop: false,
            backdropClass: 'cdk-overlay-transparent-backdrop'
        });
        this.subItemsOverlays.push(overlayRef);
        const portal = new ComponentPortal(AXMenu2Component, this.viewContainerRef);

        const com = overlayRef.attach(portal);
        com.instance.level = event.level + 1;
        com.instance.items = event.item.items;
    }

    @HostListener('document:click', ['$event.target'])
    public onDocumentClick(target) {
        const clickedInside = this.elementRef.nativeElement.contains(target);
        if (!clickedInside) {
            this.hideOverlays();
        }
    }

    hideOverlays() {
        this.subItemsOverlays.forEach((o) => o.dispose());
        this.subItemsOverlays.length = 0;
    }
    ngOnDestroy() {
        this.hideOverlays();
    }
}
