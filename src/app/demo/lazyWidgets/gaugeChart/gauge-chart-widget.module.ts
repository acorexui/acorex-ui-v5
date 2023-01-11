import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { GaugeChartWidgetComponent } from './gauge-chart-widget.component';
import { AXTranslator } from '@acorex/core';

@NgModule({
    imports: [RouterModule.forChild([
            {
                component: GaugeChartWidgetComponent,
                path: ''
            },
        ])],
    exports: [RouterModule],
    declarations: [GaugeChartWidgetComponent],
    providers: []
})
export class GaugeChartWidgetModule {
    constructor() {
        
    }
}
