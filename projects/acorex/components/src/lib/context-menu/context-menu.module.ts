import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXContextMenuComponent } from './context-menu.component';
import { AXContextMenuDirective } from './context-menu.directive';


@NgModule({
    declarations: [AXContextMenuComponent, AXContextMenuDirective],
    imports: [CommonModule],
    exports: [AXContextMenuComponent, AXContextMenuDirective],
    providers: [],
})
export class AXContextMenuModule {

}