import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PieChartWidgetComponent } from './pie-chart-widget.component';

@NgModule({
    imports: [RouterModule.forChild([
            {
                component: PieChartWidgetComponent,
                path: ''
            },
        ])],
    exports: [RouterModule],
    declarations: [PieChartWidgetComponent],
    providers: []
})
export class PieChartWidgetModule {}