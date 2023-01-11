import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { AXQueryBuilderRule, AXQueryBuilderGroup, AXQueryBuilderRuleEvent, AXQueryBuilderControl } from './query-builder.class';
import { AXTranslator } from '@acorex/core';
import { AXSelectBoxComponent } from '../selectbox/selectbox.component';
import { AXTextBoxComponent } from '../textbox/textbox.component';
import { AXValidationFormComponent } from '../validation/validation-form.component';

@Component({
  selector: 'ax-query-rule',
  templateUrl: 'query-builder-rule.component.html',
  host: { class: 'ax ax-query-rule' },
  encapsulation: ViewEncapsulation.None
})
export class AXQueryBuilderRuleComponent implements OnInit {
  @ViewChild('selectBox') selectBox: AXSelectBoxComponent;
  @ViewChild('selectBoxValue') selectBoxValue: AXSelectBoxComponent;

  @ViewChild('selectBoxBoolean') selectBoxBoolean: AXSelectBoxComponent;

  @ViewChild('textBoxNameValue') textBoxNameValue: AXTextBoxComponent;
  @ViewChild(AXValidationFormComponent) form: AXValidationFormComponent;
  @Input()
  isEditing: boolean = true;

  @Input()
  rule: AXQueryBuilderRule;

  @Input()
  parent: AXQueryBuilderGroup;

  @Input()
  mode: 'new' | 'edit' = 'new';

  @Input()
  fields: any[] = [];

  @Output()
  onRuleDelete: EventEmitter<AXQueryBuilderRuleEvent> = new EventEmitter<AXQueryBuilderRuleEvent>();

  @Output()
  ruleChanged: EventEmitter<AXQueryBuilderRuleEvent> = new EventEmitter<AXQueryBuilderRuleEvent>();

  showValue: boolean = false;

  isOnDemandLabel: boolean = false;

  showSelectBox: boolean = true;
  showOperatorSelectBox: boolean = true;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.rule.onDemandLabel) {
      this.isOnDemandLabel = true;
    }
  }
  provideDataBoolean = (e) => {
    return new Promise((resolve) => {
      resolve([
        {
          value: 'true',
          text: AXTranslator.get('queryBuilder.true')
        },
        {
          value: 'false',
          text: AXTranslator.get('queryBuilder.false')
        }
      ]);
    });
  };

  saveRule() {
    this.form.validate().then((c) => { });
  }

  provideDataOperator = (e) => {
    return new Promise((resolve) => {
      if (this.rule.dataType === 'string') {
        if (this.rule && this.rule.control && this.rule.control.type && this.rule.control.type == 'selectBox') {
          if (this.rule.control.options.mode == 'multiple') {
            resolve([
              {
                value: 'contains',
                text: AXTranslator.get('queryBuilder.contains')
              },
              {
                value: 'not-contains',
                text: AXTranslator.get('queryBuilder.not-contains')
              },
              {
                value: 'contains-all',
                text: AXTranslator.get('queryBuilder.contains-all')
              },
              {
                value: 'null',
                text: AXTranslator.get('queryBuilder.null')
              },
              {
                value: 'not-null',
                text: AXTranslator.get('queryBuilder.not-null')
              }
            ]);
          } else {
            resolve([
              {
                value: 'equal',
                text: AXTranslator.get('queryBuilder.equal')
              },
              {
                value: 'not-equal',
                text: AXTranslator.get('queryBuilder.not-equal')
              },
              {
                value: 'null',
                text: AXTranslator.get('queryBuilder.null')
              },
              {
                value: 'not-null',
                text: AXTranslator.get('queryBuilder.not-null')
              }
            ]);
          }
        } else {
          resolve([
            {
              value: 'equal',
              text: AXTranslator.get('queryBuilder.equal')
            },
            {
              value: 'contains',
              text: AXTranslator.get('queryBuilder.contains')
            },
            {
              value: 'start-with',
              text: AXTranslator.get('queryBuilder.start-with')
            },
            {
              value: 'end-with',
              text: AXTranslator.get('queryBuilder.end-with')
            },
            {
              value: 'not-equal',
              text: AXTranslator.get('queryBuilder.not-equal')
            },
            {
              value: 'null',
              text: AXTranslator.get('queryBuilder.null')
            },
            {
              value: 'not-null',
              text: AXTranslator.get('queryBuilder.not-null')
            }
          ]);
        }
      }
      if (this.rule.dataType === 'number') {
        resolve([
          {
            value: 'equal',
            text: AXTranslator.get('queryBuilder.equal')
          },
          {
            value: 'gt',
            text: AXTranslator.get('queryBuilder.greater-than')
          },
          {
            value: 'gte',
            text: AXTranslator.get('queryBuilder.greater-than-equal')
          },
          {
            value: 'lt',
            text: AXTranslator.get('queryBuilder.less-than')
          },
          {
            value: 'lte',
            text: AXTranslator.get('queryBuilder.less-than-equal')
          },
          {
            value: 'not-equal',
            text: AXTranslator.get('queryBuilder.not-equal')
          },
          {
            value: 'null',
            text: AXTranslator.get('queryBuilder.null')
          },
          {
            value: 'not-null',
            text: AXTranslator.get('queryBuilder.not-null')
          }
        ]);
      }
      if (this.rule.dataType === 'boolean') {
        resolve([
          {
            value: 'equal',
            text: AXTranslator.get('queryBuilder.equal')
          },
          {
            value: 'null',
            text: AXTranslator.get('queryBuilder.null')
          },
          {
            value: 'not-null',
            text: AXTranslator.get('queryBuilder.not-null')
          }
        ]);
      }
      if (this.rule.dataType === 'datetime') {
        resolve([
          {
            value: 'equal',
            text: AXTranslator.get('queryBuilder.equal')
          },
          {
            value: 'gt',
            text: AXTranslator.get('queryBuilder.greater-than')
          },
          {
            value: 'gte',
            text: AXTranslator.get('queryBuilder.greater-than-equal')
          },
          {
            value: 'lt',
            text: AXTranslator.get('queryBuilder.less-than')
          },
          {
            value: 'lte',
            text: AXTranslator.get('queryBuilder.less-than-equal')
          },
          {
            value: 'not-equal',
            text: AXTranslator.get('queryBuilder.not-equal')
          },
          {
            value: 'null',
            text: AXTranslator.get('queryBuilder.null')
          },
          {
            value: 'not-null',
            text: AXTranslator.get('queryBuilder.not-null')
          }
        ]);
      }
      resolve([]);
    });
  };

  handleEditClick() {
    this.isEditing = true;
  }

  handleCommitClick() {
    this.isEditing = false;
    this.ruleChanged.emit({ items: this.rule, component: this });
  }
  handleRemoveClick() {
    this.onRuleDelete.emit({ items: this.rule, component: this });
  }
  captionChange(e) {
    if (e.selectedItems[0]) {
      this.rule.caption = e.selectedItems[0].caption;
      this.rule.dataField = e.selectedItems[0].dataField;
      this.rule.dataType = e.selectedItems[0].dataType;
      this.rule.control = e.selectedItems[0].control || new AXQueryBuilderControl();
      this.rule.dataFieldItem[0] = e.selectedItems[0];
    }

    if (this.selectBox) {
      if (this.rule.control.type === 'selectBox' && this.rule.control.options.mode == 'multiple') {
        this.rule.operator = 'contains';
      } else {
        this.rule.operator = 'equal';
      }
      this.selectBox.refresh();
    }

    this.showOperatorSelectBox = false;
    setTimeout(() => {
      this.showOperatorSelectBox = true;
    }, 20);

    this.rule.value = null;
    this.rule.valueItem = [];
    this.rule.text = '';

    if (this.rule.control.type === 'selectBox' && this.selectBoxValue) {
      this.showSelectBox = false;
      setTimeout(() => {
        this.showSelectBox = true;
        this.selectBoxValue.refresh();
      }, 20);
    }
    if (this.rule.control.type == 'boolean') {
      this.selectBoxBoolean.refresh();
    }
    this.ruleChanged.emit({ component: this, items: this.rule });
  }

  operatorChange(e) {
    this.rule.operator = e[0].value;
    this.ruleChanged.emit({ component: this, items: this.rule });

    if (e[0].value !== 'null' && e[0].value !== 'not-null') {
      this.showValue = true;
    } else {
      this.showValue = false;
      this.rule.value = '';
      this.rule.text = '';
      this.rule.valueItem = [];
      this.rule.onDemandLabel = '';
    }
  }
  valueChange(e) {
    debugger
    // this.rule.text = e.value == undefined ? e[0].value : (e.value == null ? '' : e.value);

    this.rule.text = e[0] ? (e[0].value == null ? '' : e[0].value) : e.value == null ? '' : e.value;
    this.rule.onDemandLabel = '';
    this.ruleChanged.emit({ component: this, items: this.rule });
  }
  onDemandLabelChange(e) {
    // this.rule.onDemandLabel = e.value == undefined ? '????|' + e[0].value : '????|' + e.value;
    this.rule.onDemandLabel = e[0] ? '????|' + (e[0].value == null ? '' : e[0].value) : '????|' + (e.value == null ? '' : e.value);
    this.rule.value = '';
    this.rule.text = '';
    this.rule.valueItem = [];

    this.ruleChanged.emit({ component: this, items: this.rule });
  }
  valueBooleanChange(e) {
    // this.rule.text = e.value == undefined ? e[0].value : (e.value == null ? '' : e.value);
    this.rule.text = e[0] ? (e[0].value == null ? '' : e[0].value) : e.value == null ? '' : e.value;
    this.rule.value = e.value == undefined ? e[0].value : e.value;
    this.rule.onDemandLabel = '';
    this.ruleChanged.emit({ component: this, items: this.rule });
  }
  getOnDemandName(v) {
    return v ? v.split('|')[1] : '';
  }
  selectedItemsChange(e) {
    let n = this.getOption('textField');

    if (this.rule.control.options.mode === 'single') {
      this.rule.text = e[0][n];
      if (this.rule && this.rule.control.options.valueField) {
        this.rule.value = e[0][this.rule.control.options.valueField];
      } else {
        this.rule.value = e[0].value;
      }
      this.rule.valueItem[0] = e[0];
    } else {
      this.rule.text = e.map((x) => x[n]).join('- ');
      const THAT = this;
      if (THAT.rule && THAT.rule.control.options.valueField) {
        THAT.rule.value = e.map(function (item) {
          return item[THAT.rule.control.options.valueField];
        });
      } else {
        this.rule.value = e.map(function (item) {
          return item.value;
        });
      }
      this.rule.valueItem = e;
    }

    this.ruleChanged.emit({ component: this, items: this.rule });
    this.rule.onDemandLabel = '';
  }
  onDemandLabel(e) {
    // if (e.value && (this.rule.onDemandLabel == '????|' || this.rule.onDemandLabel === undefined || this.rule.onDemandLabel === null || this.rule.onDemandLabel === '')) {
    //   this.textBoxNameValue.focus();
    // }
    if (e.value == false) {
      this.rule.onDemandLabel = '';
    }
    this.isOnDemandLabel = e.value;
  }
  getProvideData = (e) => {
    if (this.rule && this.rule.control.options && this.rule.control.options.dataSource) {
      return this.rule.control.options.dataSource({ ...e, optionsData: { ...this.rule.control.options } });
    }
  };

  getOption(name: string) {
    return this.rule.control.options ? this.rule.control.options[name] : null;
  }
}
