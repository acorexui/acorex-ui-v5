import { AXBasePageComponent, AXMenuItemClickEvent, AXPopupService } from '@acorex/components';
import { AXMenuItem } from '@acorex/core';
import { AXWidgetBoardComponent, AXWidgetConfig, AXWidgetConfigSavedEvent } from '@acorex/layout';
import { Component, ViewChild } from '@angular/core';
import { AXWidgetGalleryComponent, AXWidgetGalleryItem } from './widget-gallery.component';


@Component({
  templateUrl: './widget.page.html'
})
export class WidgetPage extends AXBasePageComponent {
  @ViewChild(AXWidgetBoardComponent, { static: true })
  board: AXWidgetBoardComponent;

  constructor(private popupService: AXPopupService) {
    super();
  }

  ngOnInit() {
    this.widgets = this.galleryItems.map((c) => c.config);
    if (localStorage.getItem('www')) {
      this.board.load(localStorage.getItem('www'));
    }
  }

  menuItems: AXMenuItem[] = [
    { text: 'Edit', name: 'edit', icon: 'far fa-pen', style: 'ax primary' },
    {
      text: 'Add',
      name: 'add',
      icon: 'far fa-plus',
      // items: [
      //   { text: 'Add2', name: 'add2', icon: 'far fa-plus', disable: false },
      //   { text: 'Add23', name: 'add23', icon: 'far fa-plus', disable: false }
      // ]
    },
    { text: 'Clear', name: 'clear', icon: 'far fa-plus', style: 'ax success' },
    { text: 'Save', name: 'save', icon: 'far fa-save', style: 'ax success' },
    { text: 'Refresh', name: 'refresh', icon: 'far fa-undo', style: 'ax success' }
  ];

  onItemClick(e: AXMenuItemClickEvent) {
    debugger
    if (e.name === 'edit') {
      this.board.toggleEdit();
    }
    if (e.name === 'add') {
      this.openGallery();
    }
    if (e.name === 'clear') {
      this.board.clear();
    }
    if (e.name === 'refresh') {
      this.board.refresh();
    }
    if (e.name === 'save') {
      this.board.save().then((c) => {
        localStorage.setItem('www', c);
      });
    }
  }

  openGallery() {
    debugger
    this.popupService
      .open(AXWidgetGalleryComponent, {
        title: 'Add Widgets',
        size: 'md',
        data: { galleryItems: this.galleryItems }
      })
      .then((r) => {
        if (r.data) {
          this.board.addWidget(r.data);
        }
      });
  }

  widgets: AXWidgetConfig[] = [];

  galleryItems: AXWidgetGalleryItem[] = [
    {
      title: 'Gauge Widget',
      description: 'جهت نمایش مقادیر به صورت گیج',
      icon: '#ab47bc',
      group: 'ابزارک',
      config: {
        title: 'Gauge Widget',
        uniqueName: 'gauge-chart',
        component: 'lazyWidgets/gauge-chart',
        sizeX: 2,
        sizeY: 2,
        props: {
          minValue: {
            title: 'کمترین مقدار'
          },
          maxValue: {
            title: 'بیشترین مقدار'
          },
          widgetSize: {
            visible: true,
            editorOptions: {
              minX: 2,
              maxX: 5,
              minY: 2,
              maxY: 5
            }
          }
        }
      }
    }
    // {
    //   uniqueName: 'double-gauge-chart',
    //   component: 'lazyWidgets/double-gauge-chart',
    //   sizeX: 3,
    //   sizeY: 3,
    //   title: 'Double Gauge Chart',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png'
    // },
    // {
    //   uniqueName: 'linear-chart',
    //   component: 'lazyWidgets/linear-chart',
    //   sizeX: 4,
    //   sizeY: 3,
    //   title: 'LinearChart Widget',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png'
    // },
    // {
    //   uniqueName: 'pie-chart',
    //   component: 'lazyWidgets/pie-chart',
    //   sizeX: 2,
    //   sizeY: 2,
    //   title: 'PieCahrt Widget',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png'
    // },
    // {
    //   uniqueName: 'bar-chart',
    //   component: 'lazyWidgets/bar-chart',
    //   sizeX: 3,
    //   sizeY: 2,
    //   title: 'BarCahrt Widget',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png'
    // },
    // {
    //   uniqueName: 'table',
    //   component: 'lazyWidgets/table',
    //   sizeX: 3,
    //   sizeY: 2,
    //   title: 'Table',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png',
    //   props: {
    //     title: {
    //       title: 'عنوان'
    //     },
    //     widgetSize: {
    //       visible: true
    //     }
    //   }
    // },
    // {
    //   uniqueName: 'note',
    //   component: 'lazyWidgets/note',
    //   sizeX: 2,
    //   sizeY: 2,
    //   title: 'NoteWidget',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png',
    //   props: {
    //     backColor: {
    //       title: 'رنگ پس زمینه'
    //     },
    //     widgetSize: {
    //       visible: true
    //     },
    //     text: {
    //       runtime: true,
    //       visible: true
    //     }
    //   }
    // },
    // {
    //   uniqueName: 'analog-clock',
    //   component: 'lazyWidgets/analog-clock',
    //   sizeX: 2,
    //   sizeY: 2,
    //   title: 'AnalogClockWidget',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png',
    //   props: {
    //     timeZone: {
    //       runtime: true,
    //       title: 'منطقه زمانی'
    //     },
    //     locales: {
    //       title: 'زبان و تاریخ'
    //     }
    //   }
    // },
    // {
    //   uniqueName: 'digital-clock',
    //   component: 'lazyWidgets/digital-clock',
    //   sizeX: 2,
    //   sizeY: 1,
    //   title: 'DigitalClock',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png',
    //   props: {
    //     cityTitle: {
    //       title: 'نام شهر'
    //     },
    //     timeZone: {
    //       runtime: true,
    //       title: 'منطقه زمانی'
    //     },
    //     locales: {
    //       title: 'زبان و تاریخ'
    //     }
    //   }
    // },
    // {
    //   uniqueName: 'query-scaler',
    //   component: 'lazyWidgets/query-scaler',
    //   sizeX: 2,
    //   sizeY: 2,
    //   title: 'شمارنده',
    //   group: 'ابزارک',
    //   description:
    //     'The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres',
    //   imgSrc: 'http://tfsserver:8080/tfs/_static/Widgets/CatalogIcons/queryScalar.png',
    //   props: {
    //     widgetSize: {
    //       visible: true
    //     },
    //   }
    // }
  ];

  provideValue = (e) => {
    // return Promise<any>((resolve,reject)=>{

    // });
    if (Array.isArray(e.value) && e.value[0].id === 'EHR:Diabetes.^T2DM.^Physical_Examination.BMI.result') {
      return 11;
    }
    if (Array.isArray(e.value) && e.value[0].id === 'EHR:Diabetes.^T2DM.^Physical_Examination.BMI.height') {
      return 50;
    }
    return Promise.resolve(16.5);
  };

  handleOnConfigChanged(e) {
    this.board.save().then((c) => {
      localStorage.setItem('www', c);
    });
  }

  handleOnWidgetSave(e: AXWidgetConfigSavedEvent) {
    this.galleryItems.push({
      title: e.data.title,
      description: e.data.description,
      config: {
        component: e.data.component,
        title: e.data.title,
        uniqueName: e.data.uniqueName,
        options: e.data.options,
        props: e.data.props,
        sizeX: e.data.options.widgetSize[0],
        sizeY: e.data.options.widgetSize[1]
      },
      group: 'Components'
    });
    this.widgets = this.galleryItems.map((c) => c.config);
  }
}
