import { AXGridDataColumn } from './column.component';
import { ChangeDetectionStrategy, Component, Input, EventEmitter, ViewEncapsulation, Output, ChangeDetectorRef } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { AXGridRowCommandEvent } from '../datagrid.events';
import { AXMenuItem } from '@acorex/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

export type AXGridRowCommandFunction = (row: any) => AXMenuItem[];

@Component({
  selector: 'ax-command-column',
  template: '',
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridCommandColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AXGridCommandColumn extends AXGridDataColumn {
  @Input()
  items: AXMenuItem[] | AXGridRowCommandFunction = [];

  @Output()
  onItemClick: EventEmitter<AXGridRowCommandEvent> = new EventEmitter<AXGridRowCommandEvent>();

  render() {
    const col = super.render();
    if (!col.cellRendererFramework) {
      col.cellRendererFramework = CommandRenderer;
    }
    col.cellRendererParams = {
      items: this.items,
      onClick: (e) => {
        this.onItemClick.emit({
          command: e.name,
          data: e.data,
          rowIndex: e.rowIndex,
          rowLevel: e.rowLevel,
          htmlEvent: e.htmlEvent
        });
      }
    };
    col.sortable = false;
    col.filter = false;
    col.valueGetter = (params) => {
      return this.items;
    };
    return col;
  }
}

@Component({
  selector: 'ax-command-cell',
  template: `
    <button
      *ngFor="let item of items; let i = index"
      class="ax button md ax-grid-command-button {{ item.style || 'ax primary blank' }}"
      [class.disabled]="item.disable"
      type="button"
      [title]="item.tooltip"
      [attr.tabindex]="i"
      (click)="onClick(item, $event)"
    >
      <i [ngClass]="item.icon"></i>{{ item.text }}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandRenderer implements ICellRendererAngularComp {
  items: AXMenuItem[] | AXGridRowCommandFunction = [];
  node: any;
  private clickCallback: Function;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.mapParams(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.mapParams(params);
    return true;
  }

  private mapParams(params: any) {
    this.node = params.node;
    this.items = typeof params.items == 'function' ? params.items({ data: this.node.data }) : Array.isArray(params.items) ? params.items : [];
    this.clickCallback = params.onClick;
  }

  onClick(item: AXMenuItem, e: MouseEvent) {
    if (this.clickCallback && !item.disable) {
      this.clickCallback({
        name: item.name,
        rowLevel: this.node.level,
        rowIndex: this.node.rowIndex,
        data: this.node.data,
        htmlEvent: e
      });
    }
  }
}
