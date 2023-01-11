import { Component } from '@angular/core';
import { AXToastService } from '@acorex/components';

@Component({
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss']
})
export class ToastPage {
  constructor(private toast: AXToastService) {}

  openInfoToast() {
    this.toast.info('This is sample toast message');
  }

  openSuccessToast() {
    this.toast.success('This is sample toast message', { closeable: true, title: 'Error Message' });
  }

  openWarningToast() {
    this.toast.warning('This is sample toast message', { closeable: true, title: 'Error Message' });
  }

  openDangerToast() {
    this.toast.error(
      `
    Lorem ipsum, or lipsum as it is sometimes known, is dummy
     text used in laying out print, graphic or web designs.
      The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero'
      s De Finibus Bonorum et Malorum for use in a type specimen book.`,
      {
        timeOut: 50000
      }
    );
  
  }
}
