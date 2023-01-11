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
    HostListener
} from '@angular/core';
import { AXTextBoxComponent } from '../textbox/textbox.component';
import { AXDropdownComponent } from '../dropdown/dropdown.component';
import { AXBaseSizableComponent, AXBaseInputComponent, AXElementSize, AXValidatableComponent, AXBaseValueComponent } from '../base/element.class';
import { AXDataSourceComponent } from '../data-source/datasource.component';
import { AXValidation } from '../validation/validation.component';
import { AXDataSourceReadParams } from '../data-source/read-param';
import { AXSearchBoxComponent } from '../searchbox/searchbox.component';
import { AXConfig, AXObjectUtil, AXTranslator } from '@acorex/core';
import { AXValueEvent } from '../base/events.class';


export class AXSelectBoxValueChangedEvent extends AXValueEvent<any | any[]> {
    value?: any;
    oldValue?: any;
    isUserInput: boolean = false;
    selectedKeys?: any[];
    selectedItems?: any[];
}

@Component({
    selector: 'ax-select-box2',
    templateUrl: './selectbox2.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style:'width: 100%' },
    providers: [{ provide: AXValidatableComponent, useExisting: AXSelectBox2Component }]
})
export class AXSelectBox2Component extends AXValidatableComponent implements AXBaseSizableComponent, AXBaseInputComponent, AXBaseValueComponent<any>{

    @ViewChild(AXTextBoxComponent, { static: true })
    span: ElementRef<HTMLElement>;

    @ViewChild(AXTextBoxComponent, { static: true })
    textbox: AXTextBoxComponent;

    @ViewChild('listContainer', { static: true })
    listContainer: ElementRef<HTMLDivElement>;

    @ViewChild('searchBox', { static: false })
    searchBox: AXSearchBoxComponent;

    @ViewChild('textBoxSelectBox', { static: true })
    textBoxSelectBox: AXTextBoxComponent;

    @ContentChild(AXDataSourceComponent, { static: true })
    private _contentDataSource: AXDataSourceComponent;

    @ContentChild(AXValidation, { static: true })
    private _contentValidation: AXValidation;

    @ViewChild('d', { static: true })
    dropdown: AXDropdownComponent;


    @Input() showDropDownButton: boolean = true;
    @Input() readonly: boolean = false;
    @Input() rtl: boolean = AXConfig.get('layout.rtl');
    @Input() disabled: boolean;
    @Input() placeholder: string;
    @Input() size: AXElementSize = 'md';
    @Input() allowNull: boolean = true;
    @Input() textAlign: 'right' | 'left' | null = null;
    @Input() bufferSize: number = 10;
    @Input() remoteOperation: boolean = false;
    @Input() allowSearch: boolean = true;
    @Input() textField: string = 'text';
    @Input() valueField: string = 'value';
    @Input() selectionMode: 'single' | 'multiple' = 'single';
    @Input() selectionDataMode: 'value' | 'item' = 'value';

    currentfocusedIndex: number = -1;
    showLoading: boolean = false;
    skip: number = -1;
    searchText: string = '';
    text: string = '';
    totalCount: number = 0;
    itemsFiltered: any[] = [];

    private isUserInput: boolean = false;

    private _dataSource: AXDataSourceComponent;
    @Input()
    public get dataSource(): AXDataSourceComponent {
        return this._dataSource ? this._dataSource : this._contentDataSource;
    }
    public set dataSource(v: AXDataSourceComponent) {
        this._dataSource = v;
    }

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


    private _value: any | any[];
    @Input()
    public get value(): any | any[] {
        return this._value;
    }
    public set value(v: any | any[]) {
        if (v !== this._value) {
            const oldValue = AXObjectUtil.deepJSONClone(this._value);
            if (this.selectionMode === 'multiple') {
                this._value = Array.isArray(v) ? v : (v ? [v] : []);
            } else {
                this._value = Array.isArray(v) ? v[0] : v;
            }
            this.valueChange.emit(this._value);
            this.onValueChanged.emit({
                component: this,
                htmlElement: this.ref.nativeElement,
                isUserInput: this.isUserInput,
                oldValue,
                value: this._value,
                selectedKeys: this.selectedItems.map(c => c[this.valueField]),
                selectedItems: this.selectedItems.slice()
            });
            this.isUserInput = false;
            this.renderSelection();
        }
    }


    private _selectedItems: any[];
    public get selectedItems(): any[] {
        return this._selectedItems || [];
    }

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
        this.renderSelection();
    }

    @Output()
    itemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Output()
    onBlur: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onFocus: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onValueChanged: EventEmitter<AXSelectBoxValueChangedEvent> = new EventEmitter<AXSelectBoxValueChangedEvent>();



    ngOnInit() {
        if (this.rtl == null) {
            this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
        }
    }

    scrolled(e) {
        if (this.remoteOperation && this.totalCount > this.items.length && this.listContainer.nativeElement.scrollHeight != 0
            && this.listContainer.nativeElement.scrollHeight - this.listContainer.nativeElement.scrollTop - 300 < 50) {
            this.showLoading = true;

            if (this.skip !== this.items.length) {
                this.skip = this.items.length;

                const params: AXDataSourceReadParams = {};
                params.skip = this.items.length;
                params.take = this.bufferSize * (Math.floor(this.items.length / this.bufferSize) + 1);
                if (this.textbox) {
                    params.searchText = this.text;
                } else {
                    params.searchText = null;
                }
                this.fetch(params);
            }
        }
    }

    textChanged(e) {
        this.currentfocusedIndex = -1;
        if (this.remoteOperation) {
            this.searchText = this.text;
            this.items = [];
            const params: AXDataSourceReadParams = {};
            params.searchText = this.text;
            params.skip = 0;
            params.take = this.bufferSize;
            this.fetch(params);
        }
    }

    private renderSelection() {
        const func = () => {
            if (!this.value) {
                return [];
            }
            if ((this.items?.length > 0) && this.selectionDataMode == 'value') {
                const orgRes = this.items.filter(i => {
                    if (Array.isArray(this.value)) {
                        return this.value.some(ii => {
                            if (typeof ii === 'object') {
                                return i[this.valueField] === ii[this.valueField];
                            }
                            else {
                                return i[this.valueField] === ii;
                            }
                        });
                    }
                    else {
                        if (typeof this.value === 'object') {
                            return i[this.valueField] === this.value[this.valueField];
                        }
                        else {
                            return i[this.valueField] === this.value;
                        }
                    }
                });
                if (orgRes.length > 0) {
                    return orgRes;
                }
            }
            if (Array.isArray(this.value)) {
                return this.value.map(ii => {
                    if (typeof ii === 'object' && ii[this.textField]) {
                        return ii;
                    }
                    else {
                        const fake: any = {};
                        fake[this.valueField] = this.value;
                        fake[this.textField] = AXTranslator.get('common.loading');
                        return fake;
                    }
                });
            }
            else {
                if (typeof this.value === 'object' && this.value[this.textField]) {
                    return [this.value];
                }
                else {
                    const fake: any = {};
                    fake[this.valueField] = this.value;
                    fake[this.textField] = AXTranslator.get('common.loading');
                    return [fake];
                }
            }
        };
        this._selectedItems = func();
        this.cdr.markForCheck();
    }

    ngAfterViewInit(): void {
        if (this.bufferSize < 10) {
            this.bufferSize = 10;
        }
        if (!this.remoteOperation) {
            this.refresh();
        }
    }

    dropdownToggle(e) {
        if (this.dropdown.isOpen) {
            this.currentfocusedIndex = this.getItems().indexOf(this.selectedItems[this.selectedItems.length - 1]);
            this.focusOnSearchBox();
            this.focusOnCurrentFocusedIndex();
        }
        else {
            this.focus();
        }
    }

    ngAfterContentInit() {
        this.initValidation(this.ref, 'value', this.validation);
        if (this.dataSource) {
            if (this.allowSearch === false) {
                this.fetch();
            }
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
                    this.items = data.items;
                    this.totalCount = data.totalCount;
                } else {
                    this.items = data.items;
                    this.totalCount = data.items == undefined ? 0 : data.items.length;
                }

            }
            else if (data.items && data.items.length === data.totalCount) {
                this.items = data.items;
                this.totalCount = data.items.length;
            }
            else if (data.totalCount) {
                data.items.forEach(elm => {
                    this.items.push(elm);
                });
                this.totalCount = data.totalCount;
            } else {
                data.forEach(elm => {
                    this.items.push(elm);
                });
                this.totalCount = data.length;
            }
        } else {
            this.items = data;
        }
        this.renderSelection();
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }


    fetch(params: AXDataSourceReadParams = {}) {
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
        if (this.dataSource !== undefined) {
            this.items = [];
            this.fetch(params);
        }
    }

    handleItemRemoveClick(item) {
        this.text = '';
        this.isUserInput = true;
        if (Array.isArray(this.value)) {
            this.value = this.value.filter(c => (typeof c === 'object') ? c[this.valueField] !== item[this.valueField] : c !== item[this.valueField]);
        }
        else {
            this.value = null;
        }
        this.cdr.markForCheck();
    }



    onTextBoxClick(e) {
        if (this.disabled === false && this.readonly === false) {
            this.open();
        }
    }

    handleItemClick(e: MouseEvent, item: any) {
        this.isUserInput = true;
        if (this.selectionMode === 'single') {
            this.selectItems(item);
            this.close();
        }
        else {
            if (Array.isArray(this.value) && this.value.length > 0) {
                if (this.value.some(c => this.internalGetItemValue(c) === this.internalGetItemValue(item))) {
                    this.unselectItems(item);
                }
                else {
                    this.selectItems(item);
                }
            }
            else {
                this.selectItems(item);
            }
        }
        this.cdr.markForCheck();
        this.focusOnSearchBox();
    }

    private internalGetItemByDataMode(item: any) {
        return this.selectionDataMode === 'item' ? item : item[this.valueField];
    }

    private internalGetItemValue(item: any) {
        return typeof item === 'object' ? item[this.valueField] : item;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' || this.disabled || this.readonly) {
            this.close();
            e.preventDefault();
            return;
        }
        const isLetter = new RegExp(/[a-zA-Z0-9\-]/).test(String.fromCharCode(e.keyCode));
        if (this.textbox.isFocused()) {
            if (e.key === 'Backspace' && e.type === 'keydown' &&
                ((this.allowNull === true && this.selectedItems.length > 0) ||
                    (this.allowNull === false && this.selectedItems.length > 1))) {
                this.isUserInput = true;
                this.unselectItems(this.selectedItems.pop());
                e.preventDefault();
                return;
            }
            else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.getItems().length > 0 && !this.dropdown.isOpen && e.type === 'keydown') {
                if (this.selectionMode === 'single') {
                    this.isUserInput = true;
                    this.selectedItemByIndex(this.currentfocusedIndex + (e.key === 'ArrowDown' ? 1 : -1));
                    if (e.ctrlKey) {
                        this.open();
                    }
                }
                else {
                    this.open();
                }
                e.preventDefault();
                return;
            }
            else if (isLetter) {
                this.text = e.key;
                this.open();
                e.preventDefault();
                return;
            }
        }
        if (this.dropdown.isOpen) {
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.getItems().length > 0) {
                this.isUserInput = true;
                this.selectItemByNav((e.key === 'ArrowDown' ? 1 : -1));
                e.preventDefault();
                return;
            }
            if ((e.key === 'Enter' || e.code === 'Space')) {
                const focusedItem = this.getItems()[this.currentfocusedIndex];
                if (focusedItem) {

                    if (this.selectionMode === 'single') {
                        this.isUserInput = true;
                        this.selectItems(focusedItem);
                        this.close();
                    }
                    else {
                        this.isUserInput = true;
                        this.toggleSelect(focusedItem);
                    }
                }
                e.preventDefault();
                return;
            }
        }
    }

    unselectItems(...items: any[]) {
        if (!items || items.length === 0) {
            this.value = null;
        }
        else if (Array.isArray(this.value)) {
            this.value = this.value.filter(c => !items.some(d =>
                this.internalGetItemValue(c) === this.internalGetItemValue(d))
            );
        }
        else {
            this.value = null;
        }
        this.cdr.markForCheck();
    }

    selectItems(...items: any[]) {
        if (items && items.length) {
            if (this.selectionMode === 'single') {
                this.value = this.internalGetItemByDataMode(items[0]);
            }
            else {
                this.value = (this.value || []).concat(items.map(c => this.internalGetItemByDataMode(c)));
            }
        }
    }


    toggleSelect(...items: any[]) {
        if (items && items.length) {
            items.forEach(item => {
                this.selectedItems.includes(item) ? this.unselectItems(item) : this.selectItems(item);
            });
        }
    }


    close() {
        this.dropdown.close();
    }

    open() {
        this.dropdown.open();
    }

    focus(): void {
        this.text = null;
        this.textbox.focus();
    }

    private focusOnSearchBox() {
        const inputedVal = this.text;
        if (this.allowSearch === true) {
            setTimeout(() => {
                if (this.searchBox) {
                    this.searchBox.value = inputedVal;
                    this.searchBox.focus();
                }
            }, 0);
        }
        else {
            this.textbox.focus();
        }
    }

    getItems(): any[] {
        if (this.items == null) {
            return [];
        }
        return (!this.remoteOperation && this.text && this.text !== '') ? this.items.filter((c) =>
            (c[this.textField] as string).toLowerCase().includes(this.text.toLowerCase())) : this.items;
    }

    isItemSelected(item: any): boolean {
        return this.selectedItems.some(c => c[this.valueField] === item[this.valueField]);
    }

    private selectItemByNav(sign: -1 | 1 | null = null): void {
        if (sign == null) {
            this.currentfocusedIndex = this.getItems().indexOf(this.selectedItems[this.selectedItems.length - 1]);
        }
        else {
            sign === -1 ? this.currentfocusedIndex-- : this.currentfocusedIndex++;
        }
        if (this.currentfocusedIndex < 0) {
            this.currentfocusedIndex = 0;
        }
        if (this.currentfocusedIndex > this.getItems().length - 1) {
            this.currentfocusedIndex = this.getItems().length - 1;
        }

        // set scroll
        this.focusOnCurrentFocusedIndex();
    }

    private focusOnCurrentFocusedIndex() {
        if (this.listContainer) {
            this.zone.runOutsideAngular(() => {
                const itemDiv = this.listContainer.nativeElement.querySelector(`.list-item:nth-child(${this.currentfocusedIndex})`);
                if (itemDiv) {
                    itemDiv.scrollIntoView({ behavior: 'auto' });
                }
            });
        }
    }

    selectedItemByIndex(index: number) {
        if (index < 0) {
            index = 0;
        }
        if (index > this.getItems().length - 1) {
            index = this.getItems().length - 1;
        }
        this.selectItems(this.getItems()[index]);
        this.currentfocusedIndex = index;
    }
}
