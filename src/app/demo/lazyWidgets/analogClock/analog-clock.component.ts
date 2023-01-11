import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AXWidgetComponent } from '@acorex/layout';
import { propertyEditor } from '@acorex/components';

@Component({
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss'],
  host: { style: ' height:100%;' }
})
export class AnalogClockWidgetComponent extends AXWidgetComponent implements OnInit {
  defultCityTitle: string;

  @ViewChild('clock') clockCon: ElementRef;
  @ViewChild('hourHand') hourHand: ElementRef;
  @ViewChild('minuteHand') minuteHand: ElementRef;
  @ViewChild('secondHand') secondHand: ElementRef;
  @ViewChild('date') date: ElementRef;
  @ViewChild('day') day: ElementRef;

  @propertyEditor({
    editorClass: 'ax/editors/text',
    title: 'نام شهر',
    order: 0
  })
  cityTitle: string;

  @propertyEditor({
    editorClass: 'ax/editors/select',
    title: 'منطقه زمانی',
    order: 1,
    defaultValue: 'Asia/Tehran',
    editorOptions: {
      items: [
        { id: 'Asia/Tehran', text: 'آسیا / تهران' },
        { id: 'Asia/Jakarta', text: 'آسیا / جاکارتا' },
        { id: 'UTC', text: 'گرینویچ' },
        { id: 'America/New_York', text: 'آمریکا / نیویورک' },
        { id: 'Europe/London', text: 'اروپا / لندن' }
      ]
    }
  })
  timeZone: any;

  @propertyEditor({
    editorClass: 'ax/editors/select',
    title: 'زبان و تاریخ',
    order: 2,
    defaultValue: 'fa-IR',
    editorOptions: {
      items: [
        { id: 'fa-IR', text: 'فارسی(ایران) / شمسی' },
        { id: 'en-US', text: 'انگلیسی(آمریکا) / میلادی' },
        { id: 'ar-SA', text: 'عربی(عربستان) | قمری' }
      ]
    }
  })
  locales: any;

  get isConfigured(): boolean {
    return this.timeZone && this.locales;
  }

  constructor() {
    super();
  }

  clock(timeZoneData, localsData) {
    const date = new Date();
    const hour = date.toLocaleString('en-US', {
      hour: '2-digit',
      timeZone: timeZoneData
    });
    const minute = date.toLocaleString('en-US', {
      minute: '2-digit',
      timeZone: timeZoneData
    });
    const secound = date.toLocaleString('en-US', {
      second: '2-digit',
      timeZone: timeZoneData
    });
    const day = date.toLocaleString(localsData, { day: '2-digit' });
    const month = date.toLocaleString(localsData, { month: '2-digit' });
    const year = date.toLocaleString(localsData, { year: 'numeric' });

    const hourDeg = Number(hour.charAt(0) + hour.charAt(1)) * 30 + Number(minute) * (360 / 720);
    const minuteDeg = Number(minute) * 6 + Number(secound) * (360 / 3600);
    const secoundDeg = Number(secound) * 6;

    const weekDay = date.toLocaleString(localsData, { weekday: 'long' });

    this.hourHand.nativeElement.style.transform = 'rotate(' + hourDeg + 'deg)';
    this.minuteHand.nativeElement.style.transform = 'rotate(' + minuteDeg + 'deg)';
    this.secondHand.nativeElement.style.transform = 'rotate(' + secoundDeg + 'deg)';
    this.date.nativeElement.innerHTML = year + '/' + month + '/' + day;
    this.day.nativeElement.innerHTML = weekDay;

    this.defultCityTitle = this.timeZone[0].text;
    this.setValue('title', this.defultCityTitle);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.isBusy = false;
    if (this.isConfigured) {
      this.redraw();
    }
  }

  redraw() {
    setInterval(() => {
      this.clock(this.timeZone[0].id, this.locales[0].id);
    }, 100);
    setTimeout(() => {
      this.isBusy = false;
    }, 500);
  }
}
