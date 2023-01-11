import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { AXPopupService, AXDialogService, AXOverlayService } from '@acorex/components';
import { AXBasePageComponent } from '@acorex/core';

@Component({
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss']
})
export class PopupPage extends AXBasePageComponent implements OnInit {
  constructor(
    private popup: AXPopupService,
    private dialog: AXDialogService,
    private overlayService: AXOverlayService,
    private viewRef: ViewContainerRef
  ) {
    super();
  }

  @ViewChild('tpl') tpl: TemplateRef<any>;
  @ViewChild('tpl2') tpl2: TemplateRef<any>;

  ngOnInit(): void {}

  onOpenPopupClick() {
    const popup = this.popup.open('input', {
      modal: false,
      title: 'Modal'
    });
    popup.then((c) => {});
  }

  onOpenPopupRouteClick() {
    const popup = this.popup.open('Lov', 'Input Demo');
  }

  onOpenPopupgridClick() {
    const popup = this.popup.open('datagrid', 'Input Demo');
  }

  onOpenDialogClick() {
    this.dialog
      .confirm(
        'Dialog Title',
        `Lorem ipsum, or lipsum as it is sometimes known,
            is dummy text used in laying out print, graphic or
            web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to
            have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.`
      )
      .okay(() => {})
      .cancel(() => {});
  }

  @ViewChild('span') span: ElementRef<HTMLSpanElement>;

  onOpenPopoverClick() {
    this.overlayService.show(
      this.tpl,
      {},
      {
        targetElement: this.span.nativeElement,
        closeOnClickOutside: true,
        position: {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        }
      }
    );
  }
}
