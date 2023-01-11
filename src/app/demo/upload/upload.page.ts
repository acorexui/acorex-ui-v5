import { Component } from '@angular/core';
import { AXSelectionList } from '@acorex/core';

@Component({
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss']
})
export class UploadPage {
  constructor() { }
  title = 'acorex-framework';
  items2: [1, 2, 3, 4, 5];
  selectedValues: any[] = ['2', '4'];

  handleSelectChange(e) {
  }
  items: any[] = [
    {
      value: '1',
      text: 'Items 1'
    },
    {
      value: '2',
      text: 'Items 2'
    },
    {
      value: '3',
      text: 'Items 3'
    }
  ];

  handleSelectedValuesChange(e) {
  }
}
