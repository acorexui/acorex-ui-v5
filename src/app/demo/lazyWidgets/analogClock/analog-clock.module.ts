import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalogClockWidgetComponent } from './analog-clock.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                component: AnalogClockWidgetComponent,
                path: ''
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [AnalogClockWidgetComponent],
    providers: []
})
export class AnalogClockWidgetModule {}
