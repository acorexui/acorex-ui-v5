import { Component } from '@angular/core';
import { AXSelectionList } from '@acorex/core';

@Component({
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss']
})
export class ButtonPage {
  loading: boolean;
  constructor() { }
  title = 'acorex-framework';
  value: boolean = false;
  items2: [1, 2, 3, 4, 5];
  selectedValues: any[] = [{
    id: '0',
    value: false,
    text: 'Normal Mode',
    disable: true
  }];
  selectType: any[] = [
    {
      id: 0,
      text: '22حقیقی',
      value: false,
      disable: false
    },
    {
      id: 1,
      text: 'حقوقی',
      value: true,
      disable: false
    }
  ];
  handleSelectChange(e) { }
  onSelectedType(e) {
    this;
  }
  items: AXSelectionList[] = [
    {
      id: '0',
      value: false,
      text: 'Normal Mode',
      disable: true
    },
    {
      id: '1',
      value: false,
      text: 'Normal Mode',
      disable: true
    },
    {
      id: '2',
      value: false,
      text: 'Disable Mode',
      disable: false
    },
    {
      id: '03',
      value: false,
      text: 'ReadOnly Mode',
      disable: false
    }
  ];

  handleSelectedValuesChange(e) { }
  handleLoginClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  onClick(e) {

  }
  handleSelectedChange(e) {
    debugger
  }
  handleValueChangeEvent(e) {
  }
  valueChange(e) {
  }
}
