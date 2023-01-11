import { NgModule } from "@angular/core";
import { AXTreeSideMenuComponent } from "./tree-side-menu.component";
import { CommonModule } from "@angular/common";
import { AXDataSourceModule } from "../data-source/datasource.module";
import { AXCheckBoxModule } from "../checkbox/checkbox.module";
import { AXContextMenuModule } from "../context-menu/context-menu.module";

@NgModule({
  declarations: [AXTreeSideMenuComponent],
  imports: [
    AXDataSourceModule,
    CommonModule,
    AXCheckBoxModule,
    AXContextMenuModule,
  ],
  exports: [AXTreeSideMenuComponent],
  providers: [],
})
export class AXTreeSideMenuModule {}
