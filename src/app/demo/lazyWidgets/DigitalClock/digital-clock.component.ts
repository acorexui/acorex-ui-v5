import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AXWidgetComponent } from '@acorex/layout';
import { propertyEditor } from '@acorex/components';

@Component({
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss'],
  host: { style: 'height: 100%' }
})
export class DigitalClockWidgetComponent extends AXWidgetComponent implements AfterViewInit {
  lang = 'en-US';
  defultCityTitle: string;

  @ViewChild('date') date: ElementRef;
  @ViewChild('day') day: ElementRef;
  @ViewChild('time') time: ElementRef<HTMLDivElement>;

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
    const day = date.toLocaleString(localsData, { day: '2-digit' });
    const month = date.toLocaleString(localsData, { month: '2-digit' });
    const year = date.toLocaleString(localsData, { year: 'numeric' });

    const h = date.toLocaleString(this.lang, { hour12: false, hour: '2-digit', timeZone: timeZoneData }); // 0 - 23
    const m = date.toLocaleString(this.lang, { minute: '2-digit', timeZone: timeZoneData }); // 0 - 23
    const s = date.toLocaleTimeString(this.lang, { second: '2-digit', timeZone: timeZoneData }); // 0 - 23

    const hour = Number(h) < 10 ? '0' + h : h;
    const minute = Number(m) < 10 ? '0' + m : m;
    const second = Number(s) < 10 ? '0' + s : s;

    const time = h + ':' + minute + ':' + second;
    this.time.nativeElement.innerText = time;
    this.time.nativeElement.textContent = time;
    const weekDay = date.toLocaleString(localsData, { weekday: 'long' });
    this.date.nativeElement.innerHTML = year + '/' + month + '/' + day;
    this.day.nativeElement.innerHTML = weekDay;

    this.defultCityTitle = this.timeZone[0].text;
    this.setValue('title', this.defultCityTitle);
  }

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
