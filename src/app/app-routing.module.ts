import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AModule } from "./a-module.module";
import { ButtonPage } from "./demo/button/button.page";
import { CalendarPage } from "./demo/calendar/calendar.page";
import { DataGridPage } from "./demo/dataGrid/dataGrid.page";
import { DatePickerPage } from "./demo/datepicker/datepicker.page";
import { DateTimeFunctionPage } from "./demo/datetimefunction/datetimefunction.page";
import { DrawerPage } from "./demo/drawer/drawer.page";
import { HomePage } from "./demo/home/home.page";
import { I18nPage } from "./demo/i18n/i18n.page";
import { InputPage } from "./demo/input/input.page";
import { LovPage } from "./demo/lov/lov.page";
import { MenuPage } from "./demo/menu/menu.page";
import { PanelBoxPage } from "./demo/panelbox/panelbox.page";
import { PopupPage } from "./demo/popup/popup.page";
import { QueryBuilderPage } from "./demo/querybuilder/query-builder.page";
import { SearchBarPage } from "./demo/search-bar/search-bar.page";
import { SelectPage } from "./demo/select/select.page";
import { SelectBoxPage } from "./demo/selectbox/select-box.page";
import { ServicesPage } from "./demo/services/services.page";
import { TabPage } from "./demo/tab-page/tab-page.page";
import { TabViewPage } from "./demo/tab/tab.page";
import { TestPage } from "./demo/test/test.page";
import { ToastPage } from "./demo/toast/toast.page";
import { TreeViewPage } from "./demo/tree-view/tree-view.page";
import { TreeSideMenuPage } from "./demo/treeSideMenu/tree-side-menu.page";
import { UploadPage } from "./demo/upload/upload.page";
import { ValidationPage } from "./demo/validation/validation.page";
import { WidgetPage } from "./demo/widgets/widget.page";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "test", component: TestPage },
  { path: "home", component: HomePage },
  { path: "button", component: ButtonPage },
  { path: "drawer", component: DrawerPage },
  { path: "calendar", component: CalendarPage },
  { path: 'input', component: InputPage },
  { path: "menu", component: MenuPage },
  { path: "panelbox", component: PanelBoxPage },
  { path: "popup", component: PopupPage },
  { path: "select", component: SelectPage },
  { path: "searchbar", component: SearchBarPage },
  { path: "selectbox", component: SelectBoxPage },
  { path: "i18n", component: I18nPage },
  { path: "datagrid", component: DataGridPage },
  { path: "datepicker", component: DatePickerPage },
  { path: "toast", component: ToastPage },
  { path: "treeView", component: TreeViewPage },
  { path: "treeSideMenu", component: TreeSideMenuPage },
  { path: "Lov", component: LovPage },
  { path: "tab", component: TabViewPage },
  { path: "upload", component: UploadPage },
  { path: "validation", component: ValidationPage },
  { path: "services", component: ServicesPage },
  { path: "dateTimeFunction", component: DateTimeFunctionPage },
  { path: "tabs", component: TabPage },
  { path: "widgets", component: WidgetPage },
  { path: "queryBuilder", component: QueryBuilderPage },
  {
    path: "lazyWidgets",
    loadChildren: () =>
      import(/* webpackChunkName: "lazy.module" */"./demo/lazyWidgets/lazy-widgets.module").then(
        c => c.LazyWidgetsModule
      ),
  },
];

@NgModule({
  imports: [
    AModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    //RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
