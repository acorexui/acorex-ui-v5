import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  Input,
  ViewChild,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ContentChild

} from '@angular/core';
import { AXBaseTextComponent, AXValidatableComponent } from '../base/element.class';
import { _ } from 'ag-grid-community';
import { AXValueEvent } from '../base/events.class';
import { AXTranslator } from '@acorex/core';

export class AXTimePickerItemChangedEvent {
  minute?: number;
  second?: number;
  hour?: number;
  time: string;

}
export class AXTimePickerChangedEvent extends AXValueEvent<AXTimePickerItemChangedEvent> { }

@Component({
  selector: 'ax-time-picker',
  templateUrl: './time-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style:'width: 100%' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXTimePickerComponent }]
})
export class AXTimePickerComponent extends AXBaseTextComponent implements OnInit {
  @Output()
  onValueChanged: EventEmitter<AXTimePickerChangedEvent> = new EventEmitter<AXTimePickerChangedEvent>();

  // @ViewChild('input', { static: true })
  // @ContentChild('input', { static: true })
  // input: ElementRef<HTMLInputElement>;

  @Input()
  timeType: any;

  type: string = 'HHmm';
  @Input()
  showCurentTime: boolean = false;

  clearDisabled: boolean = true;
  HHmmss: any = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
  HHmm: any = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
  HH: any = [/[0-2]/, /[0-9]/];
  hhmmss: any = [/[0-1]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
  hhmm: any = [/[0-1]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
  hh: any = [/[0-1]/, /[0-9]/];
  // TODO: apply am pm from locale
  hhmmssam: any = [/[0-1]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ' ', /[a|p|ق|ب]/, AXTranslator.get('dateTime.dayTime.m')];
  hhmmam: any = [/[0-1]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ' ', /[a|p|ق|ب]/, AXTranslator.get('dateTime.dayTime.m')];
  hham: any = [/[0-1]/, /[0-9]/, ' ', /[a|p|ق|ب]/, AXTranslator.get('dateTime.dayTime.m')];
  textValue: string = '';

  valueHam: string = '-- ' + AXTranslator.get('dateTime.dayTime.am');
  valueMam: string = '--:-- ' + AXTranslator.get('dateTime.dayTime.am');
  valueSam: string = '--:--:-- ' + AXTranslator.get('dateTime.dayTime.am');


  private _values: string;
  public get value(): string {
    return this._values;
  }
  public set value(v: string) {
    if (v === '' || v == null || v === '--:--:--' || v === '--:--' || v === '--' || v === this.valueSam || v === this.valueMam || v === this.valueHam) {
      this.clearDisabled = false;

      const old = this._values;
      switch (this.type) {
        case 'HHmmss':
          this.textValue = '--:--:--';
          break;
        case 'HHmm':
          this.textValue = '--:--';
          break;
        case 'HH':
          this.textValue = '--';
          break;
        case 'hhmmss':
          this.textValue = '--:--:--';
          break;
        case 'hhmm':
          this.textValue = '--:--';
          break;
        case 'hh':
          this.textValue = '--';
          break;
        case 'hhmmssam':
          this.textValue = this.valueSam;
          break;
        case 'hhmmam':
          this.textValue = this.valueMam;
          break;
        case 'hham':
          this.textValue = this.valueHam;
          break;
      }

      this._values = null;
      if (v !== old) {
        this.valueChange.emit(null);
        this.onValueChanged.emit({
          component: this,
          value: { hour: null, minute: null, second: null, time: null },
          oldValue: { time: old },
          htmlElement: this.ref.nativeElement
        });
      }
    } else {
      this.clearDisabled = true;
      if (this._values && v) {
        const old = this._values;
        const ind1 = v.charAt(0);
        const ind2 = v.charAt(1);
        const ind3 = v.charAt(2);
        const ind4 = v.charAt(3);
        const ind5 = v.charAt(4);
        const ind6 = v.charAt(5);
        const ind7 = v.charAt(6);
        const ind8 = v.charAt(7);
        const ind9 = v.charAt(8);
        const ind10 = v.charAt(9);

        const indOld4 = old.charAt(9);
        const indOld7 = old.charAt(9);
        const indOld10 = old.charAt(9);

        // handle hhmmssAm
        if (ind1 === '-' && ind2 !== '-' && this.timeType.mask === this.hhmmssam) {
          this.textValue = '0' + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + AXTranslator.get('dateTime.dayTime.m');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 2);
            this.cursorPosition = 2;
          }, 0);
        }
        if (ind4 === '-' && ind5 !== '-' && this.timeType.mask === this.hhmmssam) {
          this.textValue = ind1 + ind2 + ind3 + '0' + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + AXTranslator.get('dateTime.dayTime.m');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 5);
            this.cursorPosition = 5;
          }, 0);
        }
        if (ind7 === '-' && ind8 !== '-' && this.timeType.mask === this.hhmmssam) {
          this.textValue = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + '0' + ind8 + ind9 + ind10 + AXTranslator.get('dateTime.dayTime.m');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 8);
            this.cursorPosition = 8;
          }, 0);
        }
        if (indOld10 === '-' && this.timeType.mask === this.hhmmssam) {
          this.textValue = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + AXTranslator.get('dateTime.dayTime.am');
        }

        //
        if (ind1 === '-' && ind2 !== '-' && this.timeType.mask === this.hhmmam) {
          this.textValue = '0' + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + AXTranslator.get('dateTime.dayTime.m');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 2);
            this.cursorPosition = 2;
          }, 0);
        }
        if (ind4 === '-' && ind5 !== '-' && this.timeType.mask === this.hhmmam) {
          this.textValue = ind1 + ind2 + ind3 + '0' + ind5 + ind6 + ind7 + AXTranslator.get('dateTime.dayTime.m');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 5);
            this.cursorPosition = 5;
          }, 0);
        }
        if (indOld7 === '-' && this.timeType.mask === this.hhmmam) {
          this.textValue = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + AXTranslator.get('dateTime.dayTime.am');
        }

        //
        if (ind1 === '-' && ind2 !== '-' && this.timeType.mask === this.hham) {
          this.textValue = '0' + ind2 + ind3 + ind4 + AXTranslator.get('dateTime.dayTime.m');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 2);
            this.cursorPosition = 2;
          }, 0);
        }
        if (indOld4 === '-' && this.timeType.mask === this.hham) {
          this.textValue = ind1 + ind2 + ind3 + AXTranslator.get('dateTime.dayTime.am');
        }

        //
        if (ind1 === '-' && ind2 !== '-' && (this.timeType.mask === this.hhmmss || this.timeType.mask === this.HHmmss)) {
          this.textValue = '0' + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 2);
            this.cursorPosition = 2;
          }, 0);
        }
        if (ind4 === '-' && ind5 !== '-' && (this.timeType.mask === this.hhmmss || this.timeType.mask === this.HHmmss)) {
          this.textValue = ind1 + ind2 + ind3 + '0' + ind5 + ind6 + ind7 + ind8;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 6);
            this.cursorPosition = 6;
          }, 0);
        }
        if (ind7 === '-' && ind8 !== '-' && (this.timeType.mask === this.hhmmss || this.timeType.mask === this.HHmmss)) {
          this.textValue = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + '0' + ind8;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 9);
            this.cursorPosition = 9;
          }, 0);
        }

        //
        if (ind1 === '-' && ind2 !== '-' && (this.timeType.mask === this.hhmm || this.timeType.mask === this.HHmm)) {
          this.textValue = '0' + ind2 + ind3 + ind4 + ind5;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 2);
            this.cursorPosition = 2;
          }, 0);
        }
        if (ind4 === '-' && ind5 !== '-' && (this.timeType.mask === this.hhmm || this.timeType.mask === this.HHmm)) {
          this.textValue = ind1 + ind2 + ind3 + '0' + ind5;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 5);
            this.cursorPosition = 5;
          }, 0);
        }

        //
        if (ind1 === '-' && ind2 !== '-' && (this.timeType.mask === this.hh || this.timeType.mask === this.HH)) {
          this.textValue = '0' + ind2;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 2);
            this.cursorPosition = 2;
          }, 0);
        }
      }
      if (v !== this._values) {
        const old = this._values;
        this.textValue = v;
        this._values = (v && v.indexOf('-') === -1) ? v : null;
        if (v.indexOf('-') === -1) {
          this.valueChange.emit(v);
          this.onValueChanged.emit({
            component: this,
            value: {
              time: v,
              hour: Number(v[0] + v[1]),
              minute: v[3] && v[3] !== AXTranslator.get('dateTime.dayTime.a') && v[3] !== AXTranslator.get('dateTime.dayTime.p') ? Number(v[3] + v[4]) : null,
              second: v[6] && v[6] !== AXTranslator.get('dateTime.dayTime.a') && v[6] !== AXTranslator.get('dateTime.dayTime.p') ? Number(v[6] + v[7]) : null
            },
            oldValue: { time: old },
            htmlElement: this.ref.nativeElement
          });
          this.cdr.detectChanges();
          this.clearValidationStyle(this.input.nativeElement);
        }
      }
    }
  }

  cursorPosition: number = 0;

  constructor(protected cdr: ChangeDetectorRef, ref: ElementRef) {
    super(cdr, ref);
    
    this.timeType = 'HHmm';
  }
  clearValue() {
    this.clear();
    this.handleInputFocus();
  }

  ngOnInit(): void {
    switch (this.timeType) {
      case 'HHmmss':
        this.type = 'HHmmss';
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.HHmmss,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--:--:--';
        break;
      case 'HHmm':
        this.type = 'HHmm';
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.HHmm,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--:--';
        break;
      case 'HH':
        this.type = 'HH';
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.HH,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--';
        break;
      case 'hhmmss':
        this.type = 'hhmmss';
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhmmss,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--:--:--';
        break;
      case 'hhmm':
        this.type = 'hhmm';
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhmm,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--:--';
        break;
      case 'hh':
        this.type = 'hh';

        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hh,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--';
        break;
      case 'hhmmssam':
        this.type = 'hhmmssam';

        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhmmssam,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : this.valueSam;
        break;
      case 'hhmmam':
        this.type = 'hhmmam';

        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhmmam,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : this.valueMam;

        break;
      case 'hham':
        this.type = 'hham';

        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hham,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : this.valueHam;
        break;
      default:
        this.type = 'HHmm';
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.HHmm,
          keepCharPositions: true,
          placeholderChar: '-'
        };
        this.textValue = this.value ? this.value : '--:--';
        break;

    }
    if (this.showCurentTime === true) {
      const hour = new Date().getHours() > 10 ? new Date().getHours() : '0' + new Date().getHours();
      let amHour: any;

      if (new Date().getHours() > 10) {
        if (new Date().getHours() > 12) {
          if (new Date().getHours() - 12 < 10) {
            amHour = '0' + (new Date().getHours() - 12);
          } else {
            amHour = new Date().getHours();
          }
        } else {
          amHour = new Date().getHours();
        }
      } else {
        amHour = '0' + new Date().getHours();
      }

      const min = new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes();
      const sec = new Date().getSeconds() > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds();
      if (this.type === 'hh' || this.type === 'hhmm' || this.type === 'hhmmss' || this.type === 'hhmmssam') {
        if (hour >= 12) {
          this.value = amHour + ':' + min + ':' + sec + ' ' + AXTranslator.get('dateTime.dayTime.pm');
        } else {
          this.value = amHour + ':' + min + ':' + sec + ' ' + AXTranslator.get('dateTime.dayTime.am');
        }
      } else if (this.type === 'hham') {
        if (hour >= 12) {
          this.value = amHour + ' ' + AXTranslator.get('dateTime.dayTime.pm');
        } else {
          this.value = amHour + ' ' + AXTranslator.get('dateTime.dayTime.am');
        }
      } else if (this.type === 'hhmmam') {
        if (hour >= 12) {
          this.value = amHour + ':' + min + ' ' + AXTranslator.get('dateTime.dayTime.pm');
        } else {
          this.value = amHour + ':' + min + ' ' + AXTranslator.get('dateTime.dayTime.am');
        }
      } else {
        this.value = hour + ':' + min + ':' + sec;
      }
    }
  }

  onStartfocus() {
    this.input.nativeElement.style.caretColor = 'transparent';
    setTimeout(() => {
      this.setCaretPosition(this.input.nativeElement, 0);
      this.cursorPosition = 0;
      this.input.nativeElement.style.caretColor = 'auto';
    }, 0);
  }

  handleInputFocus() {
    this.onStartfocus();
    this.input.nativeElement.focus();
  }
  handleInputBlur(e) {
    if (this.textValue.indexOf('-') !== -1) {
      switch (this.type) {
        case 'HHmmss':
          this.textValue = '--:--:--';
          break;
        case 'HHmm':
          this.textValue = '--:--';
          break;
        case 'HH':
          this.textValue = '--';
          break;
        case 'hhmmss':
          this.textValue = '--:--:--';
          break;
        case 'hhmm':
          this.textValue = '--:--';
          break;
        case 'hh':
          this.textValue = '--';
          break;
        case 'hhmmssam':
          this.textValue = this.valueSam;
          break;
        case 'hhmmam':
          this.textValue = this.valueMam;
          break;
        case 'hham':
          this.textValue = this.valueHam;
          break;
      }
    }
  }

  handleKeyPress(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    const firstChar = this.textValue.charAt(0);
    const secondChar = this.textValue.charAt(1);

    setTimeout(() => {
      if (this.input.nativeElement.selectionStart || this.input.nativeElement.selectionStart === 0) {
        this.cursorPosition = this.input.nativeElement.selectionStart;
        // this.cursorPosition += 1 ;
      }
    }, 0);

    if (firstChar === '2') {
      if (secondChar === '' || this.textValue.charAt(1) >= '4' || this.cursorPosition < 3) {
        if (inputChar >= '4') {
          event.preventDefault();
        }
      }
    }
    if (
      this.timeType.mask === this.hhmmss ||
      this.timeType.mask === this.hhmm ||
      this.timeType.mask === this.hh ||
      this.timeType.mask === this.hhmmssam ||
      this.timeType.mask === this.hhmmam ||
      this.timeType.mask === this.hham
    ) {
      if (firstChar === '1') {
        if (secondChar === '' || this.textValue.charAt(1) >= '3' || this.cursorPosition < 3) {
          if (inputChar >= '3') {
            event.preventDefault();
          }
        }
      }
    }
    if (inputChar === '-') {
      event.preventDefault();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.input.nativeElement.style.caretColor = 'auto';
      event.preventDefault();
      event.stopPropagation();
    }
    // up & down button
    if (event.key === 'ArrowUp') {
      this.setCaret();
    }
    if (event.key === 'ArrowDown') {
      this.setCaret();
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      return false;
    }

    // left & right Button
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (this.input.nativeElement.selectionStart || this.input.nativeElement.selectionStart === 0) {
        this.cursorPosition = this.input.nativeElement.selectionStart;
      }
    }

    // home button
    if (event.key === 'Home') {
      this.cursorPosition = 0;
    }

    // end button
    if (event.key === 'End') {
      if (this.timeType.mask === this.hhmmssam || this.timeType.mask === this.hhmmam || this.timeType.mask === this.hham) {
        if (this.timeType.mask === this.hhmmssam) {
          this.cursorPosition = 9;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
            this.input.nativeElement.style.caretColor = 'auto';
          }, 0);
        }
        if (this.timeType.mask === this.hhmmam) {
          this.cursorPosition = 6;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
            this.input.nativeElement.style.caretColor = 'auto';
          }, 0);
        }
        if (this.timeType.mask === this.hham) {
          this.cursorPosition = 3;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
            this.input.nativeElement.style.caretColor = 'auto';
          }, 0);
        }
      } else {
        this.cursorPosition = this.textValue.length;
      }
    }

    // backspace Control
    if (event.key === 'Backspace') {
      const ind1 = this.textValue.charAt(0);
      const ind2 = this.textValue.charAt(1);
      const ind3 = this.textValue.charAt(2);
      const ind4 = this.textValue.charAt(3);
      const ind5 = this.textValue.charAt(4);
      const ind6 = this.textValue.charAt(5);
      const ind7 = this.textValue.charAt(6);
      const ind8 = this.textValue.charAt(7);
      const ind9 = this.textValue.charAt(8);
      const ind10 = this.textValue.charAt(9);
      if (this.timeType.mask === this.hhmmssam) {
        if (ind10 === '-') {
          this.textValue = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + AXTranslator.get('dateTime.dayTime.am');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 0);
            this.cursorPosition = 0;
          }, 0);
        }
      }
      if (this.timeType.mask === this.hhmmam) {
        if (ind7 === '-') {
          this.textValue = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + AXTranslator.get('dateTime.dayTime.am');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 0);
            this.cursorPosition = 0;
          }, 0);
        }
      }
      if (this.timeType.mask === this.hham) {
        if (ind4 === '-') {
          this.textValue = ind1 + ind2 + ind3 + AXTranslator.get('dateTime.dayTime.am');
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 0);
            this.cursorPosition = 0;
          }, 0);
        }
      }

      if (this.textValue.length <= 0) {
        this.cursorPosition = 0;
      } else {
        this.cursorPosition -= 1;
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'End') {
      if (this.timeType.mask === this.hhmmssam || this.timeType.mask === this.hhmmam || this.timeType.mask === this.hham) {
        this.input.nativeElement.style.caretColor = 'transparent';
      } else {
        this.input.nativeElement.style.caretColor = 'auto';
      }
    }

    let newValue = this.textValue;

    const ind1 = newValue.charAt(0);
    const ind2 = newValue.charAt(1);
    const ind3 = this.textValue.charAt(2);
    const ind4 = this.textValue.charAt(3);
    const ind5 = this.textValue.charAt(4);
    const ind6 = this.textValue.charAt(5);
    const ind7 = this.textValue.charAt(6);
    const ind8 = this.textValue.charAt(7);
    const ind9 = this.textValue.charAt(8);
    const ind10 = this.textValue.charAt(9);
    const ind11 = this.textValue.charAt(10);

    // up key
    if (event.key === 'ArrowUp') {
      // hour
      if (this.cursorPosition <= 2) {
        const hourind = ind1 + ind2;
        const newHour = +hourind + 1;
        newValue = newHour.toString();
        if (
          this.timeType.mask === this.hhmmss ||
          this.timeType.mask === this.hhmm ||
          this.timeType.mask === this.hh ||
          this.timeType.mask === this.hhmmssam ||
          this.timeType.mask === this.hhmmam ||
          this.timeType.mask === this.hham
        ) {
          if (hourind === '--') {
            newValue = '0';
          }
          if (ind1 !== '-' && hourind === ind1 + '-') {
            newValue = '0';
          }
          if (ind2 !== '-' && hourind === '-' + ind2) {
            newValue = '0';
          }
          if (+newValue > 12) {
            newValue = '01';
          } else if (+newValue < 10) {
            newValue = '0' + newValue;
          }
        } else {
          if (hourind === '--') {
            newValue = '0';
          }
          if (ind1 !== '-' && hourind === ind1 + '-') {
            newValue = '0';
          }
          if (ind2 !== '-' && hourind === '-' + ind2) {
            newValue = '0';
          }
          if (+newValue > 23) {
            newValue = '00';
          } else if (+newValue < 10) {
            newValue = '0' + newValue;
          }
        }
        const afterHourind = ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const hour = newValue.toString() + afterHourind;
        this.textValue = hour;
      }
      // minute
      if (this.cursorPosition >= 3 && this.cursorPosition <= 5) {
        const hourind = ind4 + ind5;
        const newHour = +hourind + 1;

        newValue = newHour.toString();
        if (hourind === '--') {
          newValue = '0';
        }
        if (ind4 !== '-' && hourind === ind4 + '-') {
          newValue = '0';
        }
        if (ind5 !== '-' && hourind === '-' + ind5) {
          newValue = '0';
        }
        if (+newValue > 59) {
          newValue = '00';
        } else if (+newValue < 10) {
          newValue = '0' + newValue;
        }
        const beforeHourind = ind1 + ind2 + ind3;
        const afterHourind = ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const minute = beforeHourind + newValue.toString() + afterHourind;
        this.textValue = minute;
      }

      // second
      if (this.cursorPosition >= 6 && this.cursorPosition <= 8) {
        const secondind = ind7 + ind8;
        const newSecond = +secondind + 1;

        newValue = newSecond.toString();
        if (secondind === '--') {
          newValue = '0';
        }
        if (ind7 !== '-' && secondind === ind7 + '-') {
          newValue = '0';
        }
        if (ind8 !== '-' && secondind === '-' + ind8) {
          newValue = '0';
        }
        if (+newValue > 59) {
          newValue = '00';
        } else if (+newValue < 10) {
          newValue = '0' + newValue;
        }
        const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
        const afterHourind = ind9 + ind10 + ind11;
        const second = beforeHourind + newValue.toString() + afterHourind;
        this.textValue = second;
      }

      // type am/PM
      if (this.timeType.mask === this.hhmmssam) {
        if (this.cursorPosition > 8) {
          let typeind = ind10.toString();

          const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9;
          const afterHourind = ind11;

          if (ind10 === AXTranslator.get('dateTime.dayTime.p')) {
            typeind = AXTranslator.get('dateTime.dayTime.a');
          } else if (ind10 === AXTranslator.get('dateTime.dayTime.a')) {
            typeind = AXTranslator.get('dateTime.dayTime.p');
          }
          this.textValue = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hhmmam) {
        if (this.cursorPosition >= 6) {
          let typeind = ind7.toString();

          const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
          const afterHourind = ind8;

          if (ind7 === AXTranslator.get('dateTime.dayTime.p')) {
            typeind = AXTranslator.get('dateTime.dayTime.a');
          } else if (ind7 === AXTranslator.get('dateTime.dayTime.a')) {
            typeind = AXTranslator.get('dateTime.dayTime.p');
          }
          this.textValue = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hham) {
        if (this.cursorPosition >= 3) {
          let typeind2 = ind4.toString();

          const beforeHourind = ind1 + ind2 + ind3;
          const afterHourind = ind5;

          if (ind4 === AXTranslator.get('dateTime.dayTime.p')) {
            typeind2 = AXTranslator.get('dateTime.dayTime.a');
          } else if (ind4 === AXTranslator.get('dateTime.dayTime.a')) {
            typeind2 = AXTranslator.get('dateTime.dayTime.p');
          }
          this.textValue = beforeHourind + typeind2 + afterHourind;
        }
      }
    }

    // key down
    if (event.key === 'ArrowDown') {
      // hour
      if (this.cursorPosition <= 2) {
        const hourind = ind1 + ind2;
        const newHour = +hourind - 1;

        newValue = newHour.toString();
        if (
          this.timeType.mask === this.hhmmss ||
          this.timeType.mask === this.hhmm ||
          this.timeType.mask === this.hh ||
          this.timeType.mask === this.hhmmssam ||
          this.timeType.mask === this.hhmmam ||
          this.timeType.mask === this.hham
        ) {
          if (hourind === '--') {
            newValue = '0';
          }
          if (ind1 !== '-' && hourind === ind1 + '-') {
            newValue = '0';
          }
          if (ind2 !== '-' && hourind === '-' + ind2) {
            newValue = '0';
          }
          if (+newValue < 1) {
            newValue = '12';
          } else if (+newValue < 10) {
            newValue = '0' + newValue;
          }
        } else {
          if (hourind === '--') {
            newValue = '0';
          }
          if (ind1 !== '-' && hourind === ind1 + '-') {
            newValue = '0';
          }
          if (ind2 !== '-' && hourind === '-' + ind2) {
            newValue = '0';
          }
          if (+newValue < 0) {
            newValue = '23';
          } else if (+newValue < 10) {
            newValue = '0' + newValue;
          }
        }
        const afterHourIndex = ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const hour = newValue.toString() + afterHourIndex;
        this.textValue = hour;
      }
      // minute
      if (this.cursorPosition >= 3 && this.cursorPosition <= 5) {
        const minuteind = ind4 + ind5;
        const newMinute = +minuteind - 1;

        newValue = newMinute.toString();
        if (minuteind === '--') {
          newValue = '0';
        }
        if (ind4 !== '-' && minuteind === ind4 + '-') {
          newValue = '0';
        }
        if (ind5 !== '-' && minuteind === '-' + ind5) {
          newValue = '0';
        }
        if (minuteind === '--') {
          newValue = '0';
        }
        if (+newValue < 0) {
          newValue = '59';
        } else if (+newValue < 10) {
          newValue = '0' + newValue;
        }
        const beforeMinuteIndex = ind1 + ind2 + ind3;
        const afterMinuteIndex = ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const minute = beforeMinuteIndex + newValue.toString() + afterMinuteIndex;
        this.textValue = minute;
      }

      // second
      if (this.cursorPosition >= 6 && this.cursorPosition <= 8) {
        const secondIndex = ind7 + ind8;
        const newSecond = +secondIndex - 1;

        newValue = newSecond.toString();
        if (secondIndex === '--') {
          newValue = '0';
        }
        if (ind7 !== '-' && secondIndex === ind7 + '-') {
          newValue = '0';
        }
        if (ind8 !== '-' && secondIndex === '-' + ind8) {
          newValue = '0';
        }
        if (secondIndex === '--') {
          newValue = '0';
        }
        if (+newValue < 0) {
          newValue = '59';
        } else if (+newValue < 10) {
          newValue = '0' + newValue;
        }
        const beforesecondIndex = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
        const aftersecondIndex = ind9 + ind10 + ind11;
        const second = beforesecondIndex + newValue.toString() + aftersecondIndex;
        this.textValue = second;
      }

      // type
      if (this.timeType.mask === this.hhmmssam) {
        if (this.cursorPosition > 8) {
          let typeind = ind10.toString();

          const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9;
          const afterHourind = ind11;

          if (ind10 === AXTranslator.get('dateTime.dayTime.p')) {
            typeind = AXTranslator.get('dateTime.dayTime.a');
          } else if (ind10 === AXTranslator.get('dateTime.dayTime.a')) {
            typeind = AXTranslator.get('dateTime.dayTime.p');
          }
          this.textValue = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hhmmam) {
        if (this.cursorPosition >= 6) {
          let typeind = ind7.toString();

          const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
          const afterHourind = ind8;

          if (ind7 === AXTranslator.get('dateTime.dayTime.p')) {
            typeind = AXTranslator.get('dateTime.dayTime.a');
          } else if (ind7 === AXTranslator.get('dateTime.dayTime.a')) {
            typeind = AXTranslator.get('dateTime.dayTime.p');
          }
          this.textValue = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hham) {
        if (this.cursorPosition >= 3) {
          let typeind2 = ind4.toString();

          const beforeHourind = ind1 + ind2 + ind3;
          const afterHourind = ind5;
          //TO DO this is wrong check index
          if (ind4 === AXTranslator.get('dateTime.dayTime.p')) {
            typeind2 = AXTranslator.get('dateTime.dayTime.a');
          } else if (ind4 === AXTranslator.get('dateTime.dayTime.a')) {
            typeind2 = AXTranslator.get('dateTime.dayTime.p');
          }
          this.textValue = beforeHourind + typeind2 + afterHourind;
        }
      }
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.input.nativeElement.style.caretColor = 'transparent';
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    if (event.key === 'Delete') {
      event.preventDefault();
    }
  }

  handleClick(event: KeyboardEvent) {
    if (this.input.nativeElement.selectionStart || this.input.nativeElement.selectionStart === 0) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
    }
  }

  doGetCaretPosition(ctrl) {
    let CaretPos = 0;
    if (ctrl.selectionStart || ctrl.selectionStart === 0) {
      CaretPos = ctrl.selectionStart;
      return CaretPos;
    }
  }

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  setCaret() {
    this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
  }
}
