import { Input, Output, EventEmitter, ChangeDetectorRef, Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { AXValidatableComponent } from '../base/element.class';

export type AXDataType = 'string' | 'number' | 'date' | 'boolean' | 'object';
export type AXControlType = 'textbox' | 'numberbox' | 'datePicker' | 'switch' | 'custom';

export interface AXPropertyDef {
  name: string;
  title: string;
  hint?: string;
  defaultValue?: any;
  editorClass: any;
  editorOptions?: any;
  visible?: boolean | (() => boolean);
  order?: number;
  row?: number;
  col?: number | AXPropertyColDef;
  filterOptions?: FilterModel;
  uniqueNumber?: number;
}

export interface FilterModel {
  operator?: any;
  filters?: FiltersModel[];
  truncateDate?: boolean;
  joinType?: string;
  ignoreCase?: boolean;
  logic?: 'and' | 'or';
  advance?: boolean;
}

export interface FiltersModel {
  name?: string;
  value?: string;
  field?: string;
  filterOptions: FilterModel;
}
export interface AXPropertyColDef {
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

export interface AXPropertyEditorDef {
  title: string;
  hint?: string;
  defaultValue?: any;
  editorClass: any;
  editorOptions?: any;
  visible?: boolean | (() => boolean);
  order?: number;
}

export interface AXPropertyConfig {
  property: AXPropertyDef;
  value: any;
}

export interface AXProperyEditorValueChangeEvent {
  property: AXPropertyDef;
  value: any;
}

@Directive()
export abstract class AXProperyEditorComponent<T> {
  readonly: boolean = false;

  private _initiated: boolean = false;
  private _valueBound: boolean = false;

  public get initiated(): boolean {
    return this._initiated && this._valueBound;
  }

  validatableComponentRegistered: Subject<AXValidatableComponent> = new Subject<AXValidatableComponent>();

  registerForValidationForm(component?: AXValidatableComponent) {
    this.validatableComponentRegistered.next(component);
  }

  @Output()
  valueChange: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  onRenderCompleted: EventEmitter<void> = new EventEmitter<void>();

  private _value: T;
  @Input()
  public get value(): T {
    return this._value;
  }

  public set value(v: T) {
    if (v !== this._value) {
      this._value = v;
      this.valueChange.emit(v);
      this.cdr.detectChanges();
      //TODO: find better solution
      setTimeout(() => {
        this._valueBound = true;
      }, 100);
    }
  }

  constructor(protected cdr: ChangeDetectorRef) {
    this.onRenderCompleted.subscribe(() => {
      this._initiated = true;
    });
  }

  uid: string;

  handleValueChange(v: T) {
    this.value = v;
  }
}

export class AXPropertyDecorator {
  cls: any;
  property: string;
  options: any;

  constructor(cls: any, property: string, options: any) {
    this.cls = cls;
    this.property = property;
    this.options = options;
  }
}

// @dynamic
export class AXPropertyDecorators {
  private static REGISTRY = new Array<AXPropertyDecorator>();

  static register(cls: string, property: string, options?: any) {
    const item = AXPropertyDecorators.REGISTRY.find((c) => c.cls === cls && c.property === property);
    if (item) {
      item.options = options;
    } else {
      AXPropertyDecorators.REGISTRY.push(new AXPropertyDecorator(cls, property, options));
    }
  }

  static has(cls: string, property: string): boolean {
    return AXPropertyDecorators.REGISTRY.some((c) => c.cls === cls && c.property === property);
  }

  static get(cls: string, property: string): AXPropertyDecorator {
    return AXPropertyDecorators.REGISTRY.find((c) => c.cls === cls && c.property === property);
  }

  static isValid(property: string): boolean {
    if (property) {
      return AXPropertyDecorators.REGISTRY.some((c) => c.property === property);
    }
    return false;
  }

  static getProperties(target: any): AXPropertyDecorator[] {
    const list: AXPropertyDecorator[] = [];
    const p: any[] = Array<any>();
    let superClass = Object.getPrototypeOf(target);
    while (superClass.constructor.name !== 'Object') {
      p.push(superClass.constructor);
      superClass = Object.getPrototypeOf(superClass);
    }
    list.push(...AXPropertyDecorators.REGISTRY.filter((c) => p.includes(c.cls.constructor)));
    return list;
  }
}

export function propertyEditor(options: AXPropertyEditorDef) {
  return (target: any, key: string) => {
    (options as any).name = key;
    AXPropertyDecorators.register(target, key, options);
  };
}
