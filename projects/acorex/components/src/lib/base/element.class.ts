import { Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, ContentChild, Directive } from '@angular/core';
import { AXValidationComponent, AXValidation } from '../validation/validation.component';
import { AXValidationRuleResult } from '../validation/validation.class';
import { AXHtmlUtil } from '@acorex/core';
import { AXEvent, AXHtmlEvent, AXValueEvent } from './events.class';

export type AXElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive()
export abstract class AXBaseComponent {
  @Input() cssClass: string;
  uid: string = AXHtmlUtil.getUID();
  constructor() {
  }
}


export class AXBaseInputChangeEvent extends AXValueEvent<any> {
  isUserChange?: boolean;
}

export interface AXBaseSizableComponent {
  size: AXElementSize;
}

export interface AXBaseInteractiveComponent {
  disabled: boolean;
  tabIndex: number;
}

export interface AXBaseInputComponent extends AXBaseInteractiveComponent {
  readonly: boolean;
  focus(): void;
}


export interface AXBaseValueComponent<T> extends AXBaseInputComponent {
  onValueChanged?: EventEmitter<AXValueEvent<T>>;
  valueChange?: EventEmitter<T>;
  value: T;
}

export interface AXBaseClickableComponent extends AXBaseInteractiveComponent {
  click: EventEmitter<AXHtmlEvent<MouseEvent>>;
}

@Directive()
export abstract class AXValidatableComponent extends AXBaseComponent {

  private __valueField: string = 'value';
  private __nativeElement: HTMLElement;
  private __validation: AXValidation;


  @Input()
  tabIndex: number = 0;

  protected initValidation(
    elementRef: ElementRef,
    valueField: string,
    validation: AXValidation
  ) {
    this.__nativeElement = elementRef.nativeElement;
    this.__valueField = valueField;
    this.__validation = validation;
    const value = this[this.__valueField]
    if ((!Array.isArray(value) && value) || (Array.isArray(value) && value.length > 0))
      this.validate();
  }

  get validation() {
    return this.__validation;
  }

  validate(): Promise<AXValidationRuleResult> {
    if (this.__validation !== undefined && (this.__validation.rules || []).length > 0) {
      const result = this.__validation.validate(this[this.__valueField]);
      result.then(c => {
        if (c.result) {
          this.clearValidationStyle(this.__nativeElement);
        }
        else {
          this.applyValidationStyle(this.__nativeElement, c);
        }
      });
      return result;
    }
    else {
      return Promise.resolve({ result: true });
    }
  }


  protected clearValidationStyle(element: HTMLElement, clear: boolean = false) {
    if (this.__validation !== undefined && (this.__validation.rules || []).length > 0) {
      const formGroup = element.closest('.form-group');
      const formItem = formGroup?.querySelector('.form-item') || element.closest('.form-item') || element.querySelector('.form-item');;
      const label = formGroup?.querySelector('.form-group-label');
      const parent = formItem?.parentElement || element.parentElement;

      formItem?.classList.remove('success-state');
      formItem?.classList.remove('error-state');
      //formItem?.classList.remove('required-state');
      if (!clear) {
        formItem?.classList.add('success-state');
      }
      // label?.classList.remove('error-text');
      if (parent.querySelector('span.error-text')) {
        parent.removeChild(parent.querySelector('span.error-text'));
      }
    }
  }

  protected applyValidationStyle(element: HTMLElement, v: AXValidationRuleResult): void {
    if (this.__validation !== undefined && (this.__validation.rules || []).length > 0) {
      const formGroup = element.closest('.form-group');
      const formItem = formGroup?.querySelector('.form-item') || element.closest('.form-item') || element.querySelector('.form-item');
      const label = formGroup?.querySelector('.form-group-label');
      const parent = formItem?.parentElement || element.parentElement;
      formItem?.classList.add('error-state');
      formItem?.classList.remove('success-state');
      if (parent.querySelector('span.error-text')) {
        parent.removeChild(parent.querySelector('span.error-text'));
      }
      if (this.__validation.showMessage) {
        const span = document.createElement('span');
        span.innerText = v.message;
        span.classList.add('ax', 'error-text');
        parent.appendChild(span);
      }
      // label?.classList.add('error-text');
    }
  }
}




@Directive()
export abstract class AXBaseTextComponent extends AXValidatableComponent implements AXBaseSizableComponent, AXBaseValueComponent<string> {

  ngAfterViewInit() {
    if (this.input) {
      this.input.nativeElement.onkeyup = (e) => {
        this.userChange = true;
        this.value = (e.target as any).value;
        this.onkey.emit(e);
      };
      this.input.nativeElement.onkeydown = (e) => {
        this.userChange = true;

        this.value = (e.target as any).value;
        this.onkey.emit(e);
      };
      this.input.nativeElement.onkeypress = (e) => {
        this.userChange = true;

        this.value = (e.target as any).value;
        this.onkey.emit(e);
      };
    }
  }


  ngAfterContentInit(): void {
    this.initValidation(this.ref, 'value', this.validation);
  }


  @Input()
  tabIndex: number = 0;

  @ViewChild('input', { static: true })
  @ContentChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  @ContentChild(AXValidation, { static: true })
  private _contentValidation: AXValidation;

  private _validation: AXValidation;

  @Input()
  public get validation(): AXValidation {
    return this._validation ? this._validation : this._contentValidation;
  }

  public set validation(v: AXValidation) {
    this._validation = v;
    this.initValidation(this.ref, 'value', v);
  }


  @Input()
  disabled: boolean = false;

  @Input()
  readonly: boolean = false;

  @Input()
  textAlign: 'right' | 'left' | null = null;

  @Input()
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  placeholder: string;


  @Input()
  autocomplete: "on" | "off";

  @Input()
  name: string;

  userChange: boolean = false;

  constructor(protected cdr: ChangeDetectorRef, protected ref: ElementRef) {
    super();
  }

  @Output()
  public onkey: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @Output()
  public onBlur: EventEmitter<AXHtmlEvent<Event>> = new EventEmitter<AXHtmlEvent<Event>>();

  @Output()
  public onFocus: EventEmitter<AXHtmlEvent<Event>> = new EventEmitter<AXHtmlEvent<Event>>();

  @Output()
  public onValueChanged: EventEmitter<AXBaseInputChangeEvent> = new EventEmitter<AXBaseInputChangeEvent>();

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();


  @Input()
  icon: string = '';

  @Input()
  allowClear: boolean = false;

  private _value: string;
  @Input()
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    if (v !== this._value) {
      const old = this._value;
      this._value = v;

      this.valueChange.emit(v);
      this.onValueChanged.emit({
        component: this,
        value: v,
        oldValue: old,
        isUserChange: this.userChange
      });
      this.userChange = false;
      this.clearValidationStyle(this.input.nativeElement, v ? false : true);
      this.cdr.detectChanges();
    }
  }

  focus() {
    this.input.nativeElement.focus();
  }

  clear() {
    this.userChange = true;

    this.value = null;
    this.input.nativeElement.value = null;
  }

  isFocused(): boolean {
    return this.input.nativeElement === document.activeElement;
  }

  setTextAlign() {
    if (this.textAlign === 'left') {
      return 'text-left';
    }
    if (this.textAlign === 'right') {
      return 'text-right';
    }
  }

  handleInputBlur(e: Event) {
    this.onBlur.emit({
      component: this,
      htmlElement: this.ref.nativeElement,
      htmlEvent: e
    });
  }

  handleInputFocus(e: Event) {
    this.onFocus.emit({
      component: this,
      htmlElement: this.ref.nativeElement,
      htmlEvent: e
    });
  }
}

@Directive()
export abstract class AXBaseButtonComponent extends AXBaseComponent implements AXBaseClickableComponent, AXBaseSizableComponent {

  @Input()
  disabled: boolean;

  @Output()
  click: EventEmitter<AXHtmlEvent<MouseEvent>> = new EventEmitter<AXHtmlEvent<MouseEvent>>();

  @Input()
  size: AXElementSize = "md";

  @Input()
  tabIndex: number = 0;

}

@Directive()
export abstract class AXBaseDropdownComponent extends AXBaseComponent implements AXBaseInteractiveComponent, AXBaseSizableComponent {

  @Input()
  disabled: boolean;

  @Input()
  size: AXElementSize;

  @Input()
  fitParent: boolean = true;

  @Input()
  tabIndex: number = 0;

  @Input()
  showDropDownButton: boolean = true;

  abstract close();
  abstract open();
}
