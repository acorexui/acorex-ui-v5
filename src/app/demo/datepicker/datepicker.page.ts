import { Component, ViewChild } from '@angular/core';
import { AXSelectionList, AXDateTime } from '@acorex/core';
import { AXDatePickerComponent } from '@acorex/components';

@Component({
  templateUrl: './datepicker.page.html',
  styleUrls: ['./datepicker.page.scss']
})
export class DatePickerPage {
  @ViewChild('date', { static: true })
  gridTree: AXDatePickerComponent;
  constructor() {}
  title = 'acorex-framework';
  date: string = '';
  selectedValues: any[] = ['2', '4'];
  value = '2020-04-15T00:00:00';
  value2 = new AXDateTime().add('day', 10).toISOString();
  value1 = null;
  value6;
  min = new AXDateTime().add('day', -99999).toISOString();
  max = new AXDateTime().add('day', 100000).toISOString();
  dayMinMaxResoan: string = 'تعطیلات کاری';
  handleSelectChange(e) {}
  pushSellected() {
    // this.value2 =null;
  }
  dayStyle = [
    {
      date: '2021-06-30',
      style: { background: '#FFFF00', 'border-radius': '8px' },
      text: 'testText'
    }
  ];

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

  min1 = '2021-06-20T00:00:00';
  max2 = '2021-06-25T00:00:00';

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gridTree.focus();
    }, 0);
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  handleSelectedValuesChange(e) {}
  handleValueChange(e: AXDateTime) {
    this.date = e.date.toString();
  }
  onValueChanged(e) {
    // this.value6 = new AXDateTime(e.value, 'jalali').addDay(1).toISOString();
  }
}
