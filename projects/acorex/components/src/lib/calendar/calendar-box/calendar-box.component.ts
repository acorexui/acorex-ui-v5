import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, ElementRef } from '@angular/core';
import { AXDateTime, AXDateTimeRange, AXCalendarType, AXTranslator } from '@acorex/core';
import { AXBaseSizableComponent, AXElementSize } from '../../base/element.class';
import { AXValueEvent } from '../../base/events.class';
import { AXConfig } from '@acorex/core';

export type AXCalendarViewType = 'year' | 'month' | 'day';

export type AXCalendarHolidays = AXCalendarHoliday[];
export type AXCalendarHolidaysFunc = (start: Date, end: Date, type: AXCalendarType) => AXCalendarHoliday[];
export interface AXCalendarHoliday {
  date: Date;
  title: string;
  description?: string;
}

export type AXCalendarWeekends = AXCalendarWeekend[];
export type AXCalendarWeekendsFunc = (start: Date, end: Date, type: AXCalendarType) => AXCalendarWeekend[];

export interface AXCalendarWeekend {
  indexDay: number;
}

@Component({
  selector: 'ax-calendar-box',
  templateUrl: './calendar-box.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXCalendarBoxComponent implements AXBaseSizableComponent {
  weekdays: string[] = [];

  private d = {
    jalali: {
      locale: AXConfig.get('dateTime.jalali.locale') || 'fa',
      dir: 'rtl',
      number: 1
    },
    gregorian: {
      locale: AXConfig.get('dateTime.gregorian.locale') || 'en',
      dir: 'ltr',
      number: 0
    }
  };

  numRotate: number;

  @Input()
  size: AXElementSize = 'md';

  @Input()
  type: AXCalendarType;

  @Input()
  locale: string;

  @Input()
  dir: string;

  @Input()
  min: Date;

  @Input()
  max: Date;

  @Input()
  selectableHoliday: boolean = true;

  @Input()
  dayStyle = [];

  @Input()
  dayMinMaxResoan = '';

  private getHoliday: AXCalendarHolidays | AXCalendarHolidaysFunc;

  private getWeekend: AXCalendarWeekends | AXCalendarWeekendsFunc;

  @Input('showTodayButton')
  public showTodayButton: boolean = false;

  matrix: any[] = [];
  rotated: boolean = false;
  private _view: AXCalendarViewType = 'day';
  @Input()
  public get view(): AXCalendarViewType {
    return this._view;
  }
  public set view(v: AXCalendarViewType) {
    this._view = v;
    this.navigate(0);
  }

  private _depth: AXCalendarViewType = 'day';

  @Input()
  public get depth(): AXCalendarViewType {
    return this._depth;
  }
  public set depth(v: AXCalendarViewType) {
    this._depth = v;
    this.view = v;
  }

  viewRange: AXDateTimeRange;
  private holidays: AXCalendarHoliday[] = [];
  private weekends: AXCalendarWeekend[] = [];

  @Output()
  onValueChanged: EventEmitter<AXValueEvent<Date>> = new EventEmitter<AXValueEvent<Date>>();

  @Output()
  onClick: EventEmitter<AXValueEvent<Date>> = new EventEmitter<AXValueEvent<Date>>();

  @Output()
  valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  private _value: AXDateTime;
  @Input()
  public get value(): Date {
    return this._value?.date;
  }
  public set value(v: Date) {
    let vv: AXDateTime;
    if (v) {
      vv = AXDateTime.convert(v);
    }
    let unValidDate = false;
    if (this.max || this.min) {
      unValidDate = this.isInMInMaxRange(vv);
    }
    if (!unValidDate) {
      if (vv && !vv.equal(this._value)) {
        this._value = vv;
        this._value.type = this.type;
        this.setFocus(this._value.clone());
        this.valueChange.emit(vv.date);
        this.onValueChanged.emit({
          component: this,
          value: this._value?.date,
          htmlElement: this.ref.nativeElement
        });
      }
      if (v == undefined) {
        this._value = null;
        this.focusedValue = this.today;
        this.viewRange = this.today.month.range;
        this.navigate(0);
      }
      this.onClick.emit({
        component: this,
        value: this._value?.date,
        htmlElement: this.ref.nativeElement
      });
    }
  }

  focusedValue: AXDateTime;
  get today(): AXDateTime {
    return new AXDateTime(new Date(), this.type);
  }

  constructor(private cdr: ChangeDetectorRef, private ref: ElementRef) {
    // set defaults
    this.getHoliday = AXConfig.get('dateTime.holidays');
    this.getWeekend = AXConfig.get('dateTime.weekends');
  }
  findDay(date: AXDateTime) {
    if (this.dayStyle.find((c) => c.date.split('T')[0] == date.toISOString().split('T')[0])) {
      return true;
    } else {
      return false;
    }
  }
  getStyle(date: AXDateTime) {
    if (this.dayStyle.find((c) => c.date.split('T')[0] == date.toISOString().split('T')[0])) {
      return this.dayStyle.find((c) => c.date.split('T')[0] == date.toISOString().split('T')[0]).style;
    } else {
      return '';
    }
  }

  getTitle(date: AXDateTime) {
    if (this.dayStyle.find((c) => c.date.split('T')[0] == date.toISOString().split('T')[0])) {
      return this.dayStyle.find((c) => c.date.split('T')[0] == date.toISOString().split('T')[0]).text;
    } else {
      if (
        (this.min && this.max && date.compaireNew(new AXDateTime(this.min, this.type), 'YMD', this.type) === -1) ||
        date.compaireNew(new AXDateTime(this.max, this.type), 'YMD', this.type) === 1
      ) {
        return this.dayMinMaxResoan;
      } else {
        return '';
      }
    }
  }

  ngOnInit() {
    this.focusedValue = new AXDateTime(new Date(), this.type);
    //
    this.initLayout();
    //
    this.viewRange = this.today.month.range;
    if (this.value) {
      this.setFocus(new AXDateTime(this.value, this.type));
    } else {
      this.setFocus(this.today);
    }

    this.view = 'day';
  }

  getViewCompaire(view: AXCalendarViewType) {
    switch (view) {
      case 'day':
        return 'YMD';
      case 'month':
        return 'YM';
      case 'year':
        return 'Y';
    }
  }

  ngAfterViewInit(): void {
    this.navigate(0);
  }

  private initLayout() {
    if (!this.type) {
      this.type = AXConfig.get('dateTime.type') || 'gregorian';
    }
    if (!this.locale) {
      this.locale = this.d[this.type]?.locale || this.locale;
    }
    if (!this.dir) {
      this.dir = this.d[this.type]?.dir || 'ltr';
    }
    this.numRotate = this.d[this.type]?.number || 0;
    const path = 'dateTime.weekdaysShort';
    this.weekdays = [
      AXTranslator.get(`${path}.sun`, this.locale),
      AXTranslator.get(`${path}.mon`, this.locale),
      AXTranslator.get(`${path}.tue`, this.locale),
      AXTranslator.get(`${path}.wed`, this.locale),
      AXTranslator.get(`${path}.thu`, this.locale),
      AXTranslator.get(`${path}.fri`, this.locale),
      AXTranslator.get(`${path}.sat`, this.locale)
    ];
  }

  getTodayName() {
    return AXTranslator.get('dateTime.today', this.locale);
  }

  prev() {
    this.navigate(-1);
  }

  next() {
    this.navigate(1);
  }

  rotate(array, n) {
    const len = array.length;
    return !(n % len) ? array : n > 0 ? array.map((e, i, a) => a[(i + n) % len]) : array.map((e, i, a) => a[(len - ((len - i - n) % len)) % len]);
  }

  navigate(value: number | AXDateTime) {
    let start: AXDateTime;
    let end: AXDateTime;
    if (this.view === 'day') {
      let fd: AXDateTime;
      if (value instanceof AXDateTime) {
        fd = value.startOf('month');
      } else {
        fd = this.viewRange.startTime.add('day', 15).add('month', value).startOf('month');
      }

      start = fd.firstDayOfWeek;
      end = fd.endOf('month').endDayOfWeek;

      start = start.add('day', -this.numRotate);
      end = end.add('day', 7).add('day', -this.numRotate);

      // TODO: apply start of week
      if (!this.rotated && this.weekdays.length > 0) {
        if (this.type === 'jalali') {
          this.weekdays = this.rotate(this.weekdays, -this.numRotate);
        } else {
          this.weekdays = this.rotate(this.weekdays, this.numRotate);
        }

        this.rotated = true;
      }
    } else if (this.view === 'month') {
      let fd: AXDateTime;
      if (value instanceof AXDateTime) {
        fd = value.startOf('year');
      } else {
        fd = this.viewRange.startTime.add('day', 15).add('year', value).startOf('year');
      }
      start = fd;
      end = fd.endOf('year');
    } else if (this.view === 'year') {
      let fd: AXDateTime;
      if (value instanceof AXDateTime) {
        fd = value.startOf('year');
      } else {
        fd = this.viewRange.startTime
          .add('day', 15)
          .add('year', value * 10)
          .startOf('year');
      }
      start = fd.add('year', -4);
      end = start.add('year', 8).endOf('year');
    }
    this.viewRange = new AXDateTimeRange(start, end);
    //
    if (this.getHoliday && typeof this.getHoliday === 'function') {
      this.holidays = this.getHoliday(start.date, end.date, this.type);
    }

    if (this.getWeekend && typeof this.getWeekend === 'function') {
      this.weekends = this.getWeekend(start.date, end.date, this.type);
    }

    //
    if (this.view === 'day') {
      this.matrix = this.matrixify(this.applyStyle(this.viewRange.enumurate('day', this.type)), 7);
      if (this.matrix.length > 0 && this.matrix[0].find((c) => c.nextMonth === false) === undefined) {
        this.matrix.splice(0, 1);
      }
      if (this.matrix[this.matrix.length - 1].find((c) => c.nextMonth === false) === undefined) {
        this.matrix.splice(this.matrix.length - 1, 1);
      }
    } else if (this.view === 'month') {
      this.matrix = this.matrixify(this.applyStyle(this.viewRange.enumurate('month', this.type)), 3);
    } else if (this.view === 'year') {
      this.matrix = this.matrixify(this.applyStyle(this.viewRange.enumurate('year', this.type)), 3);
    }
    this.cdr.detectChanges();
  }

  private applyStyle(dates: AXDateTime[]): any[] {
    const items: any[] = [];
    dates.forEach((d, i, j) => {
      const item: any = {};
      item.date = d;

      item.selected = d.compaireNew(new AXDateTime(this.value, this.type), this.getViewCompaire(this.view), this.type) === 0;
      item.focused = d.compaireNew(this.focusedValue, this.getViewCompaire(this.view), this.type) === 0;
      item.today = this.today && d.compaireNew(this.today, this.getViewCompaire(this.view), this.type) === 0;
      if (this.view === 'day') {
        //  item.nextMonth = d.compaireNew(this.viewRange.startTime.add('day', 10), 'YM') !== 0;
        item.nextMonth = d.compaireNew(this.viewRange.startTime.add('day', 10), 'YM', this.type) !== 0;

        item.unselect = this.isInMInMaxRange(d);
        this.holidays.forEach((h) => {
          const comp = d.compaireNew(new AXDateTime(h.date, this.type), 'YMD', this.type);
          if (comp === 0) {
            item.holiday = true;
            if (this.selectableHoliday === false) {
              item.unselect = true;
            }
          }
        });

        const indexDay = i - Math.floor(i / 7) * 7;
        this.weekends.forEach((cc) => {
          if (Number(cc) === indexDay) {
            item.holiday = true;
            if (this.selectableHoliday === false) {
              item.unselect = true;
            }
          }
        });
      }
      items.push(item);
    });
    return items;
  }

  changeView() {
    if (this.view === 'day') {
      this.view = 'month';
    } else if (this.view === 'month') {
      this.view = 'year';
    }
  }

  matrixify(arr: any[], cols) {
    const rows = Math.ceil(arr.length / cols);
    const matrix = [];
    if (rows * cols === arr.length) {
      for (let i = 0; i < arr.length; i += cols) {
        matrix.push(arr.slice(i, cols + i));
      }
    }
    return matrix;
  }

  setDayClick(event: MouseEvent, item) {
    if (item.unselect !== true) {
      this.value = item.date.date;
    }

    event.stopPropagation();
  }

  isInMInMaxRange(d) {
    let r = false;
    if (d !== undefined) {
      if (this.min && !this.max) {
        r = d.compaireNew(new AXDateTime(this.min, this.type), this.getViewCompaire(this.view), this.type) === -1;
      }
      if (this.max && !this.min) {
        r = d.compaireNew(new AXDateTime(this.max, this.type), this.getViewCompaire(this.view), this.type) === 1;
      }
      if (this.min && this.max) {
        r =
          d.compaireNew(new AXDateTime(this.min, this.type), this.getViewCompaire(this.view), this.type) === -1 ||
          d.compaireNew(new AXDateTime(this.max, this.type), this.getViewCompaire(this.view), this.type) === 1;
      }
    }
    return r;
  }

  setMonthClick(event: MouseEvent, date: AXDateTime) {
    if (this.depth === 'month') {
      this.value = date.date;
    } else {
      this.view = 'day';
      this.setFocus(new AXDateTime(this.value, this.type).set('year', date.year).set('month', date.monthOfYear));
    }
    event.stopPropagation();
  }

  setYearClick(event: MouseEvent, date: AXDateTime) {
    if (this.depth === 'year') {
      this.value = date.date;
    } else {
      this.view = 'month';
      this.setFocus(new AXDateTime(this.value, this.type).set('year', date.year));
    }
    event.stopPropagation();
  }

  setFocus(date: AXDateTime) {
    this.focusedValue = date;
    this.navigate(this.focusedValue);
  }

  setToday() {
    this.value = this.today.date;
    this.view = 'day';
  }

  trackByFn(index, item: any) {
    return item.date.date.getTime();
  }
}
