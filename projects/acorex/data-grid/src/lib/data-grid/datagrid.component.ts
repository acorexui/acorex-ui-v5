import {
  Component,
  ContentChild,
  Input,
  ContentChildren,
  QueryList,
  EventEmitter,
  Output,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { AXDataSourceComponent } from '@acorex/components';
import { AXGridDataColumn } from './columns/column.component';
import { AXDataSourceReadParams } from '@acorex/components';
import {
  GridOptions,
  CellClickedEvent,
  RowClickedEvent,
  CellEvent,
  RowEvent,
  FirstDataRenderedEvent,
  GridSizeChangedEvent,
  GridApi
} from 'ag-grid-community';

import { LicenseManager } from 'ag-grid-enterprise';
import { ViewEncapsulation } from '@angular/core';
import { AXGridCellEvent, AXGridRowEvent, AXGridRowSelectionEvent, AXGridRowParams } from './datagrid.events';

import { AXDataGridRowTemplateComponent } from './templates/row-template.component';
import { AXToolbarSearchComponent, AXToolbarComponent, AXDataEvent, AXValueEvent } from '@acorex/components';
import { AXDataGridDetailTemplateComponent } from './templates/detail-template.component';
import { AXTranslator } from '@acorex/core';
import { AXDatePickerFilterComponent } from './columns/date-column.component';
import { AXConfig } from '@acorex/core';

LicenseManager.prototype.validateLicense = function () {
  //console.info('Cracked by Arash Oshnoudi!');
};

// WatermarkComp.prototype.shouldDisplayWatermark = function () {
//   return false;
// }

export class AXDataGridColumnsChangeEvent extends AXValueEvent<AXGridDataColumn[]> {
  component: AXDataGridComponent;
}
export class AXDataGridCellEvent extends AXDataEvent<AXGridCellEvent> {
  component: AXDataGridComponent;
}
export class AXDaagridRowClickEvent extends AXDataEvent<AXGridRowEvent> {
  component: AXDataGridComponent;
}

export class AXDataGridSelectionChangeEvent extends AXDataEvent<AXGridRowSelectionEvent> {
  component: AXDataGridComponent;
}

export class AXDataGridRowSelectionChangeEvent extends AXDataEvent<any> {
  component: AXDataGridComponent;
  selected: boolean;
}

@Component({
  selector: 'ax-data-grid',
  templateUrl: './datagrid.component.html',
  encapsulation: ViewEncapsulation.None
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXDataGridComponent {
  private gridApi;
  private dataSourceSuccessCallback;
  localeText: any;

  gridOptions: GridOptions;
  columnDefs: any[] = [];
  rowModelType = 'clientSide';
  fullWidthCellRendererFramework: any;
  fullWidthCellRendererParams: any;
  frameworkComponents: any = {};
  isFullWidthCell: Function;
  internalHeight: string = '100%';
  detailCellRenderer: any;
  detailCellRendererParams: any;
  detailRowHeight: number;
  masterDetail: boolean = false;
  treeData: boolean = false;
  enabelSelect: boolean = false;
  gridView: boolean = false;
  groupSelectsChildren: boolean = false;
  oldSelectionNodes: any[] = [];
  paginationAutoPageSize: boolean = true;
  paginationPageSize: number = 10;
  cacheBlockSize: number = 10;
  // @Input()
  // showRowNumber: boolean = true;

  @Input()
  public remoteOperation: boolean = false;

  @Input()
  public rowMultiSelectWithClick: boolean = true;

  @Input()
  public suppressRowClickSelection: boolean = true;

  @Input()
  public suppressCellSelection: boolean = false;

  @Input()
  public sizeColumnsToFit: boolean = true;

  @Input()
  showCheckBox: boolean = true;

  @Input()
  floatingFilter: boolean = false;

  // @Input()
  // takeCount: number;

  autoGroupColumnDef: any = {};

  @Input()
  selectionMode: 'single' | 'multiple' = 'single';

  // @Input()
  // allowFiltering: boolean = false;

  @Input()
  pagination:boolean =true;

  @Input()
  selectRow: any[] = [];

  @Input()
  rowGroupPanelShow: 'always' | 'never' = 'never';

  @Input()
  loadOnInit: boolean = true;

  // @Input()
  // groupDefaultExpanded: number = 0;

  @Input()
  keyField: string = 'null';

  @Input()
  hasChildField: string = 'null';

  private _searchText: string;
  @Input()
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(v: string) {
    if (v !== this._searchText) {
      this._searchText = v;
      if (this.gridApi) {
        this.refresh();
        this.gridApi.setQuickFilter(this.searchText);
      }
    }
  }

  private _filter: any[];
  @Input()
  public get filter(): any[] {
    return this._filter;
  }
  public set filter(v: any[]) {
    if (v !== this._filter) {
      this._filter = v;
      this._filter.forEach((f) => {
        const fc = this.gridApi.getFilterInstance(f.field);
        if (fc) {
          const ff = fc.getFrameworkComponentInstance();
          ff.setModel(f);
        }
      });
    }
  }

  @ContentChildren(AXGridDataColumn)
  private _inlineColumns: QueryList<AXGridDataColumn>;

  @Output()
  columnsChange: EventEmitter<AXDataGridColumnsChangeEvent> = new EventEmitter<AXDataGridColumnsChangeEvent>();

  private _columns: AXGridDataColumn[] = [];
  @Input()
  public get columns(): AXGridDataColumn[] {
    return this._inlineColumns ? [...this._columns, ...this._inlineColumns.toArray()] : this._columns;
  }

  public set columns(val: AXGridDataColumn[]) {
    if (val && val.length) {
      let old = this._columns;
      this._columns = val;
      this.columnsChange.emit({ component: this, value: val, oldValue: old, htmlElement: this.ref.nativeElement });
    }
  }

  defaultColDef: any = {
    filter: true,
    floatingFilter: true
  };

  @Input()
  rowHeight: any;

  @ContentChild(AXToolbarSearchComponent, { static: true })
  searchInput: AXToolbarSearchComponent;

  @ContentChild(AXToolbarComponent, { static: true })
  toolbar: AXToolbarComponent;

  @ContentChild(AXDataGridRowTemplateComponent, { static: true })
  rowTemplate: AXDataGridRowTemplateComponent;

  @ContentChild(AXDataGridDetailTemplateComponent, { static: true })
  gridDetailTemplate: AXDataGridDetailTemplateComponent;

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

  @Input()
  groupHideOpenParents: boolean = false;

  @Output()
  cellClick: EventEmitter<AXDataGridCellEvent> = new EventEmitter<AXDataGridCellEvent>();

  @Output()
  cellDbClick: EventEmitter<AXDataGridCellEvent> = new EventEmitter<AXDataGridCellEvent>();

  @Output()
  cellFocuse: EventEmitter<AXDataGridCellEvent> = new EventEmitter<AXDataGridCellEvent>();

  @Output()
  rowClick: EventEmitter<AXDaagridRowClickEvent> = new EventEmitter<AXDaagridRowClickEvent>();

  @Output()
  rowDbClick: EventEmitter<AXDaagridRowClickEvent> = new EventEmitter<AXDaagridRowClickEvent>();

  @Output()
  selectionChanged: EventEmitter<AXDataGridSelectionChangeEvent> = new EventEmitter<AXDataGridSelectionChangeEvent>();

  @Output()
  rowSelectionChange: EventEmitter<AXDataGridSelectionChangeEvent> = new EventEmitter<AXDataGridSelectionChangeEvent>();

  @Output()
  onRowSelectionChanged: EventEmitter<AXDataGridRowSelectionChangeEvent> = new EventEmitter<AXDataGridRowSelectionChangeEvent>();

  getRowHeight(param) {
    if (param.data && param.data.rowHeight && param.node.level == 0) {
      return param.data.rowHeight;
    } else if (this.masterDetail == true && param.node.level == 1) {
      return this.detailRowHeight;
    } else if (this.masterDetail == false && param.data && param.data.rowHeight) {
      return param.data.rowHeight;
    } else {
      return null;
    }
  }

  @Input()
  rowClass?: (params: AXGridRowParams) => (string | string[]) | (string | string[]);

  @Input()
  rtl: boolean = AXConfig.get('layout.rtl');

  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) {
    this.localeText = AXTranslator.get('dataGrid');
  }

  private calcHeight(): void {
    if (this.toolbar) {
      this.internalHeight = `calc(100% - ${40}px)`;
    } else {
      this.internalHeight = '100%';
    }
  }

  private get intenalGridDataSource() {
    const that = this;
    return {
      rowCount: null,
      getRows: (params) => {
        // that.gridApi.gridOptionsWrapper.setProperty('cacheBlockSize', this.takeCount ? this.takeCount : params.api.paginationGetPageSize());
        that.dataSourceSuccessCallback = params.successCallback;
        const loadParams: AXDataSourceReadParams = {};
        loadParams.searchText = that.searchText;
        loadParams.skip = params.request.startRow;
        //  loadParams.take = params.request.endRow - params.request.startRow;
        ////  loadParams.take = that.takeCount ? that.takeCount : params.api.paginationGetPageSize() * 2;

        loadParams.take = params.request.endRow - params.request.startRow;

        loadParams.sort = params.request.sortModel.map((c) => {
          return {
            field: c.colId,
            dir: c.sort
          };
        });
        // loadParams.groups = params.request.rowGroupCols.map(r => r.field);
        // loadParams.groupKeys = params.request.groupKeys;
        // loadParams.data = params.parentNode.data;
        loadParams.group = {
          fields: params.request.rowGroupCols.map((r) => r.field),
          keys: params.request.groupKeys,
          parentData: params.parentNode.data
        };
        loadParams.filter = params.request.filterModel;
        /// setTimeout(() => {
        that.dataSource.fetch(loadParams);
        // }, 5000);
      }
    };
  }
  getMainMenuItems(e) {
    return ['pinSubMenu', 'separator'];
  }

  ngOnDestroy(): void {
    this.gridApi.destroy();
  }

  isServerSideGroup = (e) => {
    return e[this.hasChildField];
  };

  getColumnDefs = () => {
    return this.gridApi.getColumnDefs();
  };

  getCurrentPageNumber = () => {
    return {
      current: this.gridApi.paginationGetCurrentPage() + 1,
      total: this.gridApi.paginationGetTotalPages()
    };
  };

  paginationGoToPage(number) {
    this.gridApi.paginationGoToPage(number - 1);
  }

  getServerSideGroupKey = (e) => {
    return e[this.keyField];
  };
  // todo gridOptions: GridOptions
  internalGridReady(gridOptions) {
    ////  gridOptions.api.checkGridSize();
    //// this.takeCount = this.takeCount ? this.takeCount : gridOptions.api.paginationGetPageSize() * 2;
    //  this.takeCount = this.takeCount < 20 ? 20 : this.takeCount;
    //// gridOptions.api.gridOptionsWrapper.setProperty('cacheBlockSize', this.takeCount);

    this.gridApi = gridOptions.api;

    this.mapColumns();
    this.calcHeight();

    if (!this.loadOnInit) {
      this.loadOnInit = true;
      return;
    }

    if (this.remoteOperation) {
      this.gridApi.setServerSideDatasource(this.intenalGridDataSource);
    }

    if (!this.remoteOperation) {
      this.refresh();
    }
  }

  ngAfterContentInit(): void {
    const that = this;
    if (this.rowTemplate) {
      this.fullWidthCellRendererFramework = this.rowTemplate.renderer;
      this.fullWidthCellRendererParams = this.rowTemplate.params;
    }
    this.frameworkComponents.agDateInput = AXDatePickerFilterComponent;

    if (this.gridDetailTemplate) {
      this.masterDetail = true;
      this.detailCellRendererParams = this.gridDetailTemplate.params;
      this.detailCellRenderer = 'detailRendererFramework';
      this.frameworkComponents.detailRendererFramework = this.gridDetailTemplate.renderer;

      this.detailRowHeight = this.gridDetailTemplate.height;
    }
    this.isFullWidthCell = () => {
      return that.rowTemplate != null;
    };
    //this.cdr
  }

  ngOnInit(): void {
    // if (this.takeCount && this.takeCount > 0) {
    //   this.paginationPageSize = this.takeCount;
    //   this.paginationAutoPageSize = false;
    //   this.cacheBlockSize = this.takeCount;
    // }
    if (this.selectionMode === 'single') {
      this.groupSelectsChildren = false;
    }
    if (this.keyField !== 'null' && this.hasChildField !== 'null') {
      this.rowGroupPanelShow = 'never';
      this.treeData = true;
    }
    if (this.remoteOperation) {
      this.rowModelType = 'serverSide';
    }
    //
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
    //
  }

  gridSelectRow() {
    if (this.gridApi) {
      if (this.selectRow && this.selectRow.length > 0 && this.gridApi !== undefined && typeof this.selectRow[0] != 'object') {
        this.gridApi.forEachNode((node) => {
          if (node.data !== undefined) {
            let select: boolean = false;
            this.selectRow.forEach((id) => {
              if (node.data[this.keyField] === id) {
                select = true;
                node.setSelected(select);
              }
            });
          }
        });
      } else {
        this.gridApi.forEachNode((node) => {
          if (node.data !== undefined) {
            let select: boolean = false;
            this.selectRow.forEach((item) => {
              if (item.rowIndex != undefined && item.rowLevel != undefined) {
                if (node.data[this.keyField] === item.data[this.keyField]) {
                  select = true;
                }
              } else {
                if (node.data[this.keyField] === item[this.keyField]) {
                  select = true;
                }
              }
            });
            node.setSelected(select);
          }
        });
      }
    }
  }

  // ngAfterViewChecked(): void {

  //   //Called after every check of the component's view. Applies to components only.
  //   //Add 'implements AfterViewChecked' to the class.
  //   // this.selectByValues();
  //   this.enabelSelect = false;

  // }
  rebuildGrid() {
    this.mapColumns();
    setTimeout(() => {
      if (this.sizeColumnsToFit) {
        this.gridApi.sizeColumnsToFit();
      }
    }, 10);
  }

  ngAfterViewInit(): void {
    if (this.treeData === true) {
      this.columnDefs = this.columns.map((c) => c.render());

      const groupColumn = this.columnDefs.find((c) => c.rowGroupIndex == '0' && c.field !== '');

      this.autoGroupColumnDef = {
        headerName: groupColumn.headerName,
        width: groupColumn.width,
        cellRendererParams: { checkbox: this.showCheckBox },
        field: groupColumn.field
      };

      this.columnDefs.forEach((elm) => {
        if (elm.rowGroupIndex > -1) {
          elm.hide = true;
        }
      });
    }
    //setTimeout(() => {
    this.gridView = true;
    //});

    this.enabelSelect = true;
    this.dataSource.onDataReceived.subscribe((_data) => {
      const result = _data.data.result;
      this.hideLoading();
      let items: any[];
      let totalCount: number;
      if (Array.isArray(result)) {
        items = result;
        totalCount = result.length;
      } else {
        items = result.items;
        totalCount = result.totalCount;
      }
      if (this.dataSourceSuccessCallback) {
        if (!this.loadOnInit) {
          this.dataSourceSuccessCallback([], 0);
        } else {
          this.dataSourceSuccessCallback(items, totalCount);
        }
      } else {
        if (!this.loadOnInit && this.gridApi !== undefined) {
          this.gridApi.setRowData([]);
        } else if (this.gridApi !== undefined) {
          this.gridApi.setRowData(items);
        }
      }

      this.gridSelectRow();
    });

    this.dataSource.onFetchStart.subscribe(() => {
      this.showLoading();
    });

    if (this.searchInput) {
      this.searchInput.onValueChanged.subscribe((c) => {
        this.searchText = c.value;
      });
    }
    //
    this.cdr.detectChanges();
  }

  mapColumns() {
    this.columnDefs = this.columns.map((c) => c.render());

    // if (this.showRowNumber) {
    //   this.columnDefs.push({
    //     headerName: AXConfig.get('layout.rtl') ? 'ردیف' : 'Row',
    //     valueGetter: 'node.rowIndex + 1',
    //     pinned: AXConfig.get('layout.rtl') ? 'right' : 'left'
    //   });
    // }

    if (this.gridDetailTemplate) {
      if (this.columnDefs[0].checkboxSelection === true && this.columnDefs[0].field === '') {
        this.columnDefs[1].cellRenderer = 'agGroupCellRenderer';
      } else {
        this.columnDefs[0].cellRenderer = 'agGroupCellRenderer';
      }
    }

    if (this.hasChildField === 'null') {
      const groupColumn = this.columnDefs.find((c) => c.rowGroupIndex === undefined && c.field !== '');
      if (groupColumn && this.groupHideOpenParents == false) {
        this.autoGroupColumnDef = {
          headerName: groupColumn.headerName,
          width: groupColumn.width,
          cellRendererParams: { checkbox: this.showCheckBox },
          field: groupColumn.field
        };
        //  groupColumn.hide = true;
      }
    }

    this.columnDefs.forEach((elm) => {
      if (elm.rowGroupIndex > -1) {
        elm.hide = true;
      }
    });
  }

  displayedColumnsChanged(e) {
    if (this.hasChildField === 'null') {
      const ee = e.columnApi.getAllDisplayedColumnGroups();
      const eee = ee.find((c) => c.colId !== 'ag-Grid-AutoColumn' && c.colId !== '0');
      if (eee && eee.colId) {
        this.autoGroupColumnDef = {
          headerName: eee.colDef.headerName,
          width: eee.colDef.width,
          cellRendererParams: { checkbox: this.showCheckBox },
          field: eee.colDef.field
        };
      }
      // eee.hide = true;
    }
  }

  refresh(route: any[] = []) {
    if (this.remoteOperation && this.gridApi !== undefined) {
      //  this.gridApi.purgeServerSideCache(route);
      this.gridApi.setServerSideDatasource(this.intenalGridDataSource);
    } else {
      // TODO : check fetch param
      this.dataSource.fetch(null);
    }
  }

  internalGridCellClicked(e: CellClickedEvent) {
    this.cellClick.emit({ data: this.mapCellEvent(e), component: this, htmlElement: this.ref.nativeElement });
  }

  internalGridCellDoubleClicked(e: CellClickedEvent) {
    this.cellDbClick.emit({ data: this.mapCellEvent(e), component: this, htmlElement: this.ref.nativeElement });
  }

  internalGridCellFocused(e: CellClickedEvent) {
    this.cellFocuse.emit({ data: this.mapCellEvent(e), htmlElement: this.ref.nativeElement, component: this });
  }

  internalGridRowClicked(e: RowClickedEvent) {
    if (!e.node.group) {
      this.rowClick.emit({ data: this.mapRowEvent(e), component: this, htmlElement: this.ref.nativeElement });
    }
  }

  internalGridRowDoubleClicked(e: CellClickedEvent) {
    if (!e.node.group) {
      this.rowDbClick.emit({ data: this.mapRowEvent(e), htmlElement: this.ref.nativeElement, component: this });
    }
  }

  differenceOf2Arrays(array1: any, array2: any) {
    const temp = [];
    for (const i in array1) {
      if (array2.indexOf(array1[i]) === -1) {
        temp.push(array1[i]);
      }
    }
    for (const i in array2) {
      if (array1.indexOf(array2[i]) === -1) {
        temp.push(array2[i]);
      }
    }
    return temp.sort((a, b) => a - b);
  }

  rowSelectionChanged(e) {
    // this.gridApi.forEachNode((node) => {
    //   if (node.data[this.keyField] == e.node.data[this.keyField]) {
    //     node.setSelected(e.node.selected);
    //   }
    // });
    if (e.node.selected == true) {
      this.selectRow = this.selectRow.filter((c) => c[this.keyField] != e.data[this.keyField]);
      this.selectRow.push(e.data);
    } else {
      this.selectRow = this.selectRow.filter((c) => c[this.keyField] != e.data[this.keyField]);
    }
    this.rowSelectionChange.emit({ component: this, data: e, htmlElement: this.ref.nativeElement });
  }

  internalGridSelectionChanged(e) {
    const args: AXGridRowSelectionEvent = { items: [] };
    const oldNodes = this.oldSelectionNodes;
    const nodes = this.gridApi.getSelectedNodes();
    nodes.forEach((i) => {
      args.items.push({
        rowLevel: i.level,
        rowIndex: i.rowIndex,
        data: i.data
      });
    });
    this.selectionChanged.emit({ data: args, component: this, htmlElement: this.ref.nativeElement });
    let action = nodes.length > oldNodes.length ? true : false;
    const node = this.differenceOf2Arrays(nodes, oldNodes);
    this.onRowSelectionChanged.emit({ component: this, selected: action, data: node, htmlElement: this.ref.nativeElement });
    this.oldSelectionNodes = nodes;
  }

  private mapCellEvent(e: CellEvent): AXGridCellEvent {
    return {
      rowLevel: 0,
      column: e.column,
      data: e.data,
      rowIndex: e.rowIndex,
      value: e.value
    };
  }

  private mapRowEvent(e: RowEvent): AXGridRowEvent {
    return {
      rowLevel: 0,
      data: e.data,
      rowIndex: e.rowIndex
    };
  }

  public deselectAll() {
    this.gridApi.deselectAll();
  }


public deselectByKeyField(keyField){

  this.gridApi.forEachNode((node) => {
    if (node.data !== undefined) {
      let select: boolean = false;
      if(node.data[this.keyField] === keyField){
        node.setSelected(select);
        this.selectRow = this.selectRow.filter((c)=>c[this.keyField] != keyField)
      }
    }
  });

}

  internalGetRowClass = (p: any) => {
    if (this.rowClass) {
      if (this.rowClass instanceof Function) {
        return this.rowClass({
          rowIndex: p.node.rowIndex,
          rowLevel: p.node.level,
          data: p.data
        });
      } else {
        return this.rowClass;
      }
    }
  };

  showLoading(): void {
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
    }
  }

  hideLoading(): void {
    if (this.gridApi) {
      this.gridApi.hideOverlay();
    }
  }

  internalGridSizeChanged(e: GridSizeChangedEvent) {
    if (e.clientWidth > 0 && e.clientHeight > 0) {
      this.performSizeColumnsToFit(e.api);
    }
    //  this.refresh();
    //  this.gridApi.paginationGoToFirstPage();
  }

  internalGridFirstDataRendered(e: FirstDataRenderedEvent) {
    this.performSizeColumnsToFit(e.api);
  }

  private performSizeColumnsToFit(api: GridApi) {
    if (this.sizeColumnsToFit) {
      api.sizeColumnsToFit();
    }
  }
}
