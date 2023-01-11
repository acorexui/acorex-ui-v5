import { Component, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXDataGridComponent, AXDataGridSelectionChangeEvent } from '../../data-grid/datagrid.component';
import { AXGridDataColumn } from '../../data-grid/columns/column.component';
import { AXTranslator, AXButtonItem, AXConfig } from '@acorex/core';
import {
  AXToolbarSearchComponent,
  AXBasePopupPageComponent,
  AXMenuItemClickEvent,
  AXDataSourceComponent,
  AXDataSourceReadParams
} from '@acorex/components';

@Component({
  templateUrl: './data-lov-popup.component.html'
})
export class AXDataLovPopupComponent extends AXBasePopupPageComponent {
  @ViewChild('grid', { static: true })
  grid: AXDataGridComponent;

  @ViewChild('searchBox')
  searchBox: AXToolbarSearchComponent;

  columns: AXGridDataColumn[] = [];

  selectedItems: any[] = [];

  keyField: string = '';
  allowNull: boolean = true;

  hasChildField: string;
  rtl: boolean = AXConfig.get('layout.rtl');

  selectedRows: any[] = [];
  pagination:boolean =true;
  constructor(private cdr: ChangeDetectorRef, private ref: ElementRef) {
    super();
  }

  dataSource: AXDataSourceComponent;

  selectionMode: string;

  ngOnInit(): void {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
  }

  onDoneClick() {
    if (this.selectedItems) {
      this.close(this.selectedItems);
    } else {
      this.close();
    }
  }

  rowDoubleClicked(e) {
    if (this.selectionMode == 'single') {
      this.selectedItems = [];
    }

    this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] != e.data.data[this.keyField]);
    this.selectedItems.push(e.data.data);

    this.onDoneClick();
  }

  onCancelClick() {
    this.close();
  }

  rowSelectionChange(e) {
    if (e.data.node.selected == true) {
      this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] != e.data.node.data[this.keyField]);
      this.selectedItems.push(e.data.node.data);
    } else {
      if (this.allowNull == true || (this.allowNull == false && this.selectedItems.length > 1)) {
        this.selectedItems = this.selectedItems.filter((c) => c[this.keyField] != e.data.node.data[this.keyField]);
      }
    }
  }

  ngAfterViewInit() {
    this.selectedItems.forEach((ele) => {
      this.selectedRows.push(ele);
    });
    this.searchBox.focus();
    if (this.dataSource.onDataReceived) {
      this.dataSource.onDataReceived.subscribe((arg) => {
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });
    }
  }

  // onValueSearchChanged(e) {

  //     const params: AXDataSourceReadParams = {}
  //     params.searchText = e.value;
  //     // params.take = 100;
  //     // params.skip = 0
  //     this.dataSource.fetch(params);
  // }

  getFooterButtons(): AXButtonItem[] {
    return [
      {
        text: AXTranslator.get('common.confirm'),
        name: 'confirm',
        style: 'ax primary',
        icon: 'far fa-check-circle'
      },
      {
        text: AXTranslator.get('common.cancel'),
        name: 'cancel',
        style: 'ax light',
        icon: 'far fa-times'
      }
    ];
  }

  onFooterButtonClick(e: AXMenuItemClickEvent) {
    if (e.name === 'confirm') {
      this.onDoneClick();
    }
    if (e.name === 'cancel') {
      this.onCancelClick();
    }
  }
}
