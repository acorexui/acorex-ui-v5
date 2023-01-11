import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXProppertyEditorModule, AXSearchBarModule } from "@acorex/components";
import { SearchBarPage } from "./search-bar.page";

@NgModule({
  declarations: [SearchBarPage],
  imports: [
    CommonModule,
    AXSearchBarModule,
    AXProppertyEditorModule
  ],
  exports: [SearchBarPage],
  providers: []
})
export class SearchBarPageModule { }
