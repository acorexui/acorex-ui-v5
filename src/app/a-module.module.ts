import { NgModule, Injectable } from '@angular/core';
import { PreloadingStrategy, Route, PRIMARY_OUTLET, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AXOnDemandPreloadService } from '@acorex/core';
import { from } from 'rxjs';



@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {

    private preloadOnDemand$: Observable<string>;

    constructor(
        private preloadOnDemandService: AXOnDemandPreloadService,
        private router: Router
    ) {
        this.preloadOnDemand$ = this.preloadOnDemandService.subject;
    }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // return this.preloadOnDemand$.pipe(
        //     mergeMap(preloadPath => {
        //         const fullPath = findPath(this.router.config, route).slice(1);
        //         const shouldPreload = fullPath === preloadPath;
        //         return shouldPreload ? load() : of(null);
        //     }),
        // );
        return from(new Promise((resolve) => {
            this.preloadOnDemand$.subscribe(c => {

              
                const fullPath = findPath(this.router.config, route);
                const shouldPreload = fullPath.slice(1) === c;
                resolve(shouldPreload ? load() : of(null));
            });
        }));
    }

   



}

const findPath = (config: Route[], route: Route): string => {
    config = config.slice();
    const parent = new Map<Route, Route>();
    const visited = new Set<Route>();
    while (config.length) {
        const el = config.shift();
        visited.add(el);
        if (el === route) break;
        let children = el.children || [];
        const current = (el as any)._loadedConfig;
        if (current && current.routes) {
            children = children.concat(current.routes);
        }
        children.forEach((r: Route) => {
            if (visited.has(r)) return;
            parent.set(r, el);
            config.push(r);
        });
    }
    let path = '';
    let current = route;

    while (current) {
        if (isPrimaryRoute(current)) {
            path = `/${current.path}${path}`;
        } else {
            path = `/(${current.outlet}:${current.path}${path})`;
        }
        current = parent.get(current);
    }

    return path;
};

function isPrimaryRoute(route: Route) {
    return route.outlet === PRIMARY_OUTLET || !route.outlet;
}


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [AXOnDemandPreloadService, SelectivePreloadingStrategy],
})
export class AModule { }
