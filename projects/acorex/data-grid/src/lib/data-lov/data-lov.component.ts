import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  ContentChild,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { AXPopupService, AXBaseInputComponent, AXBaseSizableComponent, AXElementSize, AXValidation } from '@acorex/components';
import { AXDataSourceComponent, AXSelectBoxComponent, AXDataEvent, AXValidatableComponent } from '@acorex/components';
import { AXDataLovPopupComponent } from './data-lov-popup/data-lov-popup.component';
import { AXGridDataColumn } from '../data-grid/columns/column.component';
import { AXConfig } from '@acorex/core';

@Component({
  selector: 'ax-lov',
  templateUrl: './data-lov.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { style: 'width: 100%' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXLOVComponent }]
})
export class AXLOVComponent extends AXValidatableComponent implements AXBaseSizableComponent, AXBaseInputComponent {
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

  constructor(private popup: AXPopupService, private ref: ElementRef) {
    super();
  }

  @ViewChild('selectBox', { static: true })
  selectBox: AXSelectBoxComponent;

  @ContentChild(AXDataSourceComponent, { static: true })
  dataSource: AXDataSourceComponent;

  @ContentChildren(AXGridDataColumn)
  private columns: QueryList<AXGridDataColumn>;

  @ContentChild('itemTemplate', { static: true })
  rowTemplate: TemplateRef<any>;

  @Input()
  textField: string = '';

  @Input()
  allowSearch: boolean = true;

  @Input()
  valueField: string = '';

  @Input()
  hasChildField: string = 'null';

  @Input()
  allowNull: boolean = true;

  @Input()
  popupSize: 'sm' | 'md' | 'lg' | 'full' = 'md';

  @Input()
  pagination:boolean =true;
  @Input()
  selectedItems: any[] = [];

  // @Input()
  // selectedValues: any[] = [];

  @Input()
  readonly: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  chipsWidth: string = '';

  @Input()
  size: AXElementSize = 'md';

  @Input()
  caption: string;

  @Input()
  mode: 'single' | 'multiple' = 'single';

  @Input()
  placeholder: string;

  @Output()
  onSelectionChange: EventEmitter<AXDataEvent<any>> = new EventEmitter<AXDataEvent<any>>();

  @Input()
  rtl: boolean = AXConfig.get('layout.rtl');

  focus(): void {
    this.selectBox.focus();
  }

  refresh() {
    this.selectBox.refresh();
  }

  handleButtonClick() {
    this.open();
  }

  ngOnInit(): void {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
    //  this.selectVal = this.selectedValues;
    this.onSelectionChange.subscribe((c) => {
      this.clearValidationStyle(this.ref.nativeElement);
    });
  }

  ngAfterContentInit(): void {
    this.initValidation(this.ref, 'selectedItems', this.validation);
  }

  handleSelectChange(e) {
    this.onSelectionChange.emit({ data: this.selectedItems, component: this, htmlElement: this.ref.nativeElement });
  }

  public open(): Promise<any> {
    return new Promise((resolve) => {
      this.selectBox.dropdown.close();
      this.popup
        .open(AXDataLovPopupComponent, {
          size: this.popupSize,
          //   closable: false,
          data: {
            dataSource: this.dataSource,
            selectionMode: this.mode,
            columns: this.columns.toArray(),
            //  selectedItems: this.selectedValues,
            selectedItems: this.selectedItems,
            keyField: this.valueField,
            allowNull: this.allowNull,
            hasChildField: this.hasChildField,
            rtl: this.rtl,
            pagination:this.pagination
          },
          title: this.caption
          // size: this.size,
        })
        .then((c) => {
          if (c.data) {
            // this.selectedValues = [];
            this.selectedItems = [];
            c.data.forEach((elm) => {
              this.selectedItems.push(elm);
            });
            //  this.selectedItems = c.data;
            //  this.selectBox.refresh();
            this.onSelectionChange.emit({ data: this.selectedItems, component: this, htmlElement: this.ref.nativeElement });
            if (resolve) {
              resolve(c.data);
            }
          } else {
            if (resolve) {
              resolve(this.selectedItems);
            }
          }

          this.selectBox.refresh();
        });
    });
  }
}
