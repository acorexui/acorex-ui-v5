import { AXConfig } from '@acorex/core';
import { Input, ContentChild, TemplateRef, Directive } from '@angular/core';
import { AXGridCellParams } from '../datagrid.events';
import { AXDataGridCellTemplateComponent } from '../templates/cell-template.component';
import { AXDatePickerFilterComponent } from './date-column.component';


@Directive()
export abstract class AXGridDataColumn {


    @ContentChild(AXDataGridCellTemplateComponent)
    cellTemplate: AXDataGridCellTemplateComponent;

    @Input()
    width: number = 100;

    @Input()
    maxWidth: number;

    @Input()
    minWidth: number;

    @Input()
    pinned: 'start' | 'end' | null = null;

    @Input()
    allowSorting: boolean = true;

    @Input()
    allowFiltering: boolean = AXConfig.get('datagrid.allowFiltering') || false;;

    @Input()
    cellClass: (params: AXGridCellParams) => (string | string[]) | (string | string[]);

    @Input()
    sort: 'asc' | 'desc' | null = null;

    @Input()
    field: string = '';

    @Input()
    caption: string = '';

    @Input()
    cellRendererParams: any;

    @Input()
    checkbox: boolean = false;

    @Input()
    headerCheckbox: boolean = false;

    @Input()
    groupIndex: number = -1;

    @Input()
    treeIndex: number = -1;

    @Input()
    enableRowGroup: boolean = false;

    @Input()
    hide: boolean = false;

    @Input()
    floatingFilter: boolean = AXConfig.get('datagrid.floatingFilter') || false;

    @Input()
    disableMenu: boolean = false;

    @Input()
    resizable: boolean = true;

    @Input()
    menuColumnDisable: boolean = false;

    @Input()
    menuItemDisable: boolean = false;

    constructor() { }

    render(): any {
        const col: any = {
            field: this.field,
            width: this.width,
        };
        col.resizable = this.resizable;
        col.suppressMenu = this.disableMenu;
        col.menuTabs = ['filterMenuTab', 'columnsMenuTab', 'generalMenuTab']
        col.floatingFilter = this.floatingFilter;

        if (!this.allowFiltering) {
            col.filter = false;
            col.menuTabs = col.menuTabs.filter(c => c != 'filterMenuTab');
            col.floatingFilter = false;
        }
        if (this.menuColumnDisable == true) {
            col.menuTabs = col.menuTabs.filter(c => c != 'columnsMenuTab');
        }
        if (this.menuItemDisable == true) {
            col.menuTabs = col.menuTabs.filter(c => c != 'generalMenuTab');
        }
        if (this.caption) {
            col.headerName = this.caption;
        }
        if (this.minWidth) {
            col.minWidth = this.minWidth;
        }
        if (this.maxWidth) {
            col.maxWidth = this.maxWidth;
        }
        if (this.pinned) {
            col.pinned = this.pinned === 'start' ? 'right' : 'left';
            // TODO: Change based on layout
        }
        if (this.allowSorting) {
            col.sortable = this.allowSorting;
        }
        if (this.sort) {
            col.sort = this.sort;
        }

        if (this.groupIndex >= 0) {
            col.rowGroupIndex = this.groupIndex;
            col.rowGroup = true;
            this.enableRowGroup = true;
        }

        if (this.treeIndex >= 0) {
            col.rowGroupIndex = this.treeIndex;
            col.rowGroup = false;
        }
        if (this.hide) {
            col.hide = true;

        }
        if (this.enableRowGroup) {
            col.enableRowGroup = this.enableRowGroup;
        }

        if (this.cellClass) {
            const THAT = this;
            if (this.cellClass instanceof Function) {
                col.cellClass = (p) => {
                    return THAT.cellClass({
                        column: THAT,
                        rowIndex: p.node.rowIndex,
                        rowLevel: p.node.level,
                        data: p.data,
                        value: p.value
                    });
                };
            }
            else {
                col.cellClass = this.cellClass;

            }
        }
        //
        if (this.cellTemplate != null) {
            col.cellRendererFramework = this.cellTemplate.renderer;
            col.cellRendererParams = this.cellTemplate.params;
        }

        if (this.checkbox) {
            col.checkboxSelection = (params) => {
                return true;
            };
            //  col.headerCheckboxSelection = this.headerCheckbox;
        }
        return col;
    }
}








