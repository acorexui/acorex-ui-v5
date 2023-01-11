import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DoubleGaugeChartWidgetComponent } from './double-gauge-chart-widget.component';

@NgModule({
    imports: [RouterModule.forChild([
            {
                component: DoubleGaugeChartWidgetComponent,
                path: ''
            },
        ])],
    exports: [RouterModule],
    declarations: [DoubleGaugeChartWidgetComponent],
    providers: []
})
export class DoubleGaugeChartWidgetModule {
}
