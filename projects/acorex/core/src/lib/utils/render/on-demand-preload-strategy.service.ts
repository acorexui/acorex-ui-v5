import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AXHtmlUtil } from '../html/html-util';




@Injectable()
export class AXOnDemandPreloadService {
  subject = new Subject<string>();
  tmp: string;

  constructor() {
    this.tmp = AXHtmlUtil.getUID();
  }

  startPreload(routePath: string) {
    const slices: string[] = [];
   

    this.subject.next(routePath);
  }
}
