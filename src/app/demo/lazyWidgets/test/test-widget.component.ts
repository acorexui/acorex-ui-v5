import { AXWidgetComponent } from '@acorex/layout';
import { AXBaseComponent, AXBasePageComponent, propertyEditor } from '@acorex/components';
import { Component, OnInit } from '@angular/core';

export class AXTableColumnHeader {
  fieldName: string;
  caption: string;
  rowHeader?: boolean;
}
export class AXTable {
  columns: AXTableColumnHeader[];
}

@Component({
  // template: 'Hi {{text}}'
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.scss'],
  host: { style: ' height:90%;' }
})
export class TestWidgetComponent extends AXBasePageComponent implements OnInit {

  // config: AXTable = {
  //   columns: [
  //     {
  //       fieldName: 'year',
  //       caption: 'سال',
  //       rowHeader: true
  //     },
  //     {
  //       fieldName: 'weight',
  //       caption: 'وزن'
  //     },
  //     {
  //       fieldName: 'height',
  //       caption: 'قد'
  //     }
  //   ]
  // };

  @propertyEditor({
    editorClass: 'ax/editors/text',
    title: 'عنوان',
    order: 1,
  })
  title: string;

  @propertyEditor({
    editorClass: 'ax/editors/column',
    title: 'ستون ها',
    order: 2,
  })
  column: AXTableColumnHeader[];

  rows = [
    {
      year: '1380',
      weight: '65',
      height: '180'
    },
    {
      year: '1396',
      weight: '70',
      height: '190'
    },
    {
      year: '1388',
      weight: '67',
      height: '185'
    },
    {
      year: '1399',
      weight: '80',
      height: '190'
    },
    {
      year: '1380',
      weight: '65',
      height: '180'
    },
    {
      year: '1396',
      weight: '70',
      height: '190'
    },
    {
      year: '1388',
      weight: '67',
      height: '185'
    },
    {
      year: '1399',
      weight: '80',
      height: '190'
    },
    {
      year: '1380',
      weight: '65',
      height: '180'
    },
    {
      year: '1396',
      weight: '70',
      height: '190'
    },
    {
      year: '1388',
      weight: '67',
      height: '185'
    },
    {
      year: '1399',
      weight: '80',
      height: '190'
    }
  ];

  constructor() {
    super();
  }

  text: string = 'Widget';

  get isConfigured(): boolean {
    return this.column && (this.column && this.column.length > 0);
  }

  ngAfterViewInit(): void {
    // this.isBusy = false;
    // if (this.isConfigured) {
    //   setTimeout(() => {
    //     this.isBusy = false;
    //   }, 500);
    // }
  }

  ngOnInit() {}
}
