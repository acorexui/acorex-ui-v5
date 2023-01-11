import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AXButtonModule, AXDataSourceModule, AXSelectBoxModule, AXTextBoxModule, AXLabelModule } from '@acorex/components';
import { DigitalClockWidgetComponent } from './digital-clock.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                component: DigitalClockWidgetComponent,
                path: ''
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [DigitalClockWidgetComponent],
    providers: []
})
export class DigitalClockWidgetModule {}
