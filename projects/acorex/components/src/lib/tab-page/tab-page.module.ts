import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTabPageRendererComponent } from './tab-page-Renderer.component';
import { AXLoadingModule } from '../loading/loading.module';
import { AXTabPageHostComponent } from './tab-page-host.component';

@NgModule({
    declarations: [AXTabPageRendererComponent, AXTabPageHostComponent],
    imports: [CommonModule, AXLoadingModule],
    exports: [AXTabPageRendererComponent],
    providers: []
})
export class AXTabPageModule { }