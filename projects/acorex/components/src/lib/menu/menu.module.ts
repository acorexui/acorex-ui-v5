import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXMenuComponent } from './menu.component';
import { AXMenu2Component } from './menu2.component';
import { AXMenuItemComponent } from './menu-item.component';
import { AXTooltipModule } from '../tooltip/tooltip.module';
@NgModule({
  declarations: [AXMenuComponent, AXMenu2Component, AXMenuItemComponent],
  imports: [CommonModule,AXTooltipModule],
  exports: [AXMenuComponent, AXMenu2Component, AXMenuItemComponent],
  providers: []
})
export class AXMenuModule { }
