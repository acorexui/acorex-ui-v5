import { Component, OnInit } from '@angular/core';
import { AXDataSourceReadParams } from '@acorex/components';

@Component({
  templateUrl: './select.page.html'
})
export class SelectPage implements OnInit {
  selectedValues: any[] = ['2', '4'];

  dataSource: any[] = [
    { id: '1', title: 'Same Title 1', number: 1000 },
    { id: '2', title: 'Same Title 2', number: 2000 },
    { id: '3', title: 'Same Title 3', number: 3000 },
    { id: '4', title: 'Same Title 4', number: 4000 }
  ];

  constructor() { }

  ngOnInit() {
  }
  handleDataReceived = (e: AXDataSourceReadParams) => {
    return Promise.resolve(this.dataSource);
  }
  handleSelectedValuesChange(e) {

  }
  handleSelectChange(e) {
  }
}
