import { Component, ViewEncapsulation, Input, ContentChild, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AXDataSourceComponent } from '../data-source/datasource.component';
import { AXDataEvent, AXHtmlEvent, AXValueEvent } from '../base/events.class';
import { AXBaseComponent } from '../base/element.class';
import { AXContextMenuItemClickEvent, AXContextMenuPromiseFunction, AXContextMenuFunction } from '../context-menu/context-menu.directive';
import { AXMenuItem } from '@acorex/core';

export class AXTreeSideMenuNode {
  children: AXTreeSideMenuNode[];
  itemData: AXTreeSideMenuItemData = new AXTreeSideMenuItemData();
  parent: AXTreeSideMenuNode;
}

export class AXTreeSideMenuItemData {
  selected: boolean;
  key: string;
  disabled: boolean;
  open: boolean;
  hasChild: boolean;
  item: any;
}

export class AXTreeSideMenuItemMovedEvent {
  source: AXTreeSideMenuNode;
  target: AXTreeSideMenuNode;
  resolve: (value: boolean) => void;
}

export class AXTreeSideMenuSelectionChangedEvent extends AXValueEvent<AXTreeSideMenuNode> {
  component: AXTreeSideMenuComponent;
}

export class AXTreeSideMenuItemClick extends AXHtmlEvent<MouseEvent> {
  component: AXTreeSideMenuComponent;
  item: any;
  flag: boolean;
  cancel?: boolean;
}

@Component({
  selector: 'ax-tree-side-menu',
  templateUrl: './tree-side-menu.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AXTreeSideMenuComponent extends AXBaseComponent {
  @ContentChild(TemplateRef, { static: true })
  nodeTemplate: TemplateRef<any>;

  @ContentChild(AXDataSourceComponent, { static: true })
  private _contentDataSource: AXDataSourceComponent;

  @Input()
  cssClass: 'single' | 'multiple' = 'single';

  @Input()
  selectionMode: 'single' | 'multiple' = 'single';

  @Input()
  selectionLevel: 'all' | 'nodes' | 'parents' = 'all';

  @Input()
  selectedFieldName: string = null;

  @Input()
  selectNodesRecursive: boolean = true;

  @Input()
  seletedKeyFields: any[] = [];

  @Input()
  keyField: string = 'id';

  @Input()
  textField: string = 'title';

  @Input()
  hasChildField: string = 'child';

  @Input()
  bordered: boolean = false;

  @Input()
  lazyLoading: boolean = true;

  @Input()
  allowDrag: boolean = false;

  @Input()
  size: 'md' | 'sm' = 'md';

  @Input()
  iconStart: boolean = true;

  @Input()
  closeIconName: string = 'fal fa-plus';

  @Input()
  openIconName: string = 'fal fa-minus';

  @Output()
  selectionChanged: EventEmitter<AXTreeSideMenuSelectionChangedEvent> = new EventEmitter<AXTreeSideMenuSelectionChangedEvent>();

  @Output()
  onItemOpening: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onItemClick: EventEmitter<AXTreeSideMenuItemClick> = new EventEmitter<AXTreeSideMenuItemClick>();

  @Output()
  onItemClosing: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onItemDrag: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onItemMoved: EventEmitter<AXTreeSideMenuItemMovedEvent> = new EventEmitter<AXTreeSideMenuItemMovedEvent>();

  @Output()
  onContextMenuItemClick: EventEmitter<AXContextMenuItemClickEvent> = new EventEmitter<AXContextMenuItemClickEvent>();

  showSelectBox: boolean = false;
  loading: boolean = false;
  list: any[] = [];
  itemRow: any;
  selectedItems: any[] = [];
  selectedParents: any[] = [];
  loadAllChildren: boolean = false;
  listLoad: any[] = [];
  itemDrop: any;
  itemDrag: any;
  validDrop: boolean = true;
  lockedDrag: boolean = false;
  childField: string = 'childeren';
  showContextMenu: boolean = false;
  @Input()
  contextMenuItems: AXMenuItem[] | AXContextMenuPromiseFunction | AXContextMenuFunction;

  constructor(private ref: ElementRef) {
    super();
  }

  handleOnContextMenuItem(e: AXContextMenuItemClickEvent) {
    this.onContextMenuItemClick.emit(e);
  }

  refresh() {
    this.list = [];
    this._contentDataSource.fetch(null);
  }

  internalSelectItem(item, userChange: boolean = true) {
    if (item[this.hasChildField] === false || this.selectionMode === 'single') {
      item.select = !item.select;
      if (item.parentNode && this.selectionMode !== 'single') {
        this.changeParentSelect(item.parentNode);
      }
      if (item.select === true) {
        if (this.selectionMode === 'single') {
          this.selectedItems.forEach((e) => {
            e.select = false;
          });
          this.selectedItems = [];
          this.selectedItems.push(item);
        } else {
          this.selectedItems.push(item);
        }
      } else {
        this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] !== item[this.keyField]);
      }
    } else {
      item.select = !item.select;

      if (item.parentNode && this.selectionMode === 'multiple') {
        this.changeParentSelect(item.parentNode);
      }
      if (this.selectionMode === 'multiple') {
        this.changeChildSelect(item, item.select);
      }

      if (item.select == true) {
        if (this.selectionMode === 'multiple') {
          this.selectedParents.push(item);
        } else {
          this.selectedParents.forEach((e) => {
            e.select = false;
          });
          this.selectedParents = [];
          this.selectedParents.push(item);
        }
      } else {
        this.selectedParents = this.selectedParents.filter((c) => c[this.keyField] !== item[this.keyField]);
      }
    }
    if (userChange) {
      this.selectionChanged.emit({
        component: this,
        value: this.makeNode(item),
        htmlElement: this.ref.nativeElement
      });
    }
  }

  private makeNode(item, addChildren: boolean = true) {
    const node: AXTreeSideMenuNode = new AXTreeSideMenuNode();
    if (addChildren) {
      node.children = item[this.childField] === undefined ? [] : item[this.childField]?.map((m) => this.makeNode(m));
    }
    node.itemData.disabled = item.disabled === true ? item.disabled : false;
    node.itemData.open = item.open === true ? item.open : false;
    node.itemData.key = item[this.keyField];

    const c = [];
    let i = 0;
    for (var k in item) {
      i = i + 1;
      if (
        k != 'select' &&
        k != 'hasChild' &&
        k != 'loading' &&
        k != 'requestId' &&
        k != 'disabled' &&
        k != 'open' &&
        k != 'parentNode' &&
        k != 'toggle' &&
        k != 'loaded' &&
        k != 'indeterminate' &&
        k != this.childField
      ) {
        //c.push({ k: item[k] });
        c[k] = item[k];
      }
    }
    node.itemData.item = c; //TO DO
    node.itemData.selected = item.select === true ? item.select : false;
    node.itemData.hasChild = item[this.hasChildField];
    node.parent = item.parentNode === undefined ? null : this.makeNode(item.parentNode, false);
    return node;
  }

  private changeChildSelect(item, s) {
    if (this.selectNodesRecursive) {
      item.select = s;
      if (item[this.hasChildField] === true && item[this.childField] && item[this.childField].length > 0) {
        item[this.childField].forEach((elm) => {
          if (elm[this.hasChildField] === true) {
            elm.select = s;

            if (s === true && this.selectionMode !== 'single') {
              this.selectedParents = this.selectedParents.filter((c) => c[this.keyField] !== elm[this.keyField]);
              this.selectedParents.push(elm);
            }
            if (s === false && this.selectionMode !== 'single') {
              this.selectedParents = this.selectedParents.filter((c) => c[this.keyField] !== elm[this.keyField]);
            }

            this.changeChildSelect(elm, s);
          } else {
            elm.select = s;
            if (s === true && this.selectionMode !== 'single') {
              this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] !== elm[this.keyField]);
              this.selectedItems.push(elm);
            }
            if (s === false && this.selectionMode !== 'single') {
              this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] !== elm[this.keyField]);
            }
          }
        });
      } else {
        item.select = s;
      }
    }
  }

  private changeParentSelect(item) {
    if (this.selectNodesRecursive) {
      let allselect = true;
      let alldeselect = true;
      let oneselect = false;
      let isindeterminate = false;

      if (item[this.childField]) {
        for (let index = 0; index < item[this.childField].length; index++) {
          if (item[this.childField][index].select === true) {
            alldeselect = false;
            oneselect = true;
          }
          if (item[this.childField][index].select === false || item[this.childField][index].select === undefined) {
            allselect = false;
          }
          if (item[this.childField][index].select === null) {
            isindeterminate = true;
            alldeselect = false;
            oneselect = true;
            allselect = false;
          }
        }
      }

      if (oneselect || (isindeterminate && !allselect)) {
        item.select = null;
      }
      if (allselect === true) {
        item.select = true;
      }
      if (alldeselect === true) {
        item.select = false;
      }
      if (item.parentNode && item.parentNode[this.childField] && item.parentNode[this.childField].length > 0) {
        this.changeParentSelect(item.parentNode);
      }
    }
  }

  ngOnInit(): void {
    this.onItemClick.subscribe((data: AXTreeSideMenuItemClick) => {
      if (!data.cancel) {
        this.toggleNode(data.item, data.flag);
      }
    });
  }

  itemdbClick(e: MouseEvent, item) {
    if (this.selectionMode == 'single') {
      this.handleOnNodeClick(e, item, true);
    }
  }

  handleOnNodeClick(e: MouseEvent, item, flag = false) {
    this.onItemClick.emit({
      component: this,
      htmlEvent: e,
      item,
      flag
    });
    e.stopPropagation();
    e.preventDefault();
  }

  toggleNode(item, flag = false) {
    //item[this.hasChildField] === false &&
    if (this.selectionMode === 'single' && !flag) {
      if (this.selectionLevel == 'nodes' && item.hasChild == true) {
      } else {
        this.internalSelectItem(item);
      }
    } else {
      if (item[this.hasChildField] == true) {
        item.toggle = !item.toggle;
      }

      if (this.selectionMode === 'single') {
        if (this.selectionLevel == 'nodes' && item.hasChild == true) {
        } else {
          this.internalSelectItem(item);
        }
      }

      if (item[this.hasChildField] === true && item.loaded !== true && this.lazyLoading) {
        this.itemRow = item;
        const uid = Math.floor(Math.random() * 100000000);
        item.requestId = uid;
        this.listLoad.push(item);
        this._contentDataSource.fetch(item);
        this.showLoading(this.itemRow);
      }
      if (item.toggle && item[this.hasChildField] === true) {
        item.open = true;
        this.onItemOpening.emit(this.makeNode(item));
      } else if (!item.toggle && item[this.hasChildField] === true) {
        item.open = false;
        this.onItemClosing.emit(this.makeNode(item));
      }
    }
  }

  ngAfterContentInit(): void {
    this._contentDataSource.fetch(null);
    this._contentDataSource.onDataReceived.subscribe((_data) => {
      if (this.list.length === 0) {
        this.hideLoading(null);
        this.list = _data.data.result;

        this.list.forEach((el) => {
          el.select = false;

          if (this.selectionLevel == 'nodes' && el[this.hasChildField] == true) {
            el.disabledCheckBox = true;
          }

          if (this.selectionLevel == 'parents' && el[this.hasChildField] == false) {
            el.disabledCheckBox = true;
          }

          if (this.seletedKeyFields.length > 0) {
            this.seletedKeyFields.forEach((n: any) => {
              if (n.includes(el[this.keyField])) {
                if (el[this.hasChildField] == true) {
                  //  if (this.selectNodesRecursive) {
                  this.open(el);
                  // }
                } else {
                  this.selectItem(el);
                }
              }
            });
          } else if (this.selectedFieldName != null) {
            if (el[this.hasChildField] == true && el[this.selectedFieldName] == true) {
              // if (this.selectNodesRecursive) {
              this.open(el);
              // }
            } else if (el[this.selectedFieldName] == true) {
              this.selectItem(el);
            }
          }
        });
      } else {
        this.itemRow = this.listLoad.filter((c) => c.requestId === _data.data.requestId)[0];
        this.listLoad = this.listLoad.filter((c) => c.requestId !== _data.data.requestId);
        if (this.itemRow !== undefined) {
          this.hideLoading(this.itemRow);
          const result = _data.data.result;

          if (this.list.length !== 0) {
            if (this.itemRow[this.childField] && this.itemRow[this.childField].length > 0) {
              result.forEach((el) => {
                this.itemRow[this.childField][this.itemRow[this.childField].length] = el;
              });
            } else {
              this.itemRow[this.childField] = result;
            }

            for (let i = 0; i < result.length; i++) {
              if (this.selectionLevel == 'nodes' && result[i][this.hasChildField] == true) {
                result[i].disabledCheckBox = true;
              }

              if (this.selectionLevel == 'parents' && result[i][this.hasChildField] == false) {
                result[i].disabledCheckBox = true;
              }
              if (this.selectionMode !== 'single' && this.selectNodesRecursive) {
                result[i].select = this.itemRow.select === (undefined || null) ? false : this.itemRow.select;

                if (this.itemRow.select === true && this.selectionMode == 'multiple' && result[i][this.hasChildField] === false) {
                  this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] !== result[i][this.keyField]);
                  this.selectedItems.push(result[i]);
                }
              } else {
                result[i].select = false;
              }
              result[i].parentNode = this.itemRow;

              if (this.seletedKeyFields.length > 0) {
                this.seletedKeyFields.forEach((n: any) => {
                  if (n.includes(result[i][this.keyField])) {
                    if (result[i][this.hasChildField] == true) {
                      // if (this.selectNodesRecursive) {
                      this.open(result[i]);
                      // }
                    } else {
                      this.selectItem(result[i]);
                    }
                  }
                });
              } else if (this.selectedFieldName != null) {
                if (result[i][this.hasChildField] == true && result[i][this.selectedFieldName] == true) {
                  // if (this.selectNodesRecursive) {
                  this.open(result[i]);
                  // }
                } else if (result[i][this.selectedFieldName] == true) {
                  this.selectItem(result[i]);
                }
              }
            }

            this.itemRow.loaded = true;
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.selectionMode !== 'single') {
      this.showSelectBox = true;
    }
    this.showContextMenu = true;
  }

  // onItemClick(e, v) {

  // }

  onDragStart(e: Event, v) {
    if (!this.lockedDrag) {
      this.itemDrag = v;
      this.onItemDrag.emit(v);
    }
    e.stopImmediatePropagation();
  }

  onDragEnd(e, v) {
    if (!this.lockedDrag) {
      this.itemDrop = v;
    }
    e.stopImmediatePropagation();
  }

  drop(e) {
    //  this.onItemDrop.emit(this.itemDrop);
    if (!this.lockedDrag) {
      this.validDrop = true;
      this.sameChilde(this.itemDrag, this.itemDrop);
      if (this.validDrop && this.itemDrag[this.keyField] !== this.itemDrop[this.keyField] && this.itemDrag.parentNode !== this.itemDrop) {
        const movedEvent: AXTreeSideMenuItemMovedEvent = new AXTreeSideMenuItemMovedEvent();
        movedEvent.source = this.makeNode(this.itemDrag);
        movedEvent.target = this.makeNode(this.itemDrop);
        this.lockedDrag = true;
        this.showLoading(this.itemDrag);
        this.showLoading(this.itemDrop);
        movedEvent.resolve = (value: boolean) => {
          this.hideLoading(this.itemDrag);
          this.hideLoading(this.itemDrop);
          if (value) {
            this.dragDropItem(this.itemDrag, this.itemDrop);
          } else {
            this.lockedDrag = false;
          }
        };
        this.onItemMoved.emit(movedEvent);
      }
    }

    e.stopImmediatePropagation();
  }

  sameChilde(parent, child) {
    if (parent[this.childField] && parent[this.childField].length > 0) {
      for (let index = 0; index < parent[this.childField].length; index++) {
        if (parent[this.childField][index][this.keyField] == child[this.keyField]) {
          this.validDrop = false;
        }
        if (parent[this.childField][index][this.childField] && parent[this.childField][index][this.childField].length > 0) {
          this.sameChilde(parent[this.childField][index], child);
        }
      }
    } else if (parent[this.keyField] == child[this.keyField]) {
      this.validDrop = false;
    }
  }

  dragDropItem(itemChild, itemParent) {
    if (this.selectionLevel == 'nodes') {
      itemParent.disabledCheckBox = true;
    }

    if (itemChild.parentNode) {
      itemChild.parentNode[this.childField] = itemChild.parentNode[this.childField].filter((c) => c[this.keyField] !== itemChild[this.keyField]);
    } else {
      this.list = this.list.filter((c) => c[this.keyField] !== itemChild[this.keyField]);
    }
    itemChild.parentNode = itemParent;
    if (itemParent[this.childField] && itemParent[this.childField].length > 0) {
      itemParent[this.childField][itemParent[this.childField].length] = itemChild;
    } else {
      itemParent[this.childField] = [];
      itemParent[this.childField][0] = itemChild;
      if (itemParent[this.hasChildField] === true) {
        this.toggleNode(itemParent);
      } else {
        itemParent.toggle = !itemParent.toggle;
        itemParent.loaded = true;
      }
      itemParent[this.hasChildField] = true;
    }
    if (itemChild.parentNode && this.selectionMode !== 'single') {
      this.changeParentSelect(itemChild.parentNode);
    }
    this.lockedDrag = false;
  }

  private listChange(field, value) {
    for (let index = 0; index < this.list.length; index++) {
      this.changeChiled(this.list[index], field, value);
    }
    this.loadAllChildren = false;
  }

  private changeChiled(item, field, value) {
    if (field === 'toggle' && (item.loaded === false || item.loaded === undefined)) {
      if (this.loadAllChildren === true) {
        this.toggleNode(item);
        item[field] = value;
      }
    } else {
      item[field] = value;
      if (field === 'select' && item[this.hasChildField] === false && value === true) {
        this.selectedItems.push(item);
      }
    }
    if (field === 'select') {
      item.indeterminate = false;
    }
    if (item[this.hasChildField] === true && item[this.childField] && item[this.childField].length > 0) {
      item[this.childField].forEach((element) => {
        this.changeChiled(element, field, value);
      });
    }
  }

  private showLoading(item): void {
    item.loading = true;
  }

  private hideLoading(item): void {
    if (item != null) {
      item.loading = false;
    }
  }

  public openAll(loadAll: boolean = false) {
    // if (loadAll) {
    // this.loadAllChildren = true;
    // this.listChange('toggle', true);
    //} else {
    this.listChange('toggle', true);
    // }
  }

  public selectItem(item) {
    if (item['select'] != true) {
      this.internalSelectItem(item, false);
    }
  }

  public open(item) {
    if (item['toggle'] !== true) {
      this.toggleNode(item, true);
    }
  }

  public scrolIntoView(item) {
    let element = document.querySelector(`li[data-id='${item[this.keyField]}']`);
    element.scrollIntoView();
  }

  public closeAll() {
    this.listChange('toggle', false);
  }

  public selectAll() {
    if (this.selectionMode !== 'single') {
      this.listChange('select', true);
    }
  }

  public unSelectAll() {
    if (this.selectionMode !== 'single') {
      this.listChange('select', false);
    }
    this.selectedItems = [];
  }

  public getSelectedNodes(): AXTreeSideMenuNode[] {
    const selectItemsNode = [];
    this.selectedItems.forEach((e) => {
      selectItemsNode.push(this.makeNode(e));
    });
    return selectItemsNode;
  }

  public getSelectedParents(): AXTreeSideMenuNode[] {
    const selectItemsParent = [];
    this.selectedParents.forEach((e) => {
      selectItemsParent.push(this.makeNode(e));
    });
    return selectItemsParent;
  }

  getParentsId(item) {
    let keyFields = [];
    keyFields.push(item[this.keyField]);
    if (item.parentNode) {
      keyFields.push(...this.getParentsId(item.parentNode));
    }
    return keyFields;
  }

  public getSelectedKeyFields() {
    let keyFields = [];
    this.selectedItems.forEach((elm) => {
      var Ids = this.getParentsId(elm);
      if (Ids) {
        keyFields.push(Ids);
      }
    });
    return keyFields;
  }
}
