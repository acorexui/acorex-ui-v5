import { Component } from '@angular/core';
import { AXSelectionList, AXDateTime } from '@acorex/core';
import { AXBasePageComponent, AXValueEvent } from '@acorex/components';

@Component({
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage  extends AXBasePageComponent {
  constructor() {
    super();
  }

  title = 'acorex-framework';
  date: string = '';
  selectedValues: any[] = ['2', '4'];

  handleSelectChange(e) {}
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

  dayStyle = [{ date: '2021-03-30', style: { background: '#FF0000', 'border-radius': '8px' }, text: 'testText' }];

  handleSelectedValuesChange(e) {}
  handleValueChange(e: AXValueEvent<AXDateTime>) {
    // this.date = e.value.date?.toString();
  }


  onActivated()
  {
    console.log('calendar Acticated');
  }
}
