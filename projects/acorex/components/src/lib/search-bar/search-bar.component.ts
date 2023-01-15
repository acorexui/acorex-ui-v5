import { AXConfig, AXDateTime } from '@acorex/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as _ from 'lodash';
import { AXElementSize } from '../base/element.class';
import { AXPopoverComponent } from '../popover/popover.component';
import { AXPropertyEditorRendererDirective } from '../property-editor/property-editor-renderer.directive';
import { AXPropertyColDef, AXPropertyConfig, AXProperyEditorValueChangeEvent, FilterModel } from '../property-editor/property-editor.class';
import { AXValidationFormComponent } from '../validation/validation-form.component';

export interface FilterTextItemsModel {
  name: string;
  title: string;
  value: any;
  textValue: string;
  filterOptions?: FilterModel;
  component: AXPropertyConfig;
  uniqueNumber?: number;
}

@Component({
  selector: 'ax-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class AXSearchBarComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('searchPop') searchPopover: AXPopoverComponent;
  @ViewChildren(AXPropertyEditorRendererDirective) _editors: QueryList<AXPropertyEditorRendererDirective>;
  @ViewChild(AXValidationFormComponent) form: AXValidationFormComponent;

  @Input()
  size: AXElementSize = 'md';

  @Input()
  disabled: boolean = false;

  @Input()
  fitParent: boolean = false;

  @Input()
  popoverWidth: string = '60%';

  @Input()
  rtl: boolean = AXConfig.get('layout.rtl');

  @Input()
  loadOnInit: boolean = false;

  @Input()
  public set items(v: AXPropertyConfig[]) {
    this._defultValueCount = v.filter((x) => x.value);
    v.forEach((el) => {
      el.property.uniqueNumber = Math.random();
      if (el.value != null) {
        this._filterItems.push({
          name: el.property.name,
          title: el.property.title,
          textValue: this._handleTextValue(el),
          value: el.value ? this._handleDefultVlaue(el) : null,
          component: el
        });
      }
    });
    this._items = _.chain(v)
      .groupBy((x) => x.property.row)
      .map((value, key) => ({ row: key, items: value }))
      .value();
  }

  @Output()
  onValueChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onSearchValue: EventEmitter<FilterTextItemsModel[]> = new EventEmitter();

  _items: any[] = [];
  _filterItems: FilterTextItemsModel[] = [];
  _filterItemsClone: FilterTextItemsModel[] = [];
  _defultValueCount: any = [];
  _context: any = {};
  _isEmitted: boolean = false;
  public clearItem(name: string) {
    this._editors.find((x) => x.property.property.name === name).clear();
  }

  public refresh() {
    this.loadOnInit = true;
    this._defultValueCount = [];
    this._filterItems = [];
    this._filterItemsClone = [];
    this.items = this._items[0].items;
    this.cdr.detectChanges();
  }

  handleButtonClick() {
    this.searchPopover.open();
  }

  async handleValueChange(e: AXProperyEditorValueChangeEvent) {
    await this._handleInitVlaue(e);
    this.onValueChange.emit(e);
  }

  handleItemRemoveClick(item: FilterTextItemsModel) {
    this._editors.forEach((e) => {
      if (e.property.property.name == item.name) {
        e.clear();
      }
    });
    this._filterItems = this._filterItems.filter((el) => el.name != item.name);
  }

  public search() {
    this.form.validate().then((c) => {
      if (c.result) {
        this._filterItems = JSON.parse(JSON.stringify(this._filterItemsClone.filter((el) => el.value != null && el.value != '')));
        this.searchPopover.close();
        this.onSearchValue.emit(this._filterItems);
      }
    });
  }

  clear() {
    this._editors.forEach((e) => {
      e.clear();
    });
    this._filterItems = [];
    this._filterItemsClone = [];
    this.searchPopover.close();
    this.onSearchValue.emit(this._filterItems);
  }

  renderCol(e: number | AXPropertyColDef) {
    let className: string[] = [];
    if (typeof e == 'number') {
      className.push(`col-${e}`);
    } else {
      for (const key in e) {
        switch (key) {
          case 'lg':
            className.push(`col-lg-${e[key]}`);
            break;
          case 'md':
            className.push(`col-md-${e[key]}`);
            break;
          case 'sm':
            className.push(`col-sm-${e[key]}`);
            break;
          case 'xs':
            className.push(`col-xs-${e[key]}`);
            break;
        }
      }
    }
    return className.toString().replace(/,/g, ' ');
  }

  _handleShowTitleSelected(item) {
    if (item.title) {
      return item.title + ':';
    }
  }

  _handleShowValueSelected(item) {
    if (item.component.property.editorClass === 'ax/editors/check') {
      return item.component.property.editorOptions.label;
    } else {
      return item.textValue;
    }
  }

  private _handleTextValue(dataItem: any) {
    let text = '';
    if (Array.isArray(dataItem.value)) {
      if (dataItem.value.length) {
        dataItem.value.forEach((element, index) => {
          text +=
            index === dataItem.value.length - 1
              ? element[dataItem.property.editorOptions.textField]
              : element[dataItem.property.editorOptions.textField] + ',';
        });
      }
      return text;
    } else if (dataItem.property.editorClass === 'ax/editors/date') {
      if (dataItem.value) {
        return new AXDateTime(dataItem.value, 'jalali').format('yyyy/MM/DD');
      } else {
        return;
      }
    } else {
      return;
    }
  }

  private async _handleDefultVlaue(dataItem: any) {
    await this._handleInitVlaue(dataItem);
    this._filterItems = JSON.parse(JSON.stringify(this._filterItemsClone.filter((el) => el.value != null && el.value != '')));
    if (this._filterItems.length === this._defultValueCount.length && this.loadOnInit && !this._isEmitted) {
      this._isEmitted = true;
      this.onSearchValue.emit(this._filterItems);
    }
  }

  private async _handleInitVlaue(e) {
    let value = [];
    let text: any = [];
    if (e.property.editorOptions?.valueField && e.value != null) {
      if (e.property.editorOptions.returnAllData) {
        value = e.value;
        text = await this._handleTextValue(e);
      } else if (e.property.editorOptions?.mode == 'multiple') {
        e.value.forEach((element) => {
          value.push(element[e.property.editorOptions.valueField]);
          text.push(element[e.property.editorOptions.textField]);
        });
      } else {
        if (e.value.length) {
          value = e.value[0][e.property.editorOptions.valueField];
          text = e.value[0][e.property.editorOptions.textField];
        }
      }
    } else {
      value = e.value;
      text = e.value;
    }
    const findEl = this._filterItemsClone.find((el) => el.uniqueNumber == e.property.uniqueNumber);
    if (findEl) {
      findEl.value = value;
      findEl.textValue = e.property.editorClass === 'ax/editors/date' ? new AXDateTime(text, 'jalali').format('yyyy/MM/DD') : text;
    } else if (e.value != null) {
      this._filterItemsClone.push({
        name: e.property.name,
        title: e.property.title,
        uniqueNumber: e.property.uniqueNumber,
        value,
        textValue: e.property.editorClass === 'ax/editors/date' ? new AXDateTime(text, 'jalali').format('yyyy/MM/DD') : text,
        component: e,
        filterOptions: {
          filters: e.property?.filterOptions?.filters ? e.property.filterOptions.filters : [],
          logic: e.property?.filterOptions?.logic ? e.property.filterOptions.logic : 'and',
          ignoreCase: e.property?.filterOptions?.ignoreCase ? e.property.filterOptions.ignoreCase : true,
          joinType: e.property?.filterOptions?.joinType ? e.property.filterOptions.joinType : 'INNER',
          operator: e.property?.filterOptions?.operator ? e.property.filterOptions.operator : null,
          truncateDate: e.property?.filterOptions?.truncateDate ? e.property.filterOptions.truncateDate : true
        }
      });
    }
  }
}
