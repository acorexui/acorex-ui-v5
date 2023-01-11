import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXTabPageService } from '@acorex/components';

@Component({
    template: `
        <div style="height:35px">
            <div class="tab-container">
                <div class="tab" style="float: right;margin: 10px;"  *ngFor="let tab of tabs" [class.active]="tab.active"
                    (click)="onTabClick(tab, $event)">
                    <div>
                        <span>{{ tab.title }}</span>
                        <span (click)="closeTab(tab,$event)">close</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:calc(100vh - 35px)">
            <ax-tab-page-renderer>
            </ax-tab-page-renderer>
        </div>
    `,
    host: { style: 'display:block;overflow:hidden' }
})
export class TabPage {

    tabs: any[] = [];

    constructor(private tabService: AXTabPageService, private cdr: ChangeDetectorRef) {
        this.tabService.changed.subscribe(c => {
            this.tabs = this.tabService.tabs;
            cdr.detectChanges();
        });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // const tab1 = this.tabService.open('widgets', 'Page 1');
        // tab1.then(c => {
        //     ;
        // }).finally(() => {
        //     ;
        // });

        // setTimeout(() => {
        //     ;
        //     tab1.close();
        // }, 5000);

        // setTimeout(() => {

        // }, 3000);
        // this.tabService.open('popup', 'Page 2');
        // this.tabService.open('input', 'Page 3');
        this.tabService.open('lazyWidgets/test/l1/l2', 'page Grid');
        this.tabService.open('calendar', 'calendar');
    }

    onTabClick(tab, e: MouseEvent) {
        if (e.which == 2) {
            this.tabService.close(tab);
        } else {
            this.tabService.active(tab);
        }
    }

    closeTab(tab, e: MouseEvent) {
        e.stopPropagation();
        this.tabService.close(tab);
    }

}