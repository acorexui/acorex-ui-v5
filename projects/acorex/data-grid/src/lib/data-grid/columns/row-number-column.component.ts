import { AXGridDataColumn } from './column.component';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AXConfig } from '@acorex/core';

@Component({
  selector: 'ax-row-number-column',
  template: '',
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridRowNumberColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridRowNumberColumn extends AXGridDataColumn {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  @Input()
  condition: (params) => boolean;

  render() {
    const col = super.render();
    //  col.checkboxSelection = this.condition ? this.condition : true;
    //  col.headerCheckboxSelection = true;

    (col.headerName = this.caption ? this.caption : AXConfig.get('layout.rtl') ? 'ردیف' : 'Row'),
      (col.valueGetter = 'node.rowIndex + 1'),
      (col.pinned = this.pinned == null ? null : this.pinned === 'start' ? 'right' : 'left'),
      (col.filter = false);
    col.resizable = true;
    col.sortable = false;
    col.width = this.width;

    return col;
  }
}
