import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgZone,
  ChangeDetectorRef,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { AXPlacement, AXMenuItem } from '@acorex/core';
import { AXBaseSizableComponent, AXElementSize } from '../base/element.class';
import { AXEvent } from '../base/events.class';

export class AXMenuItemClickEvent extends AXEvent<AXMenuItem, MouseEvent> {
  name: string;
}

@Component({
  selector: 'ax-menu',
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AXMenuComponent implements AXBaseSizableComponent {

  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) {
  }

  @ContentChild(TemplateRef, { static: true })
  _contentMenuTemplate: TemplateRef<any>;

  private _menuTemplate: TemplateRef<any>;
  @Input()
  public get menuTemplate(): TemplateRef<any> {
    return this._menuTemplate ? this._menuTemplate : this._contentMenuTemplate;
  }
  public set menuTemplate(v: TemplateRef<any>) {
    this._menuTemplate = v;
  }

  resizeChangeObserver: any;

  @Input()
  rtl: boolean;

  @Output()
  onItemClick: EventEmitter<AXMenuItemClickEvent> = new EventEmitter<AXMenuItemClickEvent>();

  @Input()
  size: AXElementSize = 'md';

  @Input()
  public selection: 'none' | 'single' | 'multiple' = 'none';

  @Input()
  public mode: 'click' | 'context' | 'visible' | 'manual' = 'visible';

  @Input()
  public target: string;

  @Input()
  public floatAlignment: AXPlacement;

  @Input()
  public floatPlacemnet: AXPlacement;

  public currentTarget: HTMLElement;

  @Input()
  public direction: 'vertical' | 'horizontal' = 'horizontal';

  private _items: AXMenuItem[];
  @Input()
  public get items(): AXMenuItem[] {
    return this._items;
  }
  public set items(v: AXMenuItem[]) {
    this._items = v;
  }

  ngOnInit() {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
  }


  handleItemClick(e: MouseEvent, item?: AXMenuItem) {
    e.stopPropagation();
    if (item && (!item.items || !item.items.filter((c) => c.visible !== false).length) && !item.disable) {
      const m = {
        component: this,
        htmlElement: this.ref.nativeElement,
        htmlEvent: e,
        data: item,
        name: item?.name
      };
      if (item.onClick) {
        item.onClick();
      }
      else {
        this.onItemClick.emit(m);
      }

      return;
    }
  }
}
