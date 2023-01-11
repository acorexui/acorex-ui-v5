import { Component, ContentChildren, QueryList, Input, Output, EventEmitter, Injectable, ElementRef, Optional, Inject } from '@angular/core';
import { AXValidatableComponent } from '../base/element.class';
import { AXValidationRuleComponent } from './validation-rule.widget';
import { AXValidationRule, AXValidationRuleResult } from './validation.class';


@Injectable()
export abstract class AXValidation {

  abstract rules: AXValidationRule[];
  validateOn: 'blur' | 'change' | 'submit' = 'submit';
  showMessage: boolean;

  validate(value: any): Promise<AXValidationRuleResult> {
    if (!this.rules || this.rules.length === 0) {
      return Promise.resolve({ result: true });
    }
    return new Promise<AXValidationRuleResult>(resolve => {
      Promise.all(
        this.rules.map(c => {
          if (c instanceof AXValidationRuleComponent) {
            return c.validate(value);
          }
          else {
            const v = new AXValidationRuleComponent();
            Object.assign(v, c);
            return v.validate(value);
          }
        })
      ).then(d => {
        const error = d.find(c => c.result === false);
        if (error) {
          resolve(error);
        } else {
          resolve({ result: true });
        }
      });
    });
  }

}


@Component({
  selector: 'ax-validation',
  template: '<ng-content></ng-content>',
  providers: [{ provide: AXValidation, useExisting: AXValidationComponent }]
})
export class AXValidationComponent extends AXValidation {

  _getComponenets(): AXValidationRule[] {
    return Array.from(this.ref?.nativeElement.querySelectorAll('ax-validation-rule')).map(c => c["__axContext__"] as AXValidationRule);
  }

  constructor(
    @Inject(ElementRef)
    @Optional()
    private ref?: ElementRef
  ) {
    super();
  }


  @Output()
  rulesChange: EventEmitter<AXValidationRule[]> = new EventEmitter<AXValidationRule[]>();

  @Output()
  showMessage: boolean = true;

  private _rules: AXValidationRule[] = [];

  @Input()
  public get rules(): AXValidationRule[] {
    return this._rules;
  }
  public set rules(v: AXValidationRule[]) {
    this._rules = v;
    if (this.rulesChange) {
      this.rulesChange.emit(v);
    }
  }

  @Input()
  validateOn: 'blur' | 'change' | 'submit' = null;


  ngAfterContentInit() {
    if (this.rules && this.rules.length === 0) {
      this.rules.push(...this._getComponenets());
    }
  }
}
