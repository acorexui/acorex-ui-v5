import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinearChartWidgetComponent } from './linear-chart-widget.component';

@NgModule({
    imports: [RouterModule.forChild([
            {
                component: LinearChartWidgetComponent,
                path: ''
            },
        ])],
    exports: [RouterModule],
    declarations: [LinearChartWidgetComponent],
    providers: []
})
export class LinearChartWidgetModule {}