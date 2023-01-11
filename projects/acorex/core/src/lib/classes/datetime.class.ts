import moment from 'jalali-moment';
import { AXConfig } from '../services/config';
// const moment = moment_;

export type TimeUnit = 'second' | 'minute' | 'minutes' | 'hour' | 'hours' | 'day' | 'days' | 'month' | 'year' | 'week';

export type TimeDuration = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'month' | 'years';

export type TimeStep = 'Y' | 'M' | 'D' | 'YM' | 'YMD' | 'YMDh' | 'YMDhm' | 'YMDhms' | 'h' | 'm' | 's';

export type AXCalendarType = 'jalali' | 'gregorian';

export class AXDateTime {
  static convert(value: any, type: AXCalendarType = AXConfig.get('dateTime.type') || 'gregorian'): AXDateTime {
    let date: AXDateTime;
    if (typeof value === 'string' || value instanceof String) {
      date = new AXDateTime(value as string, type);
    } else if (value instanceof Date) {
      date = new AXDateTime(value as Date, type);
    } else if (value instanceof AXDateTime) {
      date = value;
    }
    return date;
  }

  private _date: Date;
  get date(): Date {
    return this._date;
  }

  private resolveUnit(unit: TimeUnit): any {
    return this.type === 'jalali' ? 'j' + unit : unit;
  }

  private _moment: moment.Moment;

  // private get _moment(): moment_.Moment {
  //     const m = moment(this.date);
  //     if (this.type === 'jalali') {
  //         m.locale('fa');
  //     }
  //     return m;
  // }

  constructor(value: Date | string = new Date(), public type: AXCalendarType = AXConfig.get('dateTime.type') || 'gregorian') {
    if (value instanceof Date) {
      this._date = value as Date;
    } else {
      this._date = new Date(value);
    }
    this._moment = moment(this.date);
    if (this.type === 'jalali') {
      this._moment.locale('fa');
    }
  }

  clone(): AXDateTime {
    return new AXDateTime(this.date, this.type);
  }

  get dayInMonth(): number {
    return this._moment.date();
  }

  get dayOfYear(): number {
    return this._moment.dayOfYear();
  }

  get dayInWeek(): number {
    return this._moment.day();
  }

  get hour(): number {
    return this._moment.hour();
  }

  get minute(): number {
    return this._moment.minute();
  }

  get second(): number {
    return this._moment.second();
  }

  get year(): number {
    return this._moment.year();
  }

  get monthOfYear(): number {
    return this._moment.month();
  }

  get month(): AXCalendarMonth {
    return new AXCalendarMonth(this);
  }

  get firstDayOfWeek(): AXDateTime {
    const a = moment(this.date);
    if (this.type === 'jalali') {
      this._moment.locale('fa');
    }
    return new AXDateTime(a.startOf('w').toDate(), this.type);
  }

  get endDayOfWeek(): AXDateTime {
    const a = moment(this.date);
    if (this.type === 'jalali') {
      this._moment.locale('fa');
    }
    return new AXDateTime(moment(this.date).endOf('w').toDate(), this.type);
  }

  convertStringToJalali(date: string, format: string) {
    return moment(date).locale('fa').format('YYYY/M/D');
  }
  convertStringToGregorian(date: string, format: string) {
    return new Date(moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'));
  }

  add(unit: TimeUnit = 'day', amount: number): AXDateTime {
    return new AXDateTime(moment(this.date).add(amount, this.resolveUnit(unit)).toDate(), this.type);
  }

  addDay(amount: number): AXDateTime {
    return new AXDateTime(moment(this.date).add(amount, 'd').toDate(), this.type);
  }

  addMonth(amount: number): AXDateTime {
    return new AXDateTime(moment(this.date).add(amount, 'months').toDate(), this.type);
  }
  addHour(amount: number) {
    return new AXDateTime(moment(this.date).add(amount, 'hours').toDate(), this.type);
  }

  set(unit: TimeUnit = 'day', value: number): AXDateTime {
    return new AXDateTime(this._moment.set(unit, value).toDate(), this.type);
  }

  duration(end: AXDateTime, unit: TimeDuration = 'days'): number {
    const duration = moment.duration(this._moment.diff(end._moment));
    return Math.round(duration.as(unit));
  }

  startOf(unit: TimeUnit = 'day'): AXDateTime {
    return new AXDateTime(moment(this.date).startOf(this.resolveUnit(unit)).toDate(), this.type);
  }

  endOf(unit: TimeUnit = 'day'): AXDateTime {
    return new AXDateTime(moment(this.date).endOf(this.resolveUnit(unit)).toDate(), this.type);
  }

  format(format: string = AXConfig.get('dateTime.shortDateFormat') || (this.type === 'gregorian' ? 'DD-MM-YYYY' : 'YYYY-MM-DD')): string {
    if (format === 'P') {
      return this._moment.fromNow();
    }
    return this._moment.format(format);
  }

  toString(): string {
    return this.format();
  }

  equal(value: AXDateTime, unit: TimeUnit = 'day') {
    if (!value) {
      return false;
    }
    return this._moment.isSame(moment(value.date), this.resolveUnit(unit));
  }

  convertToJalaliDate(value) {
    const options: any = {
      numberingSystem: 'latn',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const jDate = new Date(value).toLocaleDateString('fa-IR', options);
    const item: any = {};
    item.year = jDate.slice(0, 4);
    item.month = jDate.slice(5, 7);
    item.day = jDate.slice(8, 10);
    item.hour = jDate.slice(13, 15);
    item.minutes = jDate.slice(16, 18);
    item.seconds = jDate.slice(19, 21);
    return item;
  }

  toJalaliString(value) {
    const date = this.convertToJalaliDate(value);
    let str = '';
    str = date.year + '-' + date.month + '-' + date.day + 'T' + date.hour + ':' + date.minutes + ':' + date.seconds;
    return str;
  }

  convertToGregorianDate(value) {
    // TODO: check this fucking type
    const options: any = {
      numberingSystem: 'latn',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const date = new Date(value).toLocaleString('en-us', options);
    const item: any = {};
    item.year = date.slice(6, 10);
    item.month = date.slice(0, 2);
    item.day = date.slice(3, 5);
    item.hour = date.slice(12, 14);
    item.minutes = date.slice(15, 17);
    item.seconds = date.slice(18, 20);
    return item;
  }

  toGregorianString(value) {
    const date = this.convertToGregorianDate(value);
    let str = '';
    str = date.year + '-' + date.month + '-' + date.day + 'T' + date.hour + ':' + date.minutes + ':' + date.seconds;
    return str;
  }

  compaireNew(value: AXDateTime, unit: TimeStep = 'YMD', type = 'jalali') {
    const range = [0, 0];
    let str1;
    let str2;
    if (type === 'jalali') {
      str1 = this.toJalaliString(this.date);
      str2 = this.toJalaliString(value.date ? value.date : value);
    } else {
      str1 = this.toGregorianString(this.date);
      str2 = this.toGregorianString(value.date ? value.date : value);
    }
    switch (unit) {
      case 'YMDhms':
        range[0] = 0;
        range[1] = 19;
        break;
      case 'YMDhm':
        range[0] = 0;
        range[1] = 16;
        break;
      case 'YMDh':
        range[0] = 0;
        range[1] = 13;
        break;
      case 'YMD':
        range[0] = 0;
        range[1] = 10;
        break;

      case 'YM':
        range[0] = 0;
        range[1] = 7;
        break;

      case 'h':
        range[0] = 11;
        range[1] = 13;
        break;

      case 'm':
        range[0] = 14;
        range[1] = 16;
        break;

      case 's':
        range[0] = 17;
        range[1] = 19;
        break;
      case 'D':
        range[0] = 8;
        range[1] = 10;
        break;

      case 'M':
        range[0] = 5;
        range[1] = 7;
        break;

      case 'Y':
        range[0] = 0;
        range[1] = 4;
        break;
    }

    if (str1.slice(range[0], range[1]) === str2.slice(range[0], range[1])) {
      return 0;
    } else if (str1.slice(range[0], range[1]) > str2.slice(range[0], range[1])) {
      return 1;
    } else {
      return -1;
    }
  }

  compaire(value: AXDateTime, unit: TimeUnit = 'day') {
    if (this._moment.isSame(moment(value.date), this.resolveUnit(unit))) {
      return 0;
    } else if (this._moment.isAfter(moment(value.date), this.resolveUnit(unit))) {
      return 1;
    } else {
      return -1;
    }
  }

  toISOString() {
    return this._date.toISOString();
  }
}

export class AXCalendarMonth {
  private _moment: moment.Moment;

  private _range: AXDateTimeRange;
  public get range(): AXDateTimeRange {
    return this._range;
  }
  public set range(v: AXDateTimeRange) {
    this._range = v;
  }

  constructor(date: AXDateTime) {
    this._moment = moment(date.date);
    this.index = date.date.getMonth();
    this.name = this._moment.format('MMMM');
    this.range = new AXDateTimeRange(
      new AXDateTime(this._moment.startOf('month').toDate(), date.type),
      new AXDateTime(this._moment.endOf('month').toDate(), date.type)
    );
  }

  private readonly index: number;
  private readonly name: string;
}

export class AXDateTimeRange {
  constructor(public startTime: AXDateTime, public endTime: AXDateTime) { }

  duration(unit: TimeDuration = 'days'): number {
    const duration = moment.duration(moment(this.startTime.date).diff(moment(this.endTime.date)));
    return duration.as(unit);
  }

  enumurate(unit: TimeUnit = 'day', type: AXCalendarType = AXConfig.get('dateTime.type') || 'jalali'): AXDateTime[] {
    const result: AXDateTime[] = [];
    for (let index = 0; this.startTime.add(unit, index).compaireNew(this.endTime, this.getViewCompaire(unit), type) <= 0; index++) {
      result.push(this.startTime.add(unit, index));
    }
    return result;
  }

  includes(value: AXDateTime, unit: TimeUnit = 'day', type = 'jalali'): boolean {
    return (
      value.compaireNew(this.startTime, this.getViewCompaire(unit), type) >= 0 &&
      value.compaireNew(this.endTime, this.getViewCompaire(unit), type) <= 0
    );
  }

  getViewCompaire(view) {
    switch (view) {
      case 'day':
        return 'YMD';
      case 'month':
        return 'YM';
      case 'year':
        return 'Y';
    }
  }
}
