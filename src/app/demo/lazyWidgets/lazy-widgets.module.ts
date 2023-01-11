import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AXTextBoxModule, AXNumberBoxModule, AXSelectBoxModule, AXButtonModule, AXColorPickerModule, AXLabelModule } from '@acorex/components';
import { CommonModule } from '@angular/common';
import { AXPageModule } from 'projects/acorex/components/src/public-api';
import { QueryScalerWidgetComponent } from './query-scalar/query-scalar-widget.component';
import { TestWidgetModule } from './test/test.module';

@NgModule({
    imports: [
        CommonModule,
        AXTextBoxModule,
        AXNumberBoxModule,
        AXSelectBoxModule,
        AXButtonModule,
        AXColorPickerModule,
        AXPageModule,
        AXLabelModule,
        RouterModule.forChild([
            {
                path: 'test',
                loadChildren: () => import(/* webpackChunkName: "lazy-test.module" */ './test/test.module').then(c => c.TestWidgetModule)
                //loadChildren: () => TestWidgetModule
            },
            {
                path: 'query-scaler',
                component: QueryScalerWidgetComponent
            },
            {
                path: 'gauge-chart',
                loadChildren: () => import('./gaugeChart/gauge-chart-widget.module').then(c => c.GaugeChartWidgetModule)
            },
            {
                path: 'double-gauge-chart',
                loadChildren: () => import('./doubleGaugeChart/double-gauge-chart-widget.module').then(c => c.DoubleGaugeChartWidgetModule)
            },
            {
                path: 'linear-chart',
                loadChildren: () => import('./linearChart/linear-chart-widget.module').then(c => c.LinearChartWidgetModule)
            },
            {
                path: 'pie-chart',
                loadChildren: () => import('./pieChart/pie-chart-widget.module').then(c => c.PieChartWidgetModule)
            },
            {
                path: 'bar-chart',
                loadChildren: () => import('./BarChart/bar-char-widget.module').then(c => c.BarChartWidgetModule)
            },
            {
                path: 'table',
                loadChildren: () => import('./test/test.module').then(c => c.TestWidgetModule)
            },
            {
                path: 'note',
                loadChildren: () => import('./noteWidget/note.module').then(c => c.NoteWidgetModule)
            },
            {
                path: 'analog-clock',
                loadChildren: () => import('./AnalogClock/analog-clock.module').then(c => c.AnalogClockWidgetModule)
            },
            {
                path: 'digital-clock',
                loadChildren: () => import('./DigitalClock/digital-clock.module').then(c => c.DigitalClockWidgetModule)
            },
            {
                path: 'digital-clock',
                loadChildren: () => import('./DigitalClock/digital-clock.module').then(c => c.DigitalClockWidgetModule)
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class LazyWidgetsModule {
}
