import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BarChartWidgetComponent } from './bar-char-widget.component';

@NgModule({
    imports: [RouterModule.forChild([
            {
                component: BarChartWidgetComponent,
                path: ''
            },
        ])],
    exports: [RouterModule],
    declarations: [BarChartWidgetComponent],
    providers: []
})
export class BarChartWidgetModule {
}
