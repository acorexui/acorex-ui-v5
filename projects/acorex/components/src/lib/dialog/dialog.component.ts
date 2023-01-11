import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AXButtonItem } from '@acorex/core';
import { AXMenuItemClickEvent } from '../menu/menu.component';
import { AXBasePopupPageComponent } from '../base/base-page.class';

@Component({
  selector: 'ax-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AXDialogComponent extends AXBasePopupPageComponent {
  message: any;

  buttons: AXButtonItem[] = [];

  constructor() {
    super();
  }

  onClick: Function;

  onFooterButtonClick(e: AXMenuItemClickEvent) {
    if (this.onClick) {
      this.onClick(e.data);
    }
  }

  getFooterButtons(): AXButtonItem[] {
    return this.buttons;
  }
}
