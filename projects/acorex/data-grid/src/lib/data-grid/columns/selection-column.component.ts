import { AXGridDataColumn } from './column.component';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ax-selection-column',
  template: '',
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridSelectionColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridSelectionColumn extends AXGridDataColumn {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  @Input()
  condition: (params) => boolean;

  @Input()
  pinned: 'start' | 'end' = 'start';

  @Input()
  width: number = 40;

  render() {
    const col = super.render();
    col.checkboxSelection = this.condition ? this.condition : true;
    //  col.headerCheckboxSelection = true;
    col.pinned = this.pinned === 'start' ? 'right' : 'left';
    col.filter = false;
    col.resizable = true;
    col.sortable = false;
    col.minWidth = 5;
    col.width = this.width;
    col.floatingFilter = false;
    return col;
  }
}
