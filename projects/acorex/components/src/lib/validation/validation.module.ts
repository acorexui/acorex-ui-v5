import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXValidationFormComponent } from './validation-form.component';
import { AXValidationComponent } from './validation.component';
import { AXValidationRuleComponent, AXValidationRules } from './validation-rule.widget';
import { AXTranslator } from '@acorex/core';


@NgModule({
  declarations: [AXValidationFormComponent, AXValidationComponent, AXValidationRuleComponent],
  imports: [CommonModule],
  exports: [AXValidationFormComponent, AXValidationComponent, AXValidationRuleComponent],
  providers: []
})
export class AXValidationModule {
  constructor() {
    AXValidationRules.addRule('email', {
      message: AXTranslator.get('validation.messages.email'),
      type: 'regex',
      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    })
    AXValidationRules.addRule('phone', {
      message: AXTranslator.get('validation.messages.phone'),
      type: 'regex',
      value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    })
  }
}
