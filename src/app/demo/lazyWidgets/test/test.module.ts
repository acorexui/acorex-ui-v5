import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TestWidgetComponent } from './test-widget.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forChild([{
                path: 'l1',
                children: [
                    {
                        path: 'l2',
                        component: TestWidgetComponent,
                    },
                    {
                        path: 'l3',
                        component: TestWidgetComponent,
                    }
                ]
            }]), CommonModule
    ],
    exports: [RouterModule],
    declarations: [TestWidgetComponent],
    providers: []
})
export class TestWidgetModule {
}
