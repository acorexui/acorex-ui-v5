import { NgModule } from '@angular/core';
import { AXRenderService } from './render.service';
import { AXOnDemandPreloadService } from './on-demand-preload-strategy.service';


// @dynamic
export function getOnDemandPreloadServiceFactory() {
    return new AXOnDemandPreloadService();
}

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        {
            provide: AXOnDemandPreloadService,
            useFactory: getOnDemandPreloadServiceFactory
        },
        AXRenderService
    ],
})
export class AXRenderingModule {

}
