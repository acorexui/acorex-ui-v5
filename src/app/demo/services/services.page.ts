import { Component } from '@angular/core';
import { AXSelectionList, AXHttpService } from '@acorex/core';
import { ServicesService } from './services.service';

@Component({
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss']
})
export class ServicesPage {
  constructor(private service: ServicesService) {
    this.getData();
  }

  
  getData() {
    this.service.getMockData().result((c) => {
    });
  }
}
