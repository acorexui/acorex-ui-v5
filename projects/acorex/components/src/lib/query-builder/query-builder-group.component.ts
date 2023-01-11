import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { AXValidationFormComponent } from '../validation/validation-form.component';
import { AXQueryBuilderRuleComponent } from './query-builder-rule.component';
import { AXQueryBuilderGroup, AXQueryBuilderGroupEvent, AXQueryBuilderRuleEvent, AXQueryBuilderRule } from './query-builder.class';
import { AXQueryBuilderService } from './query-builder.service';
@Component({
  selector: 'ax-query-group',
  templateUrl: 'query-builder-group.component.html',
  host: { class: 'ax ax-query-group' },
  encapsulation: ViewEncapsulation.None
})
export class AXQueryBuilderGroupComponent implements OnInit {
  @ViewChild('queryRule') queryRule: AXQueryBuilderRuleComponent;
  @ViewChild(AXValidationFormComponent) form: AXValidationFormComponent;
  @Input()
  group: AXQueryBuilderGroup;

  collapsed: boolean = false;

  @Input()
  parent: AXQueryBuilderGroup;

  @Input()
  fields: any[] = [];

  @Input()
  mode: 'new' | 'edit' = 'new';

  //ruleIsEditing: boolean = true;

  @Output()
  groupRuleChanged: EventEmitter<AXQueryBuilderGroupEvent> = new EventEmitter<AXQueryBuilderGroupEvent>();

  showGroupCondition: boolean = false;

  constructor(private qs: AXQueryBuilderService) {}

  ngOnInit() {}

  ruleDelete(e: AXQueryBuilderRuleEvent) {
    this.group.items = this.group.items.filter((c) => c !== e.items);
    this.ruleChanged(null);
  }
  handleRemoveClick() {
    this.parent.items = this.parent.items.filter((c) => c !== this.group);
    this.groupRuleChanged.emit({ groups: this.group, component: this });
  }
  saveRule() {
    // this.form.validate().then(c => {
    // });
    // return this.queryRule.saveRule();
  }
  addRule() {
    const item: AXQueryBuilderRule = new AXQueryBuilderRule();
    if (this.fields.length > 0) {
      //  item.caption = this.fields[0].caption;
      // item.dataType = this.fields[0].dataType;
      //  item.dataField = this.fields[0].dataField;
    } else {
    }
    item.operator = 'equal';

    if (item.dataType === 'string') {
      item.value = '';
    }
    if (item.dataType === 'number') {
      item.value = 0;
    }

    if (this.group.items == undefined) {
      this.group.items = [];
    }
    this.group.items.push(item);
    this.ruleChanged(null);
  }
  addGroup() {
    this.showGroupCondition = true;
  }
  addGroupOR() {
    this.makeGroup('OR');
  }
  addGroupAND() {
    this.makeGroup('AND');
  }
  makeGroup(_condition) {
    let r: AXQueryBuilderGroup = new AXQueryBuilderGroup();
    r.condition = _condition;
    r.items = [];
    r.queryString = '';
    if (this.group.items == undefined) {
      this.group.items = [];
    }
    this.group.items.push(r);
    this.showGroupCondition = false;
    this.ruleChanged(null);
  }
  changeDetailMode() {
    //if (this.parent) {
    this.collapsed = !this.collapsed;
    //  this.ruleIsEditing = false;
    //}
  }

  handleChangeClick() {
    if (this.group.condition == 'OR') {
      this.group.condition = 'AND';
    } else {
      this.group.condition = 'OR';
    }
    this.ruleChanged(null);
  }

  ruleChanged(e) {
    ;
    // this.group.queryString = this.qs.getQueryString(this.group, 'simple');
    this.qs.getQueryStringSimple(this.group).then((c) => {
      this.group.queryString = c;
      this.group.queryStringElastic = this.qs.getQueryString(this.group, 'elastic');
      this.groupRuleChanged.emit({ groups: this.group, component: this });
    });
  }
}
