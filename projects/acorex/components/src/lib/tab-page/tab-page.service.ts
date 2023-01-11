import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AXHtmlUtil } from '@acorex/core';
import { AXPageClosing, AXPageResult, TAB_META_KEY, AXPageClosedPromise } from '../base/base-page.class';

export interface AXTabPage {
  title: string;
  content: any;
  closable?: boolean;
  data?: any;
  pinned?: boolean;
}



@Injectable({ providedIn: 'root' })
export class AXTabPageService {



  tabs: AXTabPage[] = new Array<AXTabPage>();
  opened = new Subject<AXTabPage>();
  activated = new Subject<AXTabPage>();
  closed = new Subject<AXTabPage>();
  changed = new Subject();



  constructor() { }

  open(content: any, title: string): AXPageClosedPromise;
  open(content: any, title: string, data?: any): AXPageClosedPromise;
  open(options: AXTabPage): AXPageClosedPromise;

  open(arg1, arg2?, arg3?) {
    let newTab: AXTabPage;
    if (typeof arg1 === 'object') {
      const options = Object.assign({ closable: true }, arg1);
      newTab = {
        title: options.title,
        closable: options.closable,
        content: options.content,
        data: options.data,
        pinned: options.pinned
      };
    } else {
      newTab = {
        title: arg2,
        closable: true,
        content: arg1,
        data: arg3,
      };
    }
    newTab[TAB_META_KEY] = {};
    newTab[TAB_META_KEY].uid = AXHtmlUtil.getUID();
    //
    const existTab = this.tabs.find((c) => newTab[TAB_META_KEY].uid && c[TAB_META_KEY].uid === newTab[TAB_META_KEY].uid) ||
      this.findExistTab(newTab.content, newTab.data);
    //
    if (existTab) {
      return Promise.resolve(this.active(existTab));
    }
    this.tabs.push(newTab);
    this.tabs
      .filter((c) => c[TAB_META_KEY].uid !== newTab[TAB_META_KEY].uid)
      .forEach((t) => {
        t[TAB_META_KEY].active = false;
      });
    this.opened.next(newTab);
    this.active(newTab);
    const promise = new AXPageClosedPromise((resolve) => {
      newTab[TAB_META_KEY].close = (e) => {
        if (resolve) {
          delete e.cancel;
          resolve(e);
        }
      };
    });
    promise['closeMethod'] = () => { this.close(newTab); };
    return promise;
  }

  close(tab: AXTabPage) {
    const e = { cancel: false };
    const closingFunc = tab[TAB_META_KEY].component?.onClosing;
    if (closingFunc) {
      const res = closingFunc(e);
      if (res instanceof Promise) {
        res.then(() => {
          if (e == null || e.cancel !== true) {
            this.doCloseAction(tab, e);
          }
        });
      }
      else {
        if (e == null || e.cancel !== true) {
          this.doCloseAction(tab, e);
        }
      }
    } else {
      this.doCloseAction(tab, e);
    }
  }

  private doCloseAction(tab: AXTabPage, e: AXPageClosing): void {
    const currentTab = this.tabs.find((c) => c[TAB_META_KEY].uid == tab[TAB_META_KEY].uid);
    if (!currentTab) {
      return;
    }
    const index = this.tabs.indexOf(currentTab);
    this.tabs = this.tabs.filter(c => c != currentTab);
    const prev = index > 0 ? this.tabs[index - 1] : this.tabs[0];
    if (prev) {
      this.active(prev);
    }
    this.closed.next(currentTab);
    this.changed.next(null);
    if (currentTab[TAB_META_KEY].close) {
      currentTab[TAB_META_KEY].close(e);
    }
  }

  active(tab: AXTabPage): AXPageResult;
  active(uid: string): AXPageResult;
  active(): AXPageResult;
  active(arg1?): AXPageResult {
    if (!arg1) {
      return {
        sender: this.tabs.find((c) => c[TAB_META_KEY].active === true)
      }
    }
    if (typeof arg1 === 'object') {
      const tab = <AXTabPage>arg1;
      tab[TAB_META_KEY].active = true;
      this.tabs
        .filter((c) => c[TAB_META_KEY].uid !== tab[TAB_META_KEY].uid)
        .forEach((t) => {
          t[TAB_META_KEY].active = false;
        });
      this.activated.next(tab);
      this.changed.next(null);
      return {
        sender: tab
      }
    } else if (typeof arg1 === 'string') {
      const tab = this.tabs.find((c) => c[TAB_META_KEY].uid === arg1);
      if (tab) {
        return this.active(tab);
      }
      return null;
    }
  }

  clear(): void {
    this.tabs.forEach((c) => {
      this.close(c);
    });
    this.tabs = [];
  }

  private findExistTab(component: any, data: any): AXTabPage {
    try {
      if (!data) {
        data = {};
      }
      const result = this.tabs.find((c: any) =>
        c.content === component &&
        ((!c.data) ||
          JSON.stringify(data) === JSON.stringify(c.data))
      );
      return result;
    } catch (error) {
      return null;
    }
  }
}
