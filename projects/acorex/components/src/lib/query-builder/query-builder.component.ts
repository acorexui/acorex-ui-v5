import { AXBaseComponent } from '../base/element.class';
import { Component, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { AXTranslator, AXHtmlUtil } from '@acorex/core';
import { AXQueryBuilderGroup, AXQueryBuilderGroupEvent, AXQueryBuilderGroupItem } from './query-builder.class';
import { AXQueryBuilderGroupComponent } from './query-builder-group.component';
import { AXToastService } from '../toast/toast.service';

@Component({
  selector: 'ax-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AXQueryBuilderComponent extends AXBaseComponent {
  @ViewChild('queryGroup') queryGroup: AXQueryBuilderGroupComponent;

  @Input()
  query: AXQueryBuilderGroup;

  @Input()
  mode: 'new' | 'edit' = 'new';

  rootGroup: AXQueryBuilderGroup = new AXQueryBuilderGroup();

  ngOnInit(): void {
    this.rootGroup.condition = this.query.condition ? this.query.condition : 'AND';
    this.rootGroup.items = this.query.items ? this.query.items : [];
  }

  constructor(private ref: ElementRef, private toast: AXToastService) {
    super();
  }

  @Input()
  fields: any[] = [];

  // @Input()
  // mode: 'immediate' | 'click' = 'click';

  @Output()
  onRuleChanged: EventEmitter<AXQueryBuilderGroupEvent> = new EventEmitter<AXQueryBuilderGroupEvent>();

  saved: boolean = false;

  public getQueryBuilder() {
    return { groups: this.rootGroup };
  }

  ruleChanged(e) {
    this.onRuleChanged.emit({ component: this, groups: this.rootGroup });
  }

  public saveRule() {
    /// return this.queryGroup.saveRule();
    return new Promise((resolve, reject) => {
      this.saved = true;
      for (let i = 0; i < this.rootGroup.items.length; i++) {
        if (this.saved == true) {
          this.findNullValue(this.rootGroup.items[i]);
        }
      }
      if (this.saved == true) {
        resolve(this.rootGroup);
      } else {
        reject();
      }
    });
  }

  findNullValue(gr) {
    if (this.saved == true) {
      if (gr.condition) {
        for (let i = 0; i < gr.items.length; i++) {
          this.findNullValue(gr.items[i]);
        }
      } else {
        if (gr.onDemandLabel == '????|') {
          this.saved = false;
          this.toast.error('لطفا نام متغیر های مورد نیاز را کامل کنید');
        }
      }
    }
  }

  // selectionFieldsChanged(e, rules: AXQueryBuilderRule) {
  //
  //     rules.dataField = e.selectedItems[0].dataField;
  //     rules.caption = e.selectedItems[0].caption;
  //     rules.dataType = e.selectedItems[0].dataType;

  //     // TO DO chack dataType For Def operator and Value
  //     if (rules.dataType == 'string') {
  //         rules.operator = this.operatorStringItem[0].id;
  //         rules.value = 'null';
  //     }
  //     if (rules.dataType == 'number') {
  //         rules.operator = this.operatorNumberItem[0].id;
  //         rules.value = '0';
  //     }

  //     this.onRuleChanged.emit({ groups: this.rootGroup, queryString: this.getQueryDisplay(), component: this, htmlElement: this.ref.nativeElement })
  // }

  // selectionOparatorChanged(e, rules: AXQueryBuilderRule) {
  //     rules.operator = e.selectedItems[0].id;
  // }

  // provideDataFields = (e) => {
  //     return new Promise((resolve) => {
  //         resolve(this.fields);
  //     });
  // }

  // provideDataOperatorString = (e) => {
  //     return new Promise((resolve) => {
  //         resolve(this.operatorStringItem);
  //     });
  // }
  // provideDataOperatorNumber = (e) => {
  //     return new Promise((resolve) => {
  //         resolve(this.operatorNumberItem);
  //     });
  // }

  // private getQueryDisplay(gr = this.list, _condition = this.list[0].condition) {
  //     var cap: string = '(';

  //     for (let j = 0; j < gr.length; j++) {
  //         if (j > 0) {
  //             cap = cap + _condition;
  //         }
  //         cap = cap + " ( ";
  //         for (let i = 0; i < gr[j].items.length; i++) {
  //             if (gr[j].items[i].value && gr[j].items[i].operator && gr[j].items[i].caption || ((gr[j].items[i].operator == "is-empty" || gr[j].items[i].operator == "is-not-empty") && gr[j].items[i].caption)) {
  //                 var opr: string;
  //                 if (gr[j].items[i].dataType == "number" || gr[j].items[i].dataType == "date" || gr[j].items[i].dataType == "dateTime") {
  //                     let d = this.operatorNumberItem.filter(c => c.id == gr[j].items[i].operator);
  //                     opr = d[0].text;
  //                 } else {
  //                     let d = this.operatorStringItem.filter(c => c.id == gr[j].items[i].operator);
  //                     opr = d[0].text;
  //                 }
  //                 if ((gr[j].items[i].operator == "is-empty" || gr[j].items[i].operator == "is-not-empty")) {

  //                     if (i === gr[j].items.length - 1) {
  //                         cap = cap + " " + "[" + gr[j].items[i].caption + "]";
  //                     } else {
  //                         cap = cap + " " + "[" + gr[j].items[i].caption + "]" + " " + opr + " " + gr[j].condition;
  //                     }
  //                 } else {
  //                     var val: string;

  //                     if (gr[j].items[i].dataType == 'date') {
  //                         // val = moment(item.value).locale('fa').format('YYYY/MM/DD');
  //                     } else if (gr[j].items[i].dataType == 'dateTime') {
  //                         // val = moment(item.value).locale('fa').format('HH:mm YYYY/MM/DD');
  //                     } else {
  //                         val = gr[j].items[i].value;
  //                     }
  //                     if (i === gr[j].items.length - 1) {
  //                         cap = cap + " " + "[" + gr[j].items[i].caption + "]" + " " + opr + " " + val
  //                     } else {
  //                         cap = cap + " " + "[" + gr[j].items[i].caption + "]" + " " + opr + " " + val + " " + gr[j].condition
  //                     }

  //                 }
  //             }
  //         }

  //         if (gr[j].groups && gr[j].groups.length > 0) {
  //             let c = this.getQueryDisplay(gr[j].groups, gr[j].condition);
  //             if (c != "( ) ") {
  //                 if (gr[j].items.length > 0 || j > 0) {
  //                     cap = cap + " " + gr[j].condition + " " + c + " ";
  //                 } else {
  //                     cap = cap + " " + c + " ";
  //                 }

  //             }
  //         }

  //         cap = cap + " ) ";
  //     };

  //     cap = cap + " ) ";
  //     return cap;
  // }

  // deleteGroup(groupOut: AXQueryBuilderGroup, groupIn: AXQueryBuilderGroup) {
  //     groupOut.items = groupOut.items.filter(c => c.id != groupIn.id);
  // }

  // deleteRule1(group: AXQueryBuilderGroup, rule: AXQueryBuilderRule) {
  //     group.items = group.items.filter(c => c.id != rule.id);
  // }

  // addRule(group: AXQueryBuilderGroup) {
  //     const item: AXQueryBuilderRule = new AXQueryBuilderRule();
  //     group.items.push(item);
  // }

  // addGroupAND(group: AXQueryBuilderGroup) {
  //     this.addGroupOnClick(group);
  //     group.condition = "AND";
  // }
  // addGroupOR(group: AXQueryBuilderGroup) {
  //     this.addGroupOnClick(group);
  //     group.condition = "OR";
  // }

  // addGroupOnClick(groups: AXQueryBuilderGroup) {
  //     let r: AXQueryBuilderGroup = new AXQueryBuilderGroup();
  //     r.condition = "";
  //     r.items = [];
  //     if (groups.items == undefined) {
  //         groups.items = [];
  //     }
  //     groups.items.push(r);
  // }
}
