import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { AXValidatableComponent, AXBaseSizableComponent, AXBaseInputComponent, AXElementSize } from '../base/element.class';
import { AXColorBoxComponent } from './color-box/color-box.component';
import { AXColorUtil, AXConfig } from '@acorex/core';
import { AXDropdownComponent } from '../dropdown/dropdown.component';
import { AXValidation } from '../validation/validation.component';


@Component({
    selector: 'ax-color-picker',
    templateUrl: './color-picker.component.html',
    providers: [
        { provide: AXValidatableComponent, useExisting: AXColorPickerComponent },
    ],
    host: { style:'width: 100%' }
})
export class AXColorPickerComponent extends AXColorBoxComponent implements AXBaseSizableComponent, AXBaseInputComponent {

    @ViewChild('dropdown', { static: true })
    dropdown: AXDropdownComponent;
    @Input() placeholder: string = '';
    @Input() showClear: boolean = false;

    @Input() label: string;

    _text: string = '';

    constructor(private ref: ElementRef) {
        super();
    }

    @Input()
    readonly: boolean;
    @Input()
    disabled: boolean;
    @Input()
    size: AXElementSize = 'md';

    @Input()
    rtl: boolean = AXConfig.get('layout.rtl');

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


    ngOnInit() {
        if (this.rtl == null) {
            this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
        }
    }


    ngAfterContentInit() {
        this.initValidation(this.ref, 'value', this.validation);
    }

    focus(): void {
        this.dropdown.focus();
    }

    // handleValueChange(c: string) {

    // }

    findTextColor(color: string) {
        if (!color) {
            return '#000';
        }
        return !(AXColorUtil.contrastToWhite(color) > 2.0) ? '#000' : '#fff';
    }

    handleItemClick(e) {
        this.dropdown.close();
    }

}
