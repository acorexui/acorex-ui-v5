import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { AXDataListComponent } from "../core/data-list.component";
import {
  AXToolbarListViewComponent,
  AXListViewDirection
} from "./toolbar-list-view.component";
import { ViewEncapsulation } from "@angular/core";
import { AXToolbarSearchComponent } from '../../toolbar/search/toolbar-search.component';
import { AXToolbarComponent } from '../../toolbar/toolbar.component';
import { AXEvent, AXValueEvent } from '../../base/events.class';
import { AXDataSourceComponent } from '../../data-source/datasource.component';






@Component({
  selector: "ax-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXListComponent extends AXDataListComponent {
  constructor() {
    super();
  }
  @Input() width: string = "";
  @Input() height: string = "auto";

  @Input("dropId") public dropId: string;
  @Input("connectedList") public connectedList: string[] = [];

  @Input() public allowMoveItem: boolean = false;


  @ContentChild(AXDataSourceComponent, { static: true })
  private _contentDataSource: AXDataSourceComponent;

  private _dataSource: AXDataSourceComponent;

  @Input()
  public get dataSource(): AXDataSourceComponent {
    return this._dataSource ? this._dataSource : this._contentDataSource;
  }

  public set dataSource(v: AXDataSourceComponent) {
    this._dataSource = v;
  }


  @ContentChild('itemTemplate', { static: true })
  _contentItemTemplate: TemplateRef<any>;


  private _itemTemplate: TemplateRef<any>;
  @Input()
  public get itemTemplate(): TemplateRef<any> {
    return this._itemTemplate ? this._itemTemplate : this._contentItemTemplate;
  }
  public set itemTemplate(v: TemplateRef<any>) {
    this._itemTemplate = v;
  }




  @ContentChild('emptyTemplate', { static: true })
  _contentEmptyTemplate: TemplateRef<any>;

  private _emptyTemplate: TemplateRef<any>;
  @Input()
  public get emptyTemplate(): TemplateRef<any> {
    return this._emptyTemplate ? this._emptyTemplate : this._contentEmptyTemplate;
  }
  public set emptyTemplate(v: TemplateRef<any>) {
    this._emptyTemplate = v;
  }


  @ContentChild(AXToolbarSearchComponent, { static: true })
  searchToolbar: AXToolbarSearchComponent;

  @ContentChild(AXToolbarListViewComponent, { static: true })
  viewToolbar: AXToolbarListViewComponent;

  @ContentChild(AXToolbarComponent, { static: true })
  toolbar: AXToolbarComponent;



  @Output()
  onDirectionChanged: EventEmitter<AXValueEvent<AXListViewDirection>> = new EventEmitter<AXValueEvent<AXListViewDirection>>();

  private _direction: AXListViewDirection = "vertical";
  @Input()
  public get direction(): AXListViewDirection {
    return this._direction;
  }
  public set direction(v: AXListViewDirection) {
    if (this._direction != v) {
      const old = this._direction;
      this._direction = v;
      this.setDirection(v);
      this.onDirectionChanged.emit({
        component: this,
        value: v,
        oldValue: old
      });
    }
  }


  ngAfterViewInit(): void {
    this.fetch();
    if (this.viewToolbar) {
      this.viewToolbar.onDirectionChanged.subscribe(c => {
        this.direction = c.value;
      });
    }
  }

  private setDirection(e: AXListViewDirection) {
    this.direction = e;
  }



  // dragDrop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }
  dragDrop(event: any) {

  }
}
