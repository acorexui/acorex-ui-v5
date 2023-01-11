import { AXPopoverModule, AXProppertyEditorModule, AXToastService } from '@acorex/components';
import { AXConfig, AXErrorDisplayInterceptor, AXHttpService, AXTranslator, AX_ERROR_DISPLAY_INTERCEPTOR } from '@acorex/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsPageModule } from './demo/button/button.module';
import { CalendarPageModule } from './demo/calendar/calendar.module';
import { DataGridPageModule } from './demo/dataGrid/dataGrid.page.module';
import { DatePickerPageModule } from './demo/datepicker/datepicker.module';
import { DateTimeFunctionPageModule } from './demo/datetimefunction/datetimefunction.module';
import { DrawerPageModule } from './demo/drawer/drawer.module';
import { HomePageModule } from './demo/home/home.module';
import { I18nPageModule } from './demo/i18n/i18n.page.module';
import { InputPageModule } from './demo/input/input.module';
import { LovPageModule } from './demo/lov/lov.page.module';
import { MenuPageModule } from './demo/menu/menu.module';
import { PanelBoxPageModule } from './demo/panelbox/panelbox.module';
import { PopupPageModule } from './demo/popup/popup.module';
import { QueryBuilderPageModule } from './demo/querybuilder/query-builder.page.module';
import { SearchBarPageModule } from './demo/search-bar/search-bar.page.module';
import { SelectPageModule } from './demo/select/select.module';
import { SelectBoxPageModule } from './demo/selectbox/select-box.page.module';
import { ServicesPageModule } from './demo/services/services.module';
import { TabPageModule } from './demo/tab-page/tab-page.module';
import { TabViewModule } from './demo/tab/tab.module';
import { TestPageModule } from './demo/test/test.module';
import { ToastPageModule } from './demo/toast/toast.module';
import { TreeViewPageModule } from './demo/tree-view/tree-view.page.module';
import { TreeSideMenuPageModule } from './demo/treeSideMenu/tree-side-menu.page.module';
import { UploadPageModule } from './demo/upload/upload.module';
import { ValidationPageModule } from './demo/validation/validation.module';
import { WidgetPageModule } from './demo/widgets/widget.module';



export function getHolidays(start: Date, end: Date, calendar) {
  return [
    { date: new Date(2020, 5, 27, 0, 0, 0), title: '', description: '' },
    { date: new Date(2020, 5, 30, 0, 0, 0), title: '', description: '' }
  ];
}

export function getWeekends(start: Date, end: Date, calendar) {
  if (calendar === 'jalali') {
    return [6];
  } else {
    return [0, 6];
  }
}

export function initApp() {
  return () => {
    return new Promise<void>((resolve) => {
      AXConfig.set({
        dateTime: {
          type: 'jalali',
          holidays: getHolidays,
          weekends: getWeekends
        },
        datagrid: {
          floatingFilter: false,
          allowFiltering: true
        },
        layout: {
          rtl: false
        }
      });

      AXTranslator.use('fa');
      AXTranslator.load('jp', {
        validation: {
          messages: {
            required: 'required!!!'
          }
        }
      });
      resolve();
    });
  };
}

@Injectable()
export class AXDefaultErrorDisplayInterceptor implements AXErrorDisplayInterceptor {
  constructor(private toast: AXToastService) { }

  show(message: string) {
    console.error(message);
    this.toast.error(message, {
      timeOut: 3000
    });
  }
}

const DEMO = [
  HttpClientModule,
  HomePageModule,
  ButtonsPageModule,
  DrawerPageModule,
  I18nPageModule,
  PopupPageModule,
  SelectPageModule,
  SelectBoxPageModule,
  DataGridPageModule,
  CalendarPageModule,
  DatePickerPageModule,
  PanelBoxPageModule,
  ToastPageModule,
  MenuPageModule,
  TreeViewPageModule,
  LovPageModule,
  TabViewModule,
  UploadPageModule,
  ServicesPageModule,
  TestPageModule,
  ValidationPageModule,
  WidgetPageModule,
  DateTimeFunctionPageModule,
  TabPageModule,
  QueryBuilderPageModule,
  InputPageModule,
  AXProppertyEditorModule,
  AXPopoverModule,
  TreeSideMenuPageModule,
  SearchBarPageModule
];
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ...DEMO],
  providers: [
    AXHttpService,
    { provide: APP_INITIALIZER, useFactory: initApp, multi: true, deps: [] },
    {
      provide: AX_ERROR_DISPLAY_INTERCEPTOR,
      useClass: AXDefaultErrorDisplayInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
