
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AXGridDataColumn } from './column.component';
import { AXDateTime, AXConfig, AXCalendarType } from '@acorex/core';
import { AXDatePickerComponent } from '@acorex/components';
@Component({
  selector: 'ax-date-column',
  template: '',
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridDateColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridDateColumn extends AXGridDataColumn {
  constructor() {
    super();
  }

  @Input()
  format: string;

  @Input()
  type: AXCalendarType = AXConfig.get('dateTime.type');

  render() {
    const col = super.render();
    col.cellRendererParams = {
      format: this.format,
    };

    col.comparator = (valueA: any, valueB: any) => {
      const date1 = AXDateTime.convert(valueA);
      const date2 = AXDateTime.convert(valueB);
      //
      if (date1 === null && date2 === null) {
        return 0;
      }
      if (date1 === null) {
        return -1;
      }
      if (date2 === null) {
        return 1;
      }
      return (date1.date.getTime() - date2.date.getTime());
    };

    col.valueFormatter = (params) => {
      const date: AXDateTime = AXDateTime.convert(params.value, this.type);
      if (date) {
        return date.format(this.format);
      }
      else {
        return null;
      }
    };
    col.filter = 'agDateColumnFilter';
    // col.floatingFilter = true;
    return col;
  }
}

@Component({
  selector: 'ax-data-picker-filter',
  template: `<ax-date-picker [selectableHoliday]="selectableHoliday" [allowClear]="true" (onValueChanged)="onValueChanged($event)" size="sm">
     </ax-date-picker>`,
  host: {  },
  encapsulation: ViewEncapsulation.None
})
export class AXDatePickerFilterComponent {
  @ViewChild(AXDatePickerComponent)
  datePicker: AXDatePickerComponent;
  @ViewChild('div', { read: ElementRef }) div: ElementRef;
  selectableHoliday: boolean = false;
  type: string = 'jalali';
  date: Date;
  params: any;
  picker: any;


  agInit(params: any): void {
    this.params = params;
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {
  }

  onDateChanged(selectedDates) {
    //this.date = selectedDates[0] || null;
    this.params.onDateChanged();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date || null;
    //this.picker.setDate(date);
  }

  setInputPlaceholder(placeholder: string): void {
    //this.div.nativeElement.setAttribute('placeholder', placeholder);
  }
  onValueChanged(e) {

    this.setDate(e.value);
    this.onDateChanged(e.value);
  }

}
