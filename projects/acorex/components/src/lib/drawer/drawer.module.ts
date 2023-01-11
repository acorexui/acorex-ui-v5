import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXDrawerComponent } from './drawer.component';
import { AXDrawerContainerComponent } from './drawer-container.component';
import { AXDecoratorContentComponent } from './content.component';

const COMPONENT = [AXDrawerComponent, AXDrawerContainerComponent,AXDecoratorContentComponent];
const MODULES = [CommonModule];

@NgModule({
    declarations: [...COMPONENT],
    imports: [...MODULES],
    exports: [...COMPONENT],
    providers: [],
})
export class AXDrawerModule { }
