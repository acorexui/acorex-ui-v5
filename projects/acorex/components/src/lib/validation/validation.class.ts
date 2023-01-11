
export type AXValidationRuleTypes = 'required' | 'regex' | 'callback' | 'custom';

export interface AXValidationRule {
  message?: string;
  type: AXValidationRuleTypes;
  value?: any;
  enabled?: boolean;
}

export interface AXValidationRuleResult {
  message?: string;
  result: boolean;
  target?: any;
}

export interface AXValidationResult {
  result: boolean;
  items?: AXValidationRuleResult[];
}


