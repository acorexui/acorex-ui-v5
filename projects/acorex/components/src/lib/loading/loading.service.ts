import { Injectable, ComponentRef, EventEmitter } from '@angular/core';
import { AXRenderService } from '@acorex/core';
import { AXLoadingPanelComponent } from './loading-panel.component';
import { AXOverlayService, AXOverlayViewRef } from '../popover/overlay.service';
import { AXLoadingIndicatorComponent } from './loading-indicator.component';


@Injectable({ providedIn: 'root' })
export class AXLoadingService {

    private _stack: { id: number, component: AXOverlayViewRef }[] = [];


    constructor(private injection: AXRenderService, private overlayService: AXOverlayService) {

    }

    show(location?: Element): number {
        let host: Element;
        if (location) {
            host = location.closest('.ax-loading-host');
        }
        const containerElement = (host || location) as HTMLDivElement;
        const com = this.overlayService.show(AXLoadingIndicatorComponent, {},
            {
                closeOnClickOutside: false,
                containerElement,
                hasBackdrop: true,
                backdropClass: ['ax-loading-overlay'],
                scroll: 'block'
            });
        const id = new Date().getTime();
        this._stack.push({ id, component: com });
        return id;
    }

    hide(id): void {
        const f = this._stack.find(c => c.id === id);
        if (f) {
            f.component.dispose();
            this._stack = this._stack.filter(c => c.id !== id);
        }
    }
}