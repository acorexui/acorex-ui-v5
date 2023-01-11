import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { AXSelectionList } from '@acorex/core';
import { AXBaseComponent, AXBaseSizableComponent, AXBaseValueComponent, AXElementSize, AXValidatableComponent } from '../base/element.class';

@Component({
  selector: 'ax-selection-list',
  templateUrl: './selection-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXSelectionListComponent extends AXValidatableComponent implements AXBaseSizableComponent, AXBaseComponent {
  private _selectedItems: any[] = [];

  @Input()
  readonly: boolean;

  @Input()
  value: boolean;

  @Input()
  disabled: boolean;

  @Input()
  size: AXElementSize = 'md';

  @Input()
  direction: string = 'horizontal';

  @Input()
  items: Array<AXSelectionList> = [];

  @Input()
  mode: string = 'single';

  @Input()
  textField: string = 'text';

  @Input()
  valueField: string = 'value';

  @Output()
  selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();


  @Input()
  public get selectedItems(): any[] {
    return this._selectedItems || [];
  }
  public set selectedItems(v: any[]) {
    this._selectedItems = v;
    this.selectedItemsChange.emit(this.selectedItems);
    this.cdr.detectChanges();
  }

  @Output()
  selectedValuesChange: EventEmitter<any[]> = new EventEmitter<any[]>();


  @Input()
  public get selectedValues(): any[] {
    return this._selectedItems.map((c) => c[this.valueField]) || [];
  }
  public set selectedValues(v: any[]) {
    const old = this.selectedValues;
    if (v == null) {
      v = [];
    }
    if (JSON.stringify(old) != JSON.stringify(v)) {
      this.selectedItems = this.items.filter((c) => v.includes(c[this.valueField]));
      this.selectedValuesChange.emit(this.selectedValues);
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  onCheckValueChange(value: any, checked: boolean) {
    if (!this.disabled) {
      if (this.mode === 'single') {
        this.selectedValues = [value];
      } else {
        if (checked) {
          if (!this.selectedValues.includes(value)) {
            this.selectedValues = [...this.selectedValues, ...[value]];
          }
        } else {
          this.selectedValues = this.selectedValues.filter((c) => c !== value);
        }
      }
    }
  }
  focus(): void { }

  onvalueChanged(e) {
    if (!this.disabled) {
      this.selectedItemsChange.emit([e]);
    }
  }


  checkBoxClick(e, data) {
    debugger
    this.selectionChanged.emit({ valueField: data[this.valueField], value: e.value });
  }

}
