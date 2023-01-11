import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
    Injector, EmbeddedViewRef, Type, Compiler, NgModuleFactory
} from '@angular/core';
import { Router, Route } from '@angular/router';
import { AXOnDemandPreloadService } from './on-demand-preload-strategy.service';



@Injectable({ providedIn: 'root' })
export class AXRenderService {
    constructor(
        private appRef: ApplicationRef,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private compiler: Compiler,
        private modulePreloadService: AXOnDemandPreloadService,
        private injector: Injector) {
    }



    appendComponent<T>(
        componentClass: Type<T>,
        options: any = {},
        location?: Element): ComponentRef<any> {

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        Object.assign(componentRef.instance, options);
        //
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        componentRef.onDestroy(() => {
            this.appRef.detachView(componentRef.hostView);
        });
        if (location) {
            location.appendChild(domElem);
        } else {
            document.body.appendChild(domElem);
        }
        setTimeout(() => {
            componentRef.changeDetectorRef.detectChanges();
        }, 0);
        return componentRef;
    }

    findLoadedComponentByRoute(path: string, timeoutTime: number = 10): Promise<Route> {
        const delay = 200;
        const loop = timeoutTime * 1000 / delay;
        return new Promise((resolve, reject) => {
            let found: Route = null;
            let preload: boolean = false;
            const theLoop = (i) => {
                setTimeout(async () => {
                    found = await this._findLoadedComponentByRoute(path);
                    if (--i && found == null) {
                        if (!preload) {
                            this.modulePreloadService.startPreload(path);
                            preload = true;
                        }
                        theLoop(i);
                    }
                    else if (found) {
                        resolve(found);
                    }
                    else {
                        reject();
                    }
                }, delay);
            };
            theLoop(loop);
        });
    }

    private async _findLoadedComponentByRoute(search) {

        let found: Route = null;
        const f = (children, parentPath) => {
            for (const p in children) {
                if (children.hasOwnProperty(p)) {
                    const route = children[p];
                    const pp = (route.path != '' && route.path != null) ? parentPath + '/' + route.path : parentPath;
                    if (pp == search && !route._loadedConfig && route.component) {
                        found = route;
                        return;
                    } else if (route._loadedConfig || route.children) {
                        f(route.children || route._loadedConfig.routes, pp);
                    }
                }
            }
        };

        for (const p in this.router.config) {
            if (this.router.config.hasOwnProperty(p)) {
                const route = this.router.config[p];
                if (route.path === search && route.component) {
                    found = route;
                }
                else if (route['_loadedConfig'] || route.children) {
                    f(route.children || route['_loadedConfig'].routes, route.path);
                }
                if (found)
                    break;
            }
        }
        return found;
    }

}
