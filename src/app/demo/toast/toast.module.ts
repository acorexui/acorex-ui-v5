import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastPage } from './toast.page';
import { AXButtonModule } from '@acorex/components';

const MODULES = [AXButtonModule];

@NgModule({
    declarations: [ToastPage],
    imports: [CommonModule, ...MODULES],
    exports: [ToastPage],
    providers: []
})
export class ToastPageModule {}
