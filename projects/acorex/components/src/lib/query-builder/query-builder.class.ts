import { AXDataEvent } from '../base/events.class';
import { AXTranslator } from '@acorex/core';

export type AXQueryBuilderDataType = 'string' | 'number' | 'date' | 'time' | 'datetime' | 'boolean';
export type AXQueryBuilderGroupItem = AXQueryBuilderGroup | AXQueryBuilderRule;
export type AXQueryBuilderControlType = 'textBox' | 'selectBox' | 'numberBox' | 'dataPicker' | 'lov' | 'boolean';
export type AXQueryBuilderStringType = 'simple' | 'sql' | 'sodoco' | 'elastic';

export class AXQueryBuilderControl {
  type: AXQueryBuilderControlType = 'textBox';
  options: any = {};
}

export class AXQueryBuilderRule {
  dataField: string;
  caption: string;
  dataType: AXQueryBuilderDataType;
  control: AXQueryBuilderControl;
  operator: string;
  value?: any;
  text?: string;
  dataFieldItem: any;
  valueItem?: any;
  onDemandLabel?: string;
}

export class AXQueryBuilderGroup {
  items: AXQueryBuilderGroupItem[];
  condition: string;
  queryString: string;
  queryStringElastic:string
}
export class AXQueryBuilderField {
  caption: string;
  dataField: string;
  dataType: AXQueryBuilderDataType;
  default?: any;
  options?: any;
}

export class AXQueryBuilderRuleEvent extends AXDataEvent<AXQueryBuilderRuleEvent> {
  items: AXQueryBuilderRule;
}

export class AXQueryBuilderGroupEvent extends AXDataEvent<AXQueryBuilderGroupEvent> {
  items?: AXQueryBuilderRule;
  groups: AXQueryBuilderGroup;
}

export class AXQueryBuilderPopup {
  name: string;
  type: string;
}
