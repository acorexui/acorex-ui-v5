import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'ax-loading-panel',
    template: `
    <div onclick="return false;" class="ax ax-loading-panel ax-overlay-wrapper ax-overlay-modal ax-loading-overlay" *ngIf="visible" >
        <ax-loading-indicator tabindex="0" cdkTrapFocus>
        </ax-loading-indicator>
    </div>
  `
})
export class AXLoadingPanelComponent implements OnInit {

    constructor(private ref: ElementRef<HTMLDivElement>) {

    }

    @Input()
    visible: boolean = false;

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        const host = this.ref.nativeElement.closest('.ax-loading-host');
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}

