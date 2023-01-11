import { Injectable } from '@angular/core';
import { AXPopupComponent } from './popup.component';
import { AXButtonItem } from '@acorex/core';
import { TAB_META_KEY, AXPageClosedPromise, AXPageCloseEvent } from '../base/base-page.class';
import { AXOverlayService, AXOverlayViewRef } from '../popover/overlay.service';
import { options } from '@amcharts/amcharts4/core';


@Injectable({ providedIn: 'root' })
export class AXPopupService {
  private stack: Array<AXPopupComponent> = [];

  constructor(private overlayService: AXOverlayService) { }


  open(content: any, title: string): AXPageClosedPromise;
  open(
    content: any,
    options?: {
      title: string;
      closable?: boolean;
      maximizable?: boolean;
      size?: 'sm' | 'md' | 'lg' | 'full';
      data?: any;
      footerButtons?: AXButtonItem[],
      modal?: boolean
    }
  ): AXPageClosedPromise;

  open(arg1, arg2): AXPageClosedPromise {
    const options: any = {
      closable: true,
      size: 'md',
      maximizable: false,
      footerButtons: [],
      modal: true,
    };

    if (typeof arg2 === 'string') {
      options.title = arg2;
    } else {
      Object.assign(options, arg2);
    }
    const com = this.overlayService.show(AXPopupComponent, options, {
      transparentBackdrop: false,
      hasBackdrop: options.modal,
      closeOnClickOutside: false,
      scroll: 'block'
    });
    const popup = com.instance as AXPopupComponent;
    popup.content = arg1;
    popup[TAB_META_KEY] = {};
    if (options.size) {
      popup.size = options.size;
    }
    if (options.footerButtons) {
      popup.footerButtons = options.footerButtons;
    }
    this.stack.push(popup);
    popup.onClosed.subscribe(c => {
      this.closePopup(popup, com, c);
    });
    const promise = new AXPageClosedPromise((resolve) => {
      popup[TAB_META_KEY].close = (e) => {
        if (resolve) {
          resolve(e);
        }
      };
    });
    promise['closeMethod'] = () => { popup.onCloseClick(); };
    return promise;
  }


  private closePopup(popup: AXPopupComponent, com: AXOverlayViewRef, result: AXPageCloseEvent) {
    const closeFunc = (e) => {
      com.dispose();
      this.stack.pop();
      delete e.cancel;
      popup[TAB_META_KEY].close(e);
      if (this.stack.length) { this.stack.reverse()[0].focus(); }
    };
    const e = { cancel: false };
    const closingFunc = popup[TAB_META_KEY]?.component?.onClosing;
    if (closingFunc) {
      const res = closingFunc(e);
      if (res instanceof Promise) {
        res.then(() => {
          if (e == null || e.cancel !== true) {
            closeFunc(result);
          }
        });
      }
      else {
        if (e == null || e.cancel !== true) {
          closeFunc(result);
        }
      }
    } else {
      closeFunc(result);
    }
  }
}
