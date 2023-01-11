import { Injectable } from '@angular/core';
import { AXRenderService } from '@acorex/core';
import { AXToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { AXToastMessageComponent } from './toast-message/toast-message.component';

export interface IToastOptions {
  timeOut?: number;
  title?: string;
  closeable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AXToastService {

  constructor(private injectionService: AXRenderService) { }

  info(message: string, options?: IToastOptions) {
    this.show(message, 'info', options);
  }

  success(message: string, options?: IToastOptions) {
    this.show(message, 'success', options);
  }

  warning(message: string, options?: IToastOptions) {
    this.show(message, 'warning', options);
  }

  error(message: string, options?: IToastOptions) {
    this.show(message, 'error', options);
  }

  private show(
    message: string,
    type: 'success' | 'info' | 'error' | 'warning',
    options?: IToastOptions
  ) {
    const opt = Object.assign(
      {
        message,
        type
      },
      options
    );

    const wrapper = document.querySelector('ax-toast-wrapper');
    if (!wrapper) {
      const toastWrapper = this.injectionService.appendComponent(
        AXToastWrapperComponent
      );
      this.injectionService.appendComponent(
        AXToastMessageComponent,
        opt,
        toastWrapper.location.nativeElement
      );
    } else {
      this.injectionService.appendComponent(
        AXToastMessageComponent,
        opt,
        wrapper
      );
    }
  }
}
