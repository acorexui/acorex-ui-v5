import { Component, OnInit } from '@angular/core';
import { Router, RouterPreloader } from '@angular/router';
import { AXOnDemandPreloadService } from '@acorex/core';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage {

    items: any[] = [];
    constructor(
        private router: Router,
        private ss: AXOnDemandPreloadService,
        private loader: RouterPreloader
    ) {
        // setTimeout(() => {
        //     ss.startPreload('lazyWidgets');
        // }, 1000);
        // setTimeout(() => {
        //     loader.preload().subscribe(c => {
        //          ;
        //     });
        // }, 5000);
        // router.navigate(['/home', { outlets: { 'moduleLoader': ['/lazyWidgets/bar-chart'] } }], { skipLocationChange: true });
        // //router.navigate(['/lazyWidgets/bar-chart']);
        const _routes = router.config;
        _routes.forEach(i => {
            if (i.path !== '' && i.path !== 'home' && !i.path.startsWith('ax/')) {
                this.items.push(i);
            }
        });
    }
    onItemClick(item) {
        // tslint:disable-next-line: no-string-literal
        // tslint:disable-next-line: no-unused-expression
        this.router.navigate([item.path]);
    }
}
