import {
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  Component,
  ElementRef,
  ContentChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { AXDropdownComponent } from '../dropdown/dropdown.component';
import { AXTextBoxComponent } from '../textbox/textbox.component';
import { AXValidatableComponent, AXBaseSizableComponent, AXElementSize, AXBaseValueComponent } from '../base/element.class';
import { AXCalendarType, AXDateTime, AXConfig } from '@acorex/core';
import { AXValueEvent } from '../base/events.class';
import { AXValidation } from '../validation/validation.component';

export class AXDataPickerChangeEvent extends AXValueEvent<Date> {
  isUserChange: boolean;
}

@Component({
  selector: 'ax-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AXValidatableComponent, useExisting: AXDatePickerComponent }],
  host: { style: 'width: 100%' }
})
export class AXDatePickerComponent extends AXValidatableComponent implements AXBaseSizableComponent {
  @ViewChild('dropdown', { static: true })
  dropdown: AXDropdownComponent;

  @ViewChild('input', { static: true })
  input: AXTextBoxComponent;

  @Input()
  dayStyle = [];

  @Input()
  dayMinMaxResoan = '';

  // mmddyyyy: any = [/[0-1]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  yyyyMMdd: any = [/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /[0-3]/, /[0-9]/];
  ddMMyyyy: any = [/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  yyyyddMM: any = [/[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/];
  // yyyyMMdd1: any = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
  // ddMMyyyy2: any = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  // yyyyddMM3: any = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/];

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

  @Input() placeholder: string = '';

  @Input()
  min: Date;

  @Input()
  max: Date;

  @Input()
  readonly: boolean;

  @Input()
  disabled: boolean;

  @Input()
  allowClear: boolean = false;

  @Input()
  textAlign: 'right' | 'left' | null = null;

  @Input()
  showToday: boolean = false;

  @Input()
  selectableHoliday: boolean = true;

  @Input()
  dateType: any;

  @Input()
  showTodayButton: boolean = true;

  @Input()
  openByClick: boolean = false;

  cursorPosition: number = 0;

  model: any = null;
  text: string;

  _renderPicker: boolean = false;

  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) {
    super();
    // set defaults
    if (AXConfig.get('dateTime.type')) {
      this.type = AXConfig.get('dateTime.type');
    }
  }

  @Input()
  size: AXElementSize = 'md';

  @Output()
  typeChange: EventEmitter<AXCalendarType> = new EventEmitter<AXCalendarType>();

  private _type: AXCalendarType = 'gregorian';

  @Input()
  public get type(): AXCalendarType {
    return this._type;
  }

  public set type(v: AXCalendarType) {
    if (v != this._type) {
      this._type = v;
      if (this._value) {
        this.value = this._value.date;
      }
      this._setDateType();
      this.typeChange.emit(v);
    }
  }

  selectToday() {
    this.value = new Date();
  }

  focus(): void {
    // this.dropdown.focus();
    this.input.focus();
  }

  convertMaskToDate(text: string) {
    if (this.type == 'jalali') {
      var d = new AXDateTime().convertStringToGregorian(text, 'YYYY/M/D');
    } else {
      var d = new Date(new AXDateTime(text, 'gregorian').toISOString());
    }

    return d;
  }

  convertMask(date: string) {
    let y;
    let m;
    let d;
    switch (this.dateType.mask) {
      case this.yyyyMMdd:
        y = date.slice(0, 4);
        m = date.slice(5, 7);
        d = date.slice(8, 10);
        break;
      case this.ddMMyyyy:
        y = date.slice(6, 10);
        m = date.slice(3, 5);
        d = date.slice(0, 2);
        break;
      case this.yyyyddMM:
        y = date.slice(0, 4);
        m = date.slice(8, 10);
        d = date.slice(5, 7);
        break;
    }

    return { year: y, monnth: m, day: d };
  }

  textChange(e) {
    this.text = e.value;
    const date = this.convertMask(this.text);

    if (this.text && this.text.indexOf('_') === -1 && this.text.length == 10 && this.type == 'jalali') {
      this.userChange = e.isUserChange;

      this.value = this.convertMaskToDate(date.year + '-' + date.monnth + '-' + date.day);
    } else if (this.text && this.text.indexOf('_') === -1 && this.text.length == 10 && this.type == 'gregorian') {
      this.userChange = e.isUserChange;
      this.value = this.convertMaskToDate(date.year + '-' + date.monnth + '-' + date.day);
    }
  }

  ngOnInit(): void {
    this._setDateType();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.text = this._value?.toString();
      if (this.showToday && !this.value) {
        this.selectToday();
      }
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.initValidation(this.ref, 'value', this.validation);
  }

  clear() {
    this.userChange = true;
    this.value = null;
  }

  userChange: boolean = false;

  @Output()
  onValueChanged: EventEmitter<AXDataPickerChangeEvent> = new EventEmitter<AXDataPickerChangeEvent>();

  @Output()
  valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  private _value: AXDateTime;
  @Input()
  public get value(): Date {
    return this._value?.date;
  }
  public set value(v: Date) {
    this.validate();
    const oldValue = this._value;
    const old = this.value;

    if (v) {
      this._value = new AXDateTime(v, this.type);
    } else {
      this._value = null;
    }
    let unValidDate = false;
    if (this.max || this.min) {
      unValidDate = this.isInMInMaxRange(AXDateTime.convert(v));
    }

    if (!unValidDate) {
      if ((!v && oldValue) || (this._value && !this._value.equal(oldValue, 'day'))) {
        this.text = this._value?.toString();
        setTimeout(() => {
          this.valueChange.emit(v);
          this.onValueChanged.emit({
            component: this,
            oldValue: old,
            value: v,
            isUserChange: this.userChange
          });
        }, 100);
      }
    } else {
      this.text = '';
    }
    this.userChange = false;
  }

  private _setDateType() {
    switch (this.dateType) {
      case 'yyyyMMdd':
        this.dateType = {
          guide: true,
          showMask: true,
          mask: this.yyyyMMdd,
          keepCharPositions: true
        };
        break;
      case 'ddMMyyyy':
        this.dateType = {
          guide: true,
          showMask: true,
          mask: this.ddMMyyyy,
          keepCharPositions: true
        };
        break;
      case 'yyyyddMM':
        this.dateType = {
          guide: true,
          showMask: true,
          mask: this.yyyyddMM,
          keepCharPositions: true
        };
        break;

      default:
        if (this.type == 'gregorian') {
          this.dateType = {
            guide: true,
            showMask: true,
            mask: this.ddMMyyyy,
            keepCharPositions: true
          };
        } else if (this.type == 'jalali') {
          this.dateType = {
            guide: true,
            showMask: true,
            mask: this.yyyyMMdd,
            keepCharPositions: true
          };
        }
        break;
    }
  }

  isInMInMaxRange(d) {
    let r = false;
    if (d !== undefined) {
      if (this.min && !this.max) {
        r = d.compaireNew(new AXDateTime(this.min, this.type), 'YMD', this.type) === -1;
      }
      if (this.max && !this.min) {
        r = d.compaireNew(new AXDateTime(this.max, this.type), 'YMD', this.type) === 1;
      }
      if (this.min && this.max) {
        r =
          d.compaireNew(new AXDateTime(this.min, this.type), 'YMD', this.type) === -1 ||
          d.compaireNew(new AXDateTime(this.max, this.type), 'YMD', this.type) === 1;
      }
    }
    return r;
  }

  onDateChange(e) {
    this.userChange = true;
    this.dropdown.close();

    //this.clearValidationStyle(this.ref.nativeElement);
  }

  onClick(e) {
    this.userChange = true;
    this.dropdown.close();
  }

  onStartfocus() {
    if (this.text == undefined || this.text == null || this.text == '') {
      this.input.input.nativeElement.style.caretColor = 'transparent';
      setTimeout(() => {
        this.setCaretPosition(this.input.input.nativeElement, 0);
        this.cursorPosition = 0;
        this.input.input.nativeElement.style.caretColor = 'auto';
      }, 0);
    }
  }

  handleInputFocus() {
    if (this.openByClick) {
      this._renderPicker = true;
      this.dropdown.open();
    } else {
      this.onStartfocus();
    }

    // this.input.input.nativeElement.focus();
  }
  handleInputBlur() {
    if (this.text && this.text.indexOf('_') != -1) {
      this.text = '';
      this.value = null;
    }
  }

  handleButtonClick() {
    this._renderPicker = true;
    setTimeout(() => {
      this.dropdown.toggle();
    });
  }

  handleKeyPress(e: KeyboardEvent) {
    if (e.type == 'keydown' || e.type == 'keypress' || e.type == 'keyup') {
      if (e.key === 'Delete') {
        e.preventDefault();
      }
      if (e.key === 'Backspace') {
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (this.input.input.nativeElement.selectionStart || this.input.input.nativeElement.selectionStart === 0) {
          this.cursorPosition = this.input.input.nativeElement.selectionStart;
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    const inputChar = String.fromCharCode(e.charCode);
    if (this.text != undefined) {
      const ind1 = this.text.charAt(0);
      const ind2 = this.text.charAt(1);
      const ind3 = this.text.charAt(2);
      const ind4 = this.text.charAt(3);
      const ind5 = this.text.charAt(4);
      const ind6 = this.text.charAt(5);
      const ind7 = this.text.charAt(6);
      const ind8 = this.text.charAt(7);
      const ind9 = this.text.charAt(8);
      const ind10 = this.text.charAt(9);
      switch (this.dateType.mask) {
        case this.yyyyMMdd:
          if (e.type == 'keypress') {
            this.handleClick();
            if (
              (ind6 == '1' && ind7 == '_' && inputChar >= '3') ||
              (((ind6 == '0' && ind7 == '_') || (ind9 == '0' && ind10 == '_')) && inputChar == '0')
            ) {
              e.preventDefault();
            } else if (ind9 == '3' && ind10 == '_') {
              if (ind6 + ind7 <= '06' && inputChar >= '2') {
                e.preventDefault();
              } else if (ind6 + ind7 > '06' && inputChar >= '1') {
                e.preventDefault();
              }
            }
          }
          if (this.text.indexOf('_') === -1 && this.text !== '') {
            if (e.type === 'keydown') {
              if (e.key === 'ArrowUp') {
                if (this.cursorPosition <= 4) {
                  this.text = String(Number(ind1 + ind2 + ind3 + ind4) + 1) + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                }
                if (this.cursorPosition >= 5 && this.cursorPosition <= 7) {
                  if (Number(ind6 + ind7) < 12) {
                    if (Number(ind6 + ind7) < 9) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '0' + String(Number(ind6 + ind7) + 1) + ind8 + ind9 + ind10;
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + String(Number(ind6 + ind7) + 1) + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '01' + ind8 + ind9 + ind10;
                  }
                }
                if (this.cursorPosition >= 8) {
                  if (Number(ind9 + ind10) < 31) {
                    if (Number(ind9 + ind10) < 9) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '0' + String(Number(ind9 + ind10) + 1);
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + String(Number(ind9 + ind10) + 1);
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '01';
                  }
                }
                // this.input.input.nativeElement.style.caretColor = 'transparent';
                // setTimeout(() => {
                //   this.setCaret();
                //   e.preventDefault();
                //   this.input.input.nativeElement.style.caretColor = 'auto';
                // }, 0);
                // e.preventDefault();
              } else if (e.key === 'ArrowDown') {
                if (this.cursorPosition <= 4) {
                  this.text = String(Number(ind1 + ind2 + ind3 + ind4) - 1) + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                } else if (this.cursorPosition > 4 && this.cursorPosition <= 7) {
                  if (Number(ind6 + ind7) > 1) {
                    if (Number(ind6 + ind7) < 11) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '0' + String(Number(ind6 + ind7) - 1) + ind8 + ind9 + ind10;
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + String(Number(ind6 + ind7) - 1) + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '12' + ind8 + ind9 + ind10;
                  }
                } else if (this.cursorPosition >= 8) {
                  if (Number(ind9 + ind10) > 1) {
                    if (Number(ind9 + ind10) < 11) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '0' + String(Number(ind9 + ind10) - 1);
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + String(Number(ind9 + ind10) - 1);
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '31';
                  }
                }
                // this.input.input.nativeElement.style.caretColor = 'transparent';

                // setTimeout(() => {
                //   this.setCaret();
                //   this.input.input.nativeElement.style.caretColor = 'auto';
                // }, 0);
              }
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                this.input.input.nativeElement.style.caretColor = 'transparent';
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }
          }
          if (e.type === 'keyup') {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
              this.setCaret();
              this.input.input.nativeElement.style.caretColor = 'auto';
              e.preventDefault();
              e.stopPropagation();
            }
          }
          break;
        case this.ddMMyyyy:
          if (e.type === 'keypress') {
            this.handleClick();
            if (
              (ind4 == '1' && ind5 == '_' && inputChar >= '3') ||
              (((ind1 == '0' && ind2 == '_') || (ind4 == '0' && ind5 == '_')) && inputChar == '0')
            ) {
              e.preventDefault();
            } else {
              if (ind1 == '3' && ind2 == '_' && inputChar >= '2') {
                e.preventDefault();
              }
            }
          }
          if (this.text.indexOf('_') === -1 && this.text !== '') {
            if (e.type === 'keydown') {
              if (e.key === 'ArrowUp') {
                if (this.cursorPosition >= 6) {
                  this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + String(Number(ind7 + ind8 + ind9 + ind10) + 1);
                }
                if (this.cursorPosition > 2 && this.cursorPosition <= 5) {
                  if (Number(ind4 + ind5) < 12) {
                    if (Number(ind4 + ind5) < 9) {
                      this.text = ind1 + ind2 + ind3 + '0' + String(Number(ind4 + ind5) + 1) + ind6 + ind7 + ind8 + ind9 + ind10;
                    } else {
                      this.text = ind1 + ind2 + ind3 + String(Number(ind4 + ind5) + 1) + ind6 + ind7 + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + '01' + ind6 + ind7 + ind8 + ind9 + ind10;
                  }
                }
                if (this.cursorPosition <= 2) {
                  if (Number(ind1 + ind2) < 31) {
                    if (Number(ind1 + ind2) < 9) {
                      this.text = '0' + String(Number(ind1 + ind2) + 1) + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                    } else {
                      this.text = String(Number(ind1 + ind2) + 1) + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = '01' + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                  }
                }
                // this.input.input.nativeElement.style.caretColor = 'transparent';
                // setTimeout(() => {
                //   this.setCaret();
                //   this.input.input.nativeElement.style.caretColor = 'auto';
                // }, 0);
              } else if (e.key === 'ArrowDown') {
                if (this.cursorPosition >= 6) {
                  this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + String(Number(ind7 + ind8 + ind9 + ind10) - 1);
                } else if (this.cursorPosition > 2 && this.cursorPosition <= 5) {
                  if (Number(ind4 + ind5) > 1) {
                    if (Number(ind4 + ind5) < 11) {
                      this.text = ind1 + ind2 + ind3 + '0' + String(Number(ind4 + ind5) - 1) + ind6 + ind7 + ind8 + ind9 + ind10;
                    } else {
                      this.text = ind1 + ind2 + ind3 + String(Number(ind4 + ind5) - 1) + ind6 + ind7 + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + '12' + ind6 + ind7 + ind8 + ind9 + ind10;
                  }
                } else if (this.cursorPosition <= 2) {
                  if (Number(ind1 + ind2) > 1) {
                    if (Number(ind1 + ind2) < 11) {
                      this.text = '0' + String(Number(ind1 + ind2) - 1) + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                    } else {
                      this.text = String(Number(ind1 + ind2) - 1) + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = '31' + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                  }
                }
                // this.input.input.nativeElement.style.caretColor = 'transparent';
                // setTimeout(() => {
                //   this.setCaret();
                //   this.input.input.nativeElement.style.caretColor = 'auto';
                // }, 0);
              }
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                this.input.input.nativeElement.style.caretColor = 'transparent';
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }
          }
          if (e.type === 'keyup') {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
              this.setCaret();
              this.input.input.nativeElement.style.caretColor = 'auto';
              e.preventDefault();
              e.stopPropagation();
            }
          }
          break;

        case this.yyyyddMM:
          if (e.type === 'keypress') {
            if (
              (ind9 === '1' && ind10 == '_' && inputChar >= '3') ||
              (((ind6 == '0' && ind7 == '_') || (ind9 == '0' && ind10)) && inputChar == '0')
            ) {
              e.preventDefault();
            } else if (ind6 == '3' && ind7 == '_' && inputChar >= '2') {
              e.preventDefault();
            }
            setTimeout(() => {
              this.handleClick();
            }, 0);
          }
          if (this.text.indexOf('_') === -1 && this.text !== '') {
            if (e.type === 'keydown') {
              if (e.key === 'ArrowUp') {
                if (this.cursorPosition <= 4) {
                  this.text = String(Number(ind1 + ind2 + ind3 + ind4) + 1) + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                }
                if (this.cursorPosition > 4 && this.cursorPosition <= 7) {
                  if (Number(ind6 + ind7) < 31) {
                    if (Number(ind6 + ind7) < 9) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '0' + String(Number(ind6 + ind7) + 1) + ind8 + ind9 + ind10;
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + String(Number(ind6 + ind7) + 1) + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '01' + ind8 + ind9 + ind10;
                  }
                }
                if (this.cursorPosition >= 8) {
                  if (Number(ind9 + ind10) < 12) {
                    if (Number(ind9 + ind10) < 9) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '0' + String(Number(ind9 + ind10) + 1);
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + String(Number(ind9 + ind10) + 1);
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '01';
                  }
                }
                // this.input.input.nativeElement.style.caretColor = 'transparent';
                // setTimeout(() => {
                //   this.setCaret();
                //   this.input.input.nativeElement.style.caretColor = 'auto';
                // }, 0);
              } else if (e.key === 'ArrowDown') {
                if (this.cursorPosition <= 4) {
                  this.text = String(Number(ind1 + ind2 + ind3 + ind4) - 1) + ind5 + ind6 + ind7 + ind8 + ind9 + ind10;
                } else if (this.cursorPosition > 4 && this.cursorPosition <= 7) {
                  if (Number(ind6 + ind7) > 1) {
                    if (Number(ind6 + ind7) < 11) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '0' + String(Number(ind6 + ind7) - 1) + ind8 + ind9 + ind10;
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + String(Number(ind6 + ind7) - 1) + ind8 + ind9 + ind10;
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + '31' + ind8 + ind9 + ind10;
                  }
                } else if (this.cursorPosition >= 8) {
                  if (Number(ind9 + ind10) > 1) {
                    if (Number(ind9 + ind10) < 11) {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '0' + String(Number(ind9 + ind10) - 1);
                    } else {
                      this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + String(Number(ind9 + ind10) - 1);
                    }
                  } else {
                    this.text = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + '12';
                  }
                }
                // this.input.input.nativeElement.style.caretColor = 'transparent';
                // setTimeout(() => {
                //   this.setCaret();
                //   this.input.input.nativeElement.style.caretColor = 'auto';
                // }, 0);
              }
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                this.input.input.nativeElement.style.caretColor = 'transparent';
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }
          }
          if (e.type === 'keyup') {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
              this.setCaret();
              this.input.input.nativeElement.style.caretColor = 'auto';
              e.preventDefault();
              e.stopPropagation();
            }
          }
          break;
        default:
          break;
      }
    }
  }
  handleClick() {
    if (this.input.input.nativeElement.selectionStart || this.input.input.nativeElement.selectionStart === 0) {
      this.cursorPosition = this.input.input.nativeElement.selectionStart;
    }
  }

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    }
  }

  setCaret() {
    this.setCaretPosition(this.input.input.nativeElement, this.cursorPosition);
  }
}
