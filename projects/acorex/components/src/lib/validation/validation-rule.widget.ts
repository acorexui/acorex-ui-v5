import { Component, ElementRef, Inject, inject, Input, Optional } from '@angular/core';
import { AXValidationRuleResult, AXValidationRule, AXValidationRuleTypes } from './validation.class';
import { AXTranslator } from '@acorex/core';


// @dynamic
export class AXValidationRules {
  private static registredRules: { name: string, rule: AXValidationRule }[] = [];

  public static addRule(name: string, rule: AXValidationRule) {
    const exists = AXValidationRules.get(name);
    if (exists) {
      exists.rule = rule;
    }
    else {
      AXValidationRules.registredRules.push({
        name,
        rule
      });
    }
  }

  public static get(name: string) {
    return this.registredRules.find(c => c.name === name);
  }
}


@Component({
  selector: 'ax-validation-rule',
  template: ''
})
export class AXValidationRuleComponent implements AXValidationRule {
  @Input()
  type: AXValidationRuleTypes = 'required';
  @Input()
  message: string;
  @Input()
  value: any;

  @Input()
  enabled: boolean = true;


  constructor(
    @Inject(ElementRef)
    @Optional()
    private ref?: ElementRef) {
    if (ref)
      ref.nativeElement["__axContext__"] = this;
  }

  validate(value: any): Promise<AXValidationRuleResult> {
    if (this.enabled === false) {
      return Promise.resolve({ result: true });
    }
    const regRule = AXValidationRules.get(this.type);
    if (regRule) {
      return this.internalValidate(regRule.rule.type, value, this.message || regRule.rule.message, regRule.rule.value);
    }
    else {
      return this.internalValidate(this.type, value, this.message, this.value);
    }
  }


  private internalValidate(type: string, value?: any, message?: string, ruleValue?: any): Promise<AXValidationRuleResult> {
    return new Promise<AXValidationRuleResult>(resolve => {
      switch (type) {
        case 'required':
          resolve({
            message: message || AXTranslator.get('validation.messages.required'),
            result: value != null && value != '' && (!Array.isArray(value) || (Array.isArray(value) && value.length > 0))
          });
          break;
        case 'regex':
          const ex = new RegExp(ruleValue);
          resolve({
            message: message || AXTranslator.get('validation.messages.regex'),
            result: ex.test(value)
          });
          break;
        case 'custom':
        case 'callback':
          if (typeof ruleValue === 'function') {
            const res: any = {};
            res.message = message;
            const val = ruleValue({ value, message });
            if (val instanceof Promise) {
              val.then(c => {
                res.result = c;
              }).catch(c => {
                res.result = false;
              }).finally(() => {
                resolve(res);
              });
            }
            else {
              res.result = val;
              resolve(res);
            }
          }
          else {
            resolve({ result: true });
          }
          break;
        default:
          resolve({ result: true });
      }
    });
  }
}
