import { Component } from '@angular/core';
import { AXSelectionList } from '@acorex/core';
import { AXTabStripItem } from '@acorex/components';

@Component({
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss']
})
export class TabViewPage {
  constructor() {}
  title = 'acorex-framework';
  items2: [1, 2, 3, 4, 5];
  selectedValues: any[] = ['2', '4'];

  handleSelectChange(e) {}
  // items: any[] = [
  //   {
  //     value: '1',
  //     text: 'Items 1'
  //   },
  //   {
  //     value: '2',
  //     text: 'Items 2'
  //   },
  //   {
  //     value: '3',
  //     text: 'Items 3'
  //   }
  // ];
  items: AXTabStripItem[] = [
    {
      id: '1',
      text: 'Items 1',
      active: true
    },
    {
      id: '2',
      text: 'Items 2',
      active: false,
      disable: true
    },
    {
      id: '3',
      text: 'Items 3',
      active: false,
      visible: true
    }
  ];
  handleSelectedValuesChange(e) {}
  onActiveTab(e) {}
}
