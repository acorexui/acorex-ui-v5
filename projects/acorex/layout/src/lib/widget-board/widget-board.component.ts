import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter, ViewChildren, QueryList
} from '@angular/core';
import {
  AXWidgetConfig,
  AXWidgetConfigChanged,
  AXWidgetBoardConfigChanged,
  AXWidgetConfigSavedEvent
} from './widget.class';
import { AXWidgetHostComponent } from './widget-host.component';
import { AXHtmlUtil, AXClientRec } from '@acorex/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ax-widget-board',
  templateUrl: './widget-board.component.html',
  styleUrls: ['./widget-board.component.scss'],
  host: { class: 'ax widget-board' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXWidgetBoardComponent implements OnInit {

  @ViewChild('container')
  private container: ElementRef<HTMLDivElement>;

  @ViewChildren(AXWidgetHostComponent)
  private widgetHosts: QueryList<AXWidgetHostComponent>;

  widgets: AXWidgetConfig[] = [];

  @Input()
  galleryItems: AXWidgetConfig[] = [];

  @Input()
  tileSize: number = 80;

  @Input()
  gapSize: number = 5;

  
  @Input()
  readonly: boolean = false;

  private newWidget: AXWidgetConfig = null;

  public rtl: boolean;

  private _isInEditing: boolean = false;
  public isInEditing(): boolean {
    return this._isInEditing;
  }
  private isDragging: boolean = false;
  private dragItem: HTMLElement;

  @Input()
  provideValue: (e: any) => any;

  private readonly DATA_COL = 'data-col';
  private readonly DATA_ROW = 'data-row';
  private readonly DATA_SIZE_X = 'data-size-x';
  private readonly DATA_SIZE_Y = 'data-size-y';
  private readonly DATA_OLD_COL = 'data-old-col';
  private readonly DATA_OLD_ROW = 'data-old-row';


  @Output()
  onConfigChanged: EventEmitter<AXWidgetBoardConfigChanged> = new EventEmitter<AXWidgetBoardConfigChanged>();

  @Output()
  onWidgetSave: EventEmitter<AXWidgetConfigSavedEvent> = new EventEmitter<AXWidgetConfigSavedEvent>();

  constructor(
    private ref: ElementRef<HTMLDivElement>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular((c) => {
      const style = document.createElement('style');
      style.type = 'text/css';
      this.ref.nativeElement.appendChild(style);
      // add css data classes
      for (let i = 1; i <= 50; i++) {
        style.innerHTML += `[${this.DATA_COL}="${i}"] {  ${this.rtl ? 'right' : 'left'}: ${(i - 1) * (this.tileSize + this.gapSize)}px; }`;
        style.innerHTML += `[${this.DATA_ROW}="${i}"] {  top: ${(i - 1) * (this.tileSize + this.gapSize)}px; }`;
        style.innerHTML += `[${this.DATA_SIZE_X}="${i}"] {  width:  ${(i * this.tileSize) + ((i - 1) * this.gapSize)}px; }`;
        style.innerHTML += `[${this.DATA_SIZE_Y}="${i}"] {  height: ${(i * this.tileSize) + ((i - 1) * this.gapSize)}px; }`;
      }
    });
  }

  private calcGridSize() {
    this.zone.runOutsideAngular(() => {
      const width =
        (Math.max(...this.widgets.map((c) => c.col + c.sizeX - 1))) * (this.tileSize + this.gapSize);
      const height =
        (Math.max(...this.widgets.map((c) => c.row + c.sizeY - 1))) * (this.tileSize + this.gapSize);
      this.container.nativeElement.style.width = width + 'px';
      this.container.nativeElement.style.height = height + 'px';
    });
  }

  toggleEdit() {
    this._isInEditing ? this.finishEdit() : this.startEdit();
  }



  private dragStart(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.zone.runOutsideAngular(() => {
      if (this._isInEditing && e.which === 1) {
        this.dragItem = e.currentTarget as any;
        this.dragItem.setAttribute('data-x-offset', (this.dragItem.offsetLeft - e.clientX).toString());
        //
        this.dragItem.setAttribute('data-y-offset', (this.dragItem.offsetTop - e.clientY).toString());
        this.dragItem.classList.add('widget-dragging');
        this.dragItem.classList.remove('animate__animated', 'animate__pulse');
      }
    });
    return false;
  }

  removePositionData() {
    this.zone.runOutsideAngular(() => {
      if (this.dragItem && this._isInEditing && this.dragItem.getAttribute(this.DATA_OLD_COL) == null) {
        this.dragItem.setAttribute(this.DATA_OLD_COL, this.dragItem.getAttribute(this.DATA_COL));
        this.dragItem.setAttribute(this.DATA_OLD_ROW, this.dragItem.getAttribute(this.DATA_ROW));
        this.dragItem.removeAttribute(this.DATA_COL);
        this.dragItem.removeAttribute(this.DATA_ROW);
      }
    });
  }

  resetPositionData() {
    this.zone.runOutsideAngular(() => {
      if (this.dragItem && this._isInEditing) {
        this.setPosition(this.dragItem, this.dragItem.getAttribute(this.DATA_OLD_COL), this.dragItem.getAttribute(this.DATA_OLD_ROW));
      }
    });
  }

  private setPosition(element: HTMLElement, col: string, row: string) {
    this.zone.runOutsideAngular(() => {
      element.setAttribute(this.DATA_COL, col);
      element.setAttribute(this.DATA_ROW, row);
      element.removeAttribute(this.DATA_OLD_COL);
      element.removeAttribute(this.DATA_OLD_ROW);
      element.style.removeProperty('top');
      element.style.removeProperty('left');
      const widget = this.widgets.find(c => c['__meta__'].instance.element === element);
      widget.col = Number(col);
      widget.row = Number(row);
    });
  }

  private drag(e) {
    e.preventDefault();
    e.stopPropagation();
    this.zone.runOutsideAngular(() => {
      if (this.dragItem && this._isInEditing) {
        this.isDragging = true;
        this.addPlaceholder();
        const xOffset = Number(this.dragItem.getAttribute('data-x-offset'));
        const yOffset = Number(this.dragItem.getAttribute('data-y-offset'));
        this.dragItem.style.left = e.clientX + xOffset + 'px';
        this.dragItem.style.top = e.clientY + yOffset + 'px';
        //
        this.detectBestPlacement();
        this.removePositionData();
      }
    });
    return false;
  }

  private dragEnd(e) {
    this.zone.runOutsideAngular(() => {
      if (this.dragItem && this._isInEditing && this.isDragging) {
        this.dragItem.classList.remove('widget-dragging');
        this.dragItem.classList.add('animate__animated', 'animate__pulse');
        //
        const p = this.container.nativeElement.querySelector('.widget-blank-placeholder');
        if (this.newWidget) {
          const w = {
            uniqueName: this.newWidget.uniqueName,
            component: this.newWidget.component,
            title: this.newWidget.title,
            options: this.newWidget.options,
            sizeX: this.newWidget.sizeX,
            sizeY: this.newWidget.sizeY,
            col: Number(p.getAttribute(this.DATA_COL)),
            row: Number(p.getAttribute(this.DATA_ROW))
          };

          this.widgets.push(w);
          this.newWidget = null;
          this.container.nativeElement.removeChild(this.dragItem);
          this.zone.run(() => {
            this.cdr.detectChanges();
            this.calcGridSize();
            setTimeout(() => {
              w['__meta__'].instance.element.addEventListener('mousedown', this.dragStart.bind(this), false);
            }, 1000);
          });
        } else {
          if (p) {
            this.setPosition(this.dragItem, p.getAttribute(this.DATA_COL), p.getAttribute(this.DATA_ROW));
          }
          else {
            this.setPosition(this.dragItem, this.dragItem.getAttribute(this.DATA_OLD_COL), this.dragItem.getAttribute(this.DATA_OLD_ROW));
          }
        }
        //
        this.removePlaceholder();
        this.dragItem = null;
        this.calcGridSize();
        this.emitConfigChanged();
      }
      this.isDragging = false;
    });
  }

  private detectFirstEmptySlot(w: AXWidgetConfig) {
    const xTile = Math.floor(this.ref.nativeElement.parentElement.offsetWidth / this.tileSize);
    for (let j = 1; j <= 100; j++) {
      for (let i = 1; i <= xTile - w.sizeX; i++) {
        const rec = new AXClientRec({
          left: i,
          top: j,
          width: w.sizeX,
          height: w.sizeY
        });
        const el = this.widgets.filter(c => c !== w).find((c) =>
          rec.intersect({
            left: c.col,
            top: c.row,
            width: c.sizeX,
            height: c.sizeY
          })
        );
        if (el == null) {
          w.col = i;
          w.row = j;
          return;
        }
      }
    }
  }

  private detectBestPlacement() {
    this.zone.runOutsideAngular(() => {
      const p = this.container.nativeElement.querySelector('.widget-blank-placeholder') as HTMLElement;
      let col = Math.ceil(this.dragItem.offsetLeft / this.tileSize);
      if (this.rtl) {
        col = Math.ceil((this.container.nativeElement.clientWidth - (this.dragItem.offsetLeft + this.dragItem.clientWidth)) / this.tileSize);
      }

      let row = Math.ceil(this.dragItem.offsetTop / this.tileSize);
      if (col < 1) {
        col = 1;
      }
      if (row < 1) {
        row = 1;
      }
      const widgets = Array.from(this.ref.nativeElement.querySelectorAll('.widget-host')).map((c) => c as HTMLElement);
      p.setAttribute(this.DATA_COL, col.toString());
      p.setAttribute(this.DATA_ROW, row.toString());
      const collision = widgets.filter(c => c !== this.dragItem).some(c => AXHtmlUtil.collision(c, this.dragItem));
      if (collision) {
        this.removePlaceholder();
      }
    });
  }




  private addPlaceholder() {
    this.zone.runOutsideAngular(() => {
      this.removePlaceholder();
      if (this.dragItem) {
        const p = document.createElement('div');
        p.classList.add('widget-blank-placeholder');
        p.setAttribute(this.DATA_COL, this.dragItem.getAttribute(this.DATA_COL));
        p.setAttribute(this.DATA_ROW, this.dragItem.getAttribute(this.DATA_ROW));
        p.setAttribute(this.DATA_SIZE_X, this.dragItem.getAttribute(this.DATA_SIZE_X));
        p.setAttribute(this.DATA_SIZE_Y, this.dragItem.getAttribute(this.DATA_SIZE_Y));
        this.container.nativeElement.appendChild(p);
      }
    });
  }

  private removePlaceholder() {
    const p = this.container.nativeElement.querySelector('.widget-blank-placeholder');
    p?.remove();
  }

  public startEdit() {
    this._isInEditing = true;
    this.calcGridSize();
    this.ref.nativeElement.classList.add('grid-background');
    const bg = this.ref.nativeElement as HTMLDivElement;
    bg.style.setProperty('background-position', `${this.rtl ? 'right' : 'left'} top`);
    // tslint:disable-next-line: max-line-length
    const pattern = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${this.tileSize + this.gapSize}" height="${this.tileSize + this.gapSize}"> <rect style="fill: %23dadada" x="${this.rtl ? this.gapSize : 0}" width="${this.tileSize}" height="${this.tileSize}" y="0"></rect></svg>')`;
    bg.style.setProperty('background-image', pattern);
    //
    const widgets = Array.from(this.ref.nativeElement.querySelectorAll('.widget-host'));
    widgets.forEach((w) => {
      w.addEventListener('mousedown', this.dragStart.bind(this), false);
    });
    this.ref.nativeElement.addEventListener('mousemove', this.drag.bind(this), false);
    this.ref.nativeElement.addEventListener('mouseup', this.dragEnd.bind(this), false);
  }

  public finishEdit() {
    this.ref.nativeElement.classList.remove('grid-background');
    const bg = this.ref.nativeElement as HTMLDivElement;
    bg.style.removeProperty('background-image');
    //
    this._isInEditing = false;
    const widgets = Array.from(this.ref.nativeElement.querySelectorAll('.widget-host'));
    widgets.forEach((w) => {
      w.removeEventListener('mousedown', this.dragStart.bind(this), false);
    });
    this.ref.nativeElement.removeEventListener('mousemove', this.drag.bind(this), false);
    this.ref.nativeElement.removeEventListener('mouseup', this.dragEnd.bind(this), false);
    this.emitConfigChanged();
  }


  addWidget(widget: AXWidgetConfig) {
    this.zone.runOutsideAngular(() => {
      this.newWidget = {
        uniqueName: widget.uniqueName,
        component: widget.component,
        title: widget.title,
        col: 1,
        row: 1,
        sizeX: widget.sizeX,
        sizeY: widget.sizeY,
        options: widget.options,
        props: widget.props
      };
      this.detectFirstEmptySlot(this.newWidget);
      const w = {
        uniqueName: this.newWidget.uniqueName,
        component: this.newWidget.component,
        title: this.newWidget.title,
        options: this.newWidget.options,
        props: this.newWidget.props,
        sizeX: this.newWidget.sizeX,
        sizeY: this.newWidget.sizeY,
        col: this.newWidget.col,
        row: this.newWidget.row
      };
      this.widgets.push(w);
      this.newWidget = null;
      this.zone.run(() => {
        this.cdr.detectChanges();
        this.calcGridSize();
        this.emitConfigChanged();
        setTimeout(() => {
          w['__meta__'].instance.element.addEventListener('mousedown', this.dragStart.bind(this), false);
        }, 1000);
      });
    });
  }


  handleOnRemove(w: AXWidgetHostComponent) {
    w.element.classList.add('animate__animated', 'animate__zoomOut');
    w.element.addEventListener('animationend', () => {
      this.widgets = this.widgets.filter((c) => (c as any).__meta__.id !== (w.config as any).__meta__.id);
      this.cdr.detectChanges();
      this.calcGridSize();
      this.emitConfigChanged();
    });
  }

  handleOnSave(e: AXWidgetConfigSavedEvent) {
    this.onWidgetSave.emit(e);
  }

  trackByFn(index, item) {
    if (!item['__meta__']?.id) {
      item['__meta__'] = {};
      item['__meta__'].id = AXHtmlUtil.getUID();
    }
    return item['__meta__']?.id;
  }


  load(widgets: string | AXWidgetConfig[]): Promise<void> {
    this.clear();
    return new Promise<void>((resolve, reject) => {
      if (widgets) {
        const loadedWidgets: AXWidgetConfig[] = [];
        if (typeof widgets === 'string') {
          try {
            loadedWidgets.push(...JSON.parse(widgets));
          } catch (error) {
            reject('Invalid widget json data!');
          }
        }
        else {
          loadedWidgets.push(...widgets);
        }
        let intervalId: number = -1;
        const loadFunc = () => {

          if (this.galleryItems && this.galleryItems.length > 0) {
            loadedWidgets.forEach(w => {
              const gitem = this.galleryItems.find(c => c.uniqueName === w.uniqueName);
              if (gitem) {
                w.component = gitem.component;
                if (gitem.props) {
                  w.props = JSON.parse(JSON.stringify(gitem.props));
                }
              }
            });
            this.widgets.push(...loadedWidgets);
            window.clearInterval(intervalId);
            this.cdr.detectChanges();
            resolve();
          }
        };
        intervalId = window.setInterval(loadFunc, 200);
      }
      else {
        resolve();
      }
    });
  }

  clear() {
    if (this.widgets.length) {
      this.widgets = [];
      this.cdr.detectChanges();
      this.emitConfigChanged();
    }
  }

  save(): Promise<string> {
    const obj = this.widgets.map(c => ({
      uniqueName: c.uniqueName,
      component: c.component,
      title: c.title,
      sizeX: c.sizeX,
      sizeY: c.sizeY,
      col: c.col,
      row: c.row,
      options: c.options,
      props: c.props
    }));
    return Promise.resolve(JSON.stringify(obj));
  }

  refresh() {
    this.widgetHosts.forEach(host => {
      host.widget.refresh();
    });
  }

  handleOnConfigChanged(e: AXWidgetConfigChanged) {
    this.cdr.detectChanges();
    this.emitConfigChanged();
  }

  handleOnResizedChanged(e: AXWidgetConfigChanged) {
    this.detectFirstEmptySlot(e.config);
    this.cdr.detectChanges();
    this.emitConfigChanged();
  }

  private resizeChangeObserver: any;
  private emitConfigChanged() {
    if (!this.resizeChangeObserver) {
      this.resizeChangeObserver = new Observable();
      Observable.create(observer => {
        this.resizeChangeObserver = observer;
      })
        .pipe(debounceTime(750))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          this.onConfigChanged.emit({
            component: this
          });
        });
    }
    this.resizeChangeObserver.next(new Date());
  }
}
