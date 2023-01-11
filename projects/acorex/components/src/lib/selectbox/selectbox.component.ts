import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  ContentChild,
  NgZone,
  QueryList,
  ContentChildren,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXTextBoxComponent } from '../textbox/textbox.component';
import { AXDropdownComponent } from '../dropdown/dropdown.component';
import { AXBaseSizableComponent, AXBaseInputComponent, AXElementSize, AXValidatableComponent } from '../base/element.class';
import { AXDataSourceComponent } from '../data-source/datasource.component';
import { AXValidation } from '../validation/validation.component';
import { AXDataSourceReadParams } from '../data-source/read-param';
import { AXBaseEvent } from '../base/events.class';
import { AXSearchBoxComponent } from '../searchbox/searchbox.component';
import { AXConfig } from '@acorex/core';
import { differenceBy } from 'lodash';
export class AXSelectBoxSelectionChangedEvent extends AXBaseEvent {
  constructor(component: any, public selectedItems: any[], public selectedValues: any[] | any) {
    super();
    this.component = component;
  }
}

@Component({
  selector: 'ax-select-box',
  templateUrl: './selectbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'width: 100%' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXSelectBoxComponent }]
})
export class AXSelectBoxComponent extends AXValidatableComponent implements AXBaseSizableComponent, AXBaseInputComponent {
  @Input() showDropDownButton: boolean = true;

  @ContentChild(TemplateRef, { static: true })
  rowTemplate: TemplateRef<any>;

  @Input()
  rowInputTemplate: TemplateRef<any>;
  @ViewChild(AXTextBoxComponent, { static: true })
  span: ElementRef<HTMLElement>;

  @ViewChild(AXTextBoxComponent, { static: true })
  textbox: AXTextBoxComponent;

  @ViewChild('listContainer', { static: true })
  listContainer: ElementRef<HTMLDivElement>;

  @ViewChild('serchBox', { static: false })
  serchBox: AXSearchBoxComponent;

  @ViewChild('textBoxSelectBox', { static: true })
  textBoxSelectBox: AXTextBoxComponent;

  @Input() showCheckBox: boolean = true;

  @Input() readonly: boolean = false;

  @Input() rtl: boolean = AXConfig.get('layout.rtl');

  @Input() disabled: boolean = false;

  @Input() placeholder: string;

  @Input() size: AXElementSize = 'md';

  @Input() allowNull: boolean = true;

  @Input() textAlign: 'right' | 'left' | null = null;

  @Input() bufferSize: number = 20;

  @Input() remoteOperation: boolean = false;

  @Input() fitParent: boolean = true;

  @Input() dropdownWidth: string = '300px'

  @Output()
  dropdownToggle: EventEmitter<any> = new EventEmitter<any>();
  // this input is Private and only use in LOV

  currentfocusedIndex: number = -1;
  showLoading: boolean = false;

  skip: number = -1;
  searchText: string = '';
  // @Input()
  // chipsWidth: string = '';

  text: string = '';
  totalCount: number = 0;

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

  @ContentChild(AXValidation, { static: true })
  private _contentValidation: AXValidation;

  private _validation: AXValidation;

  @Input()
  public get validation(): AXValidation {
    return this._validation ? this._validation : this._contentValidation;
  }

  public set validation(v: AXValidation) {
    this._validation = v;
  }

  constructor(private cdr: ChangeDetectorRef, private ref: ElementRef, private zone: NgZone) {
    super();
  }

  @ViewChild('d', { static: true })
  dropdown: AXDropdownComponent;

  @Input() disabledCallback: (e: { item: any; index: number }) => boolean;

  @Input() allowSearch: boolean = true;
  @Input() textField: string = 'text';
  @Input() valueField: string = 'value';
  @Input() disabledField: string = 'disabled';
  @Input() mode: 'single' | 'multiple' = 'single';
  itemRemove: boolean = false;
  @Output() itemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();

  @Output() onFocus: EventEmitter<any> = new EventEmitter<any>();

  private _items: any[] = [];
  @Input()
  public get items(): any[] {
    return this._items;
  }
  public set items(v: any[]) {
    this._items = v;
    if (this.itemsChange) {
      this.itemsChange.emit(v);
    }
    if (this.itemsStatusObserver) {
      this.itemsStatusObserver.next(this.items.length);
    }
  }

  hasSelectedValue: boolean = false;
  itemsFiltered: any[] = [];

  // #endregion

  dropDownDisabled: boolean = false;

  @Output()
  selectionChanged: EventEmitter<AXSelectBoxSelectionChangedEvent> = new EventEmitter<AXSelectBoxSelectionChangedEvent>();

  @Output()
  selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  private _selectedItems: any[] = [];
  @Input()
  public get selectedItems(): any[] {
    return this._selectedItems || [];
  }
  public set selectedItems(v: any[]) {
    this.setSelectedItemsChange(v);
    // if (!v) {
    //   v = [];
    // }

    // const old = this.selectedItems;
    // if (JSON.stringify(old) !== JSON.stringify(v)) {
    //   this._selectedItems = this.mode == 'single' ? v.slice(0, 1) : [...new Set(v)]; //[...new Set(v[0])] : [...new Set(v)];
    //   this._selectedItems.forEach((c) => (c.selected = true));
    //   this.selectedItemsChange.emit(this._selectedItems);
    //   this.selectedValuesChange.emit(this.selectedValues);
    //   this.clearValidationStyle(this.ref.nativeElement);
    //   this.waitForData(() => {
    //     if (this._selectedItems) {
    //       this.items.forEach((c) => (c.selected = this._selectedItems.some((i) => i[this.valueField] == c[this.valueField])));
    //     }
    //   });
    // }
  }

  setSelectedItemsChange(v: any[], old: any[] = this.selectedItems) {
    if (!v) {
      v = [];
    }
    // const old = this.selectedItems;
    var f = differenceBy(old, v, this.valueField);
    var s = differenceBy(v, old, this.valueField);
    // if (JSON.stringify(old) !== JSON.stringify(v)) {
    if (f.length != 0 || s.length != 0) {
      this._selectedItems = this.mode == 'single' ? v.slice(0, 1) : [...new Set(v)]; //[...new Set(v[0])] : [...new Set(v)];
      this._selectedItems.forEach((c) => (c.selected = true));
      this.selectedItemsChange.emit(this._selectedItems);
      this.selectedValuesChange.emit(this.selectedValues);
      this.clearValidationStyle(this.ref.nativeElement);
      this.waitForData(() => {
        if (this._selectedItems) {
          this.items.forEach((c) => (c.selected = this._selectedItems.some((i) => i[this.valueField] == c[this.valueField])));
        }
      });
    }
  }

  ngOnInit() {
    if (this.rowTemplate === undefined && this.rowInputTemplate != undefined) {
      this.rowTemplate = this.rowInputTemplate;
    }
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
  }

  scrolled(e) {
    if (
      this.remoteOperation &&
      this.totalCount > this.items.length &&
      this.listContainer.nativeElement.scrollHeight != 0 &&
      this.listContainer.nativeElement.scrollHeight - this.listContainer.nativeElement.scrollTop - 300 < 50
    ) {
      if (this.skip !== this.items.length) {
        this.showLoading = true;
        this.skip = this.items.length;
        const params: AXDataSourceReadParams = {};
        params.skip = this.items.length;
        params.take = this.bufferSize; //* (Math.floor(this.items.length / this.bufferSize) + 1);
        if (this.textbox) {
          params.searchText = this.text;
        } else {
          params.searchText = null;
        }
        this.fetch(params);
      }
    }
  }
  private setSelectedItems(v: any[], isUserInput: boolean) {
    let changed = false;
    if (isUserInput) {
      changed = JSON.stringify(v) !== JSON.stringify(this.selectedItems);
    }
    this.selectedItems = v;
    this.setSelectedIndex();
    if (isUserInput && changed) {
      this.emitSelectionChangedEvent();
    }
  }

  private searchChangeObserver: any;

  delay: number = 500;

  textChanged(e) {
    if ((e.value === null || e.value === undefined || e.value === '') && (e.oldValue === null || e.oldValue === undefined || e.oldValue === '')) {
    } else {
      this.currentfocusedIndex = -1;
      if (this.remoteOperation) {
        this.searchText = this.text;
        //  this.searchText = e.value;
        // this.text = e.value;
        // this.items = [];
        if (this.items) {
          let t = this.items.length;
          for (let i = 0; i < t; i++) {
            this.items.pop();
          }
        }

        // this.items.forEach((element) => {
        //   this.items.pop();
        // });
        const params: AXDataSourceReadParams = {};
        params.searchText = this.text;
        // params.searchText = e.value;
        params.skip = 0;
        params.take = this.bufferSize;
        this.fetch(params);
      }
    }
  }

  isItemDisabled(item: any): boolean {
    if (item[this.disabledField] == true) {
      return true;
    } else if (this.disabledCallback) {
      return this.disabledCallback({ item, index: -1 });
    } else {
      return false;
    }
  }

  onButtonClick(e) {
  }

  private setSelectedIndex(sign: -1 | 1 | null = null): void {
    if (sign == null) {
      if (!this.remoteOperation && this.text && this.text !== '') {
        this.currentfocusedIndex = this.items
          .filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()))
          .indexOf(this.selectedItems[this.selectedItems.length - 1]);
      } else {
        this.currentfocusedIndex = this.items.indexOf(this.selectedItems[this.selectedItems.length - 1]);
      }
    } else {
      sign === -1 ? this.currentfocusedIndex-- : this.currentfocusedIndex++;
    }

    if (this.remoteOperation) {
      this.itemsFiltered = this.items;
    } else {
      this.itemsFiltered = this.text
        ? this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()))
        : this.items;
    }

    this.currentfocusedIndex =
      this.currentfocusedIndex < 0
        ? 0
        : this.currentfocusedIndex >= this.itemsFiltered.length
          ? this.itemsFiltered.length - 1
          : this.currentfocusedIndex;
    //
    // set scroll
    if (this.listContainer) {
      this.zone.runOutsideAngular(() => {
        const itemDiv = this.listContainer.nativeElement.querySelector(`.list-item:nth-child(${this.currentfocusedIndex})`);
        if (itemDiv) {
          itemDiv.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  @Output()
  selectedValuesChange: EventEmitter<any[] | any> = new EventEmitter<any[] | any>();

  @Input()
  public get selectedValues(): any[] | any {
    if (this.mode === 'single') {
      return this._selectedItems.map((c) => c[this.valueField])[0];
    } else {
      return this._selectedItems.map((c) => c[this.valueField]) || [];
    }
  }

  public set selectedValues(v: any[] | any) {
    if (this.compareSelectedValues(v)) {
      return;
    }
    if (v == null) {
      this.selectedItems = [];
    } else {
      if (v !== undefined) {
        if (v != [] && v != '' && v != null) {
          this.hasSelectedValue = true;
        }

        this.waitForData(() => {
          if (this.mode === 'single') {
            if (this.items.filter((c) => v == c[this.valueField])) {
              this.selectedItems = this.items.filter((c) => v == c[this.valueField]);
            } else {
              this.selectedItems = [];
            }
          } else {
            if (Array.isArray(v)) {
              if (this.selectedItems.length > v.length) {
                this.selectedItems = this.selectedItems.filter((c) => v.includes(c[this.valueField]));
              } else {
                let addId = [];
                v.forEach((vId) => {
                  addId.push({
                    [this.valueField]: vId
                  });
                });

                let newId = differenceBy(addId, this.selectedItems, this.valueField);
                let vv = [];
                newId.forEach((rc) => {
                  vv.push(rc[this.valueField]);
                });
                this.items
                  .filter((c) => vv.includes(c[this.valueField]))
                  .forEach((res) => {
                    this.selectedItems.push(res);
                  });
                //  this.selectedItems.push(this.items.filter((c) => vv.includes(c[this.valueField])));
                this.setSelectedItemsChange(this.selectedItems, vv.length > 0 ? [1] : this.selectedItems);
              }

              //  this.selectedItems = this.items.filter((c) => v.includes(c[this.valueField]));
            } else if (v) {
              this.selectedItems = this.items.filter((c) => v === c[this.valueField]);
            } else {
              this.selectedItems = [];
            }
          }
          this.selectedValuesChange.emit(this.selectedValues);
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      }
    }
  }

  private compareSelectedValues(newValue: any[] | any) {
    const currentValue = this.selectedValues;
    return (currentValue == null && newValue == null) || JSON.stringify(currentValue) === JSON.stringify(newValue);
  }

  private setSelectedValues(v: any[] | any, isUserInput: boolean) {
    const changed = isUserInput ? !this.compareSelectedValues(v) : false;
    this.selectedValues = v;
    if (isUserInput && changed) {
      this.emitSelectionChangedEvent();
    }
  }

  private emitSelectionChangedEvent() {
    this.selectedValuesChange.emit(this.selectedValues);
    this.selectionChanged.emit(new AXSelectBoxSelectionChangedEvent(this, this.selectedItems, this.selectedValues));
  }

  ngAfterViewInit(): void {
    if (this.bufferSize < 10) {
      this.bufferSize = 10;
    }
    if (this.mode == 'single') {
      this.showCheckBox = false;
    } else {
      this.showCheckBox = true;
    }
    if (!this.remoteOperation || (this.remoteOperation && this.hasSelectedValue)) {
      this.refresh();
    }
  }
  dropdownToggleSelecBox(e) {
    this.text = '';
    if (this.dropdown.isOpen) {
      this.refresh();
      setTimeout(() => {
        if (this.serchBox) {
          this.serchBox.focus();
        }
      }, 1);
    } else {
      //  this.refresh();
    }
    this.dropdownToggle.emit(e);
  }

  ngAfterContentInit() {
    // if (!this.allowSearch) {
    //     if (this.readonly == false) {
    //         this.itemRemove = true;
    //         this.readonly = true;
    //     }
    // }
    this.initValidation(this.ref, 'selectedItems', this.validation);
    if (this.dataSource) {
      // if (this.allowSearch == false) {
      //   this.fetch();
      // }
      this.dataSource.onDataReceived.subscribe((c) => {
        this.showLoading = false;
        this.dataReceived(c.data.result);
      });
    }
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  private dataReceived(data: any) {
    if (this.remoteOperation) {
      if (this.searchText && this.searchText != null && this.searchText !== '') {
        if (data.totalCount) {
          if (this.items.length == 0) {
            //this.items = data.items;
            data.items.forEach((item) => {
              this.items.push(item);
            });
          } else {
            data.items.forEach((item) => {
              this.items.push(item);
            });
            // if (this.itemsStatusObserver) {
            //   this.itemsStatusObserver.next(this.items.length);
            // }
          }

          this.totalCount = data.totalCount;
        } else {
          if (this.items.length == 0) {
            this.items = data.items;
          } else {
            data.items.forEach((item) => {
              this.items.push(item);
            });
            // if (this.itemsStatusObserver) {
            //   this.itemsStatusObserver.next(this.items.length);
            // }
          }
          this.totalCount = data.items == undefined ? 0 : data.items.length;
        }
      } else if (data.items && data.items.length === data.totalCount) {
        this.items = data.items;
        this.totalCount = data.items.length;
      } else if (data.totalCount) {
        data.items.forEach((elm) => {
          this.items.push(elm);
        });
        // if (this.itemsStatusObserver) {
        //   this.itemsStatusObserver.next(this.items.length);
        // }
        this.totalCount = data.totalCount;
      } else {
        data.forEach((elm) => {
          this.items.push(elm);
          // if (this.itemsStatusObserver) {
          //   this.itemsStatusObserver.next(this.items.length);
          // }
        });
        this.totalCount = data.length;
      }
    } else {
      this.items = data;
    }

    this.cdr.markForCheck();
    this.cdr.detectChanges();

    this.dropdown.updatePosition();
  }

  // private params: AXDataSourceReadParams = {};

  fetch(params: AXDataSourceReadParams = {}) {
    //  this.params = params;
    if (this.dataSource) {
      this.showLoading = true;
      this.dataSource.fetch(params);
    }
  }

  refresh() {
    const params: AXDataSourceReadParams = {};
    if (this.remoteOperation) {
      params.skip = 0;
      this.skip = 0;
      params.take = this.bufferSize;
    }
    if (this.dataSource != undefined) {
      // this.items = [];
      // this.items.forEach((element) => {
      //   this.items.pop();
      // });

      if (this.items) {
        let t = this.items.length;
        for (let i = 0; i < t; i++) {
          this.items.pop();
        }
      }

      this.fetch(params);
    }
  }

  handleItemRemoveClick(item) {
    if (this.mode === 'single') {
      // this.selectedItems = null;
      this.setSelectedValues(null, true);
      // this.selectedItemsChange.emit(this._selectedItems);
      // this.clearValidationStyle(this.ref.nativeElement);
    } else {
      // this.selectedItems = this.selectedItems.filter((c) => c !== item);
      this.setSelectedItems(
        this.selectedItems.filter((c) => c[this.valueField] !== item[this.valueField]),
        true
      );
      // this._selectedItems = this._selectedItems.filter(c => c !== item);
      // this.selectedItemsChange.emit(this._selectedItems);
      // this.clearValidationStyle(this.ref.nativeElement);
    }
    // this.text = '';
    this.validate();
    this.cdr.markForCheck();
  }

  onFocusTextBox(e) { }

  onTextBoxClick(e) {
    if (this.disabled == false && this.readonly == false) {
      this.dropdown.open();
    }
  }

  handleItemClick(e: MouseEvent, item: any) {
    if (this.isItemDisabled(item) == false) {
      const value = item[this.valueField];

      if (this.mode === 'single') {
        // this.selectedValues = value;
        this.setSelectedValues(value, true);
      } else {
        const exists = this.selectedValues.slice(0);
        if (exists.includes(value)) {
          if (this.allowNull == true || (this.allowNull == false && this.selectedItems.length > 1)) {
            this.handleItemRemoveClick(item);
          }
        } else {
          exists.push(value);
          // this.selectedValues = exists;
          this.setSelectedValues(exists, true);
        }
      }

      if (this.mode == 'single') {
        this.text = '';
        this.dropdown.close();
        this.cdr.markForCheck();
      }
      // if (e.stopPropagation() == undefined) {
      //     e.stopPropagation();
      // }
      setTimeout(() => {
        if (this.serchBox) {
          this.serchBox.focus();
        }
      }, 0);
    }

    e.stopPropagation();
  }

  handleKeyEventSearch(e: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      this.dropdown.close();
      setTimeout(() => {
        this.textBoxSelectBox.focus();
      }, 0);
      return false;
    }
    if (e.key === 'Escape') {
      this.text = null;
      setTimeout(() => {
        this.textBoxSelectBox.focus();
      }, 0);
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.getItems().length > 0 && e.type === 'keydown') {
      if (this.mode === 'single') {
        this.currentfocusedIndex = this.currentfocusedIndex + (e.key === 'ArrowDown' ? 1 : -1);
        this.selectedItemByIndex(this.currentfocusedIndex);
      } else {
        if (this.dropdown.isOpen) {
          this.setSelectedIndex(e.key === 'ArrowDown' ? 1 : -1);
        } else {
          this.dropdown.open();
          setTimeout(() => {
            if (this.serchBox) {
              this.serchBox.focus();
            }
          }, 0);
        }
      }
    }
    // if (e.key == 'Enter' && this.dropdown.isOpen && this.mode == 'single') {
    //     this.dropdown.close();
    //     setTimeout(() => {
    //         this.dropdown.focus();
    //     }, 0);
    // }
    //e.stopPropagation();
    //e.preventDefault();
    e.stopImmediatePropagation();
    if (e.type === 'keydown' && e.key == 'Enter' && this.dropdown.isOpen) {
      if (!this.remoteOperation && this.text && this.text !== '') {
        this.itemsFiltered = this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()));
        if (this.itemsFiltered.length === 1) {
          this.currentfocusedIndex = 0;
        }
      } else {
        this.itemsFiltered = this.items;
      }

      if (
        this.selectedItems.filter((c) => c[this.valueField] === this.itemsFiltered[this.currentfocusedIndex][this.valueField]).length > 0 &&
        this.mode == 'multiple'
      ) {
        if (this.allowNull == true || (this.allowNull == false && this.selectedItems.length > 1)) {
          if (!this.remoteOperation && this.text && this.text !== '') {
            this.selectedItems = this.selectedItems.filter(
              (c) =>
                c !==
                this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()))[this.currentfocusedIndex]
            );
          } else {
            this.selectedItems = this.selectedItems.filter((c) => c[this.valueField] !== this.items[this.currentfocusedIndex][this.valueField]);
          }
          this.emitSelectionChangedEvent();
        }
      } else {
        if (this.mode == 'multiple') {
          if (this.currentfocusedIndex != -1) {
            if (!this.remoteOperation && this.text && this.text !== '') {
              if (this.itemsFiltered.length === 1) {
                this.selectedItems.push(this.itemsFiltered[0]);
              } else {
                this.selectedItems.push(this.itemsFiltered[this.currentfocusedIndex]);
              }
            } else {
              this.selectedItems.push(this.items[this.currentfocusedIndex]);
            }
            this.emitSelectionChangedEvent();
          }
        } else {
          if (this.text && this.itemsFiltered?.length === 1) {
            this.setSelectedItems(this.itemsFiltered, true);
          }
          if (this.mode == 'single') {
            this.dropdown.close();
            setTimeout(() => {
              this.textBoxSelectBox.focus();
            }, 0);
          }
        }
      }
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    this.cdr.markForCheck();
  }

  isChar(str: string) {
    if (
      str.includes('Shift') ||
      str.includes('Tab') ||
      str.includes('Control') ||
      str.includes('Alt') ||
      str.includes('CapsLock') ||
      str.includes('Meta') ||
      str.includes('ContextMenu') ||
      str.includes('Enter') ||
      str.includes('Backspace') ||
      str.includes('PrintScreen') ||
      str.includes('ScrollLock') ||
      str.includes('Pause') ||
      str.includes('Home') ||
      str.includes('End') ||
      str.includes('Insert') ||
      str.includes('PageUp') ||
      str.includes('Delete') ||
      str.includes('PageDown') ||
      str.includes('NumLock') ||
      str.includes('Escape') ||
      str.includes('Arrow') ||
      str.includes('ّF1') ||
      str.includes('F2') ||
      str.includes('F3') ||
      str.includes('F4') ||
      str.includes('F5') ||
      str.includes('F6') ||
      str.includes('F7') ||
      str.includes('F8') ||
      str.includes('F9') ||
      str.includes('F10') ||
      str.includes('F11') ||
      str.includes('F12')
    ) {
      return false;
    } else {
      return true;
    }
  }

  handleKeyEvent(e: any) {
    // const NumberMinusPattern = /[a-zA-Z0-9\-]/g;
    // const Farsi = /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/;
    //  const inputChar = String.fromCharCode(e.charCode);
    // const patternEn = /^[a-zA-Z0-9]*$/;
    // const pattern = /^[\u0600-\u06FF\s]+$/;
    const inputChar = e.key;
    if (
      (inputChar != 'Backspace' &&
        inputChar != 'Backspace' &&
        inputChar != 'Tab' &&
        inputChar != 'Enter' &&
        inputChar != 'Escape' &&
        inputChar != 'ArrowDown' &&
        inputChar != 'ArrowUp') ||
      e.code === 'Space' ||
      e.ctrlKey == true
    ) {
      e.preventDefault();
    }
    if (
      e.key === 'Backspace' &&
      e.type === 'keydown' &&
      ((this.allowNull === true && this.selectedItems.length > 0) || (this.allowNull === false && this.selectedItems.length > 1))
    ) {
      this.selectedItems.pop();
      this.emitSelectionChangedEvent();
    }
    if (this.disabled || this.readonly) {
      this.dropdown.close();
      setTimeout(() => {
        this.textBoxSelectBox.focus();
      }, 0);
      return false;
    }
    const INPUT = String.fromCharCode(e.keyCode);
    if (this.isChar(e.key) && this.allowSearch && e.ctrlKey == false) {
      this.dropdown.open();
      setTimeout(() => {
        if (this.serchBox) {
          this.serchBox.focus();
        }
      }, 0);
      this.text = e.key;
    }

    if (e.key === 'Escape') {
      this.text = null;
      this.dropdown.close();
      setTimeout(() => {
        this.textBoxSelectBox.focus();
      }, 0);
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.getItems().length > 0 && e.type === 'keydown') {
      if (this.mode === 'single') {
        this.selectedItemByIndex(this.currentfocusedIndex + (e.key === 'ArrowDown' ? 1 : -1));
      } else {
        if (this.dropdown.isOpen) {
          //  this.setSelectedIndex((e.key === 'ArrowDown' ? 1 : -1));
          if (this.allowSearch == false) {
            this.setSelectedIndex(e.key === 'ArrowDown' ? 1 : -1);
          } else {
            setTimeout(() => {
              if (this.serchBox) {
                this.serchBox.focus();
              }
            }, 0);
          }
        } else {
          this.dropdown.open();
          if (this.allowSearch == true) {
            setTimeout(() => {
              if (this.serchBox) {
                this.serchBox.focus();
              }
            }, 0);
          }
        }
      }
    }

    if (this.allowSearch === false) {
      if (e.type === 'keydown' && e.key == 'Enter' && this.dropdown.isOpen) {
        e.stopImmediatePropagation();
        if (
          this.selectedItems.filter((c) => c[this.valueField] === this.itemsFiltered[this.currentfocusedIndex][this.valueField]).length > 0 &&
          this.mode == 'multiple'
        ) {
          if (this.allowNull == true || (this.allowNull == false && this.selectedItems.length > 1)) {
            if (!this.remoteOperation && this.text && this.text !== '') {
              this.selectedItems = this.selectedItems.filter(
                (c) =>
                  c !==
                  this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()))[this.currentfocusedIndex]
              );
            } else {
              this.selectedItems = this.selectedItems.filter((c) => c[this.valueField] !== this.items[this.currentfocusedIndex][this.valueField]);
            }
            this.emitSelectionChangedEvent();
          }
        } else {
          if (this.mode == 'multiple') {
            if (this.currentfocusedIndex != -1) {
              if (!this.remoteOperation && this.text && this.text !== '') {
                if (this.itemsFiltered.length === 1) {
                  this.selectedItems.push(this.itemsFiltered[0]);
                } else {
                  this.selectedItems.push(this.itemsFiltered[this.currentfocusedIndex]);
                }
              } else {
                this.selectedItems.push(this.items[this.currentfocusedIndex]);
              }
              this.emitSelectionChangedEvent();
            }
          } else {
            if (this.text && this.itemsFiltered.length === 1) {
              this.setSelectedItems(this.itemsFiltered, true);
            }
            if (this.mode == 'single') {
              this.dropdown.close();
              setTimeout(() => {
                this.textBoxSelectBox.focus();
              }, 0);
            }
          }
        }
      }
    }

    this.cdr.markForCheck();
  }

  focus(): void {
    this.textbox.focus();
  }

  selectedItemByIndex(index: number) {
    let item = [];
    if (!this.remoteOperation && this.text && this.text !== '') {
      this.itemsFiltered = this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()));

      item = this.itemsFiltered[index];
    } else {
      item = this.items[index];
    }
    //
    //  const item = this.text ? this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()))[index] : this.items[index];
    if (item) {
      this.setSelectedItems([item], true);
    }

    this.setSelectedIndex();
  }

  getItems(): any[] {
    if (this.items == null) {
      return [];
    }
    return !this.remoteOperation && this.text && this.text !== ''
      ? this.items.filter((c) => (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase()))
      : this.items;
  }

  isItemSelected(item: any): boolean {
    return this.selectedItems && this.selectedItems.filter((c) => c[this.valueField] === item[this.valueField]).length > 0;
  }

  private itemsStatusObserver: any;
  private waitForData(callbackfn: () => void) {
    if (this.items && this.items.length) {
      callbackfn();
    } else if (!this.itemsStatusObserver) {
      Observable.create((observer) => {
        this.itemsStatusObserver = observer;
      })
        .pipe(debounceTime(100))
        .pipe(distinctUntilChanged())
        .subscribe((c) => {
          callbackfn();
        });
    }
  }
}
