import { AXQueryBuilderGroup, AXQueryBuilderStringType } from './query-builder.class';
import { Injectable } from '@angular/core';
import { AXPopupService } from '../popup/popup.service';
import { AXQueryBuilderPopupComponent } from './query-builder-popup/query-builder-popup.component';
import { AXToastService } from '../toast/toast.service';
import { AXDateTime } from '@acorex/core';
@Injectable({ providedIn: 'root' })
export class AXQueryBuilderService {
  constructor(private popup: AXPopupService, private toast: AXToastService) { }
  canOpen: boolean = false;
  canRun: boolean = false;
  public runQuery(group: AXQueryBuilderGroup, provideData) {
    return new Promise((resolve) => {
      this.canOpen = false;
      for (let i = 0; i < group.items.length; i++) {
        this.getNoValueRule(group.items[i]);
      }
      if (this.canOpen) {
        this.canRun = true;
        for (let i = 0; i < group.items.length; i++) {
          if (this.canRun == true) {
            this.findNullValue(group.items[i]);
          }
        }
        if (this.canRun) {
          this.popup.open(AXQueryBuilderPopupComponent, { data: { group: group, provideData: provideData }, title: 'دریافت مقادیر' }).then((c) => {
            resolve(c);
          });
        }
      } else {
        resolve(group);
      }
    });
  }

  findNullValue(gr) {
    if (this.canRun == true) {
      if (gr.condition) {
        for (let i = 0; i < gr.items.length; i++) {
          this.findNullValue(gr.items[i]);
        }
      } else {
        if (gr.onDemandLabel == '????|') {
          this.canRun = false;
          this.toast.error('لطفا نام متغیر های مورد نیاز را کامل کنید');
        }
      }
    }
  }

  private getNoValueRule(gr) {
    // for (let i = 0; i < gr.items.length; i++) {
    if (gr.condition) {
      for (let i = 0; i < gr.items.length; i++) {
        this.getNoValueRule(gr.items[i]);
      }
    } else {
      if (gr.onDemandLabel?.indexOf('????') == 0) {
        this.canOpen = true;
      }
    }

    //  }
  }

  async getQueryStringSimple(group: AXQueryBuilderGroup) {
    return new Promise<string>(async (resolve, reject) => {
      var query: string;
      if (group.items.length > 0) {
        query = ' ( ';
      }
      var id = 0;
      for await (const iterator of group.items) {
        const item: any = group.items[id];

        if (item.condition) {
          await this.getQueryStringSimple(item).then((c) => {
            query = query + c;
          });
        } else {
          let codeOperator: string = null;
          switch (item.operator) {
            case 'equal':
              codeOperator = '==';
              break;
            case 'not-equal':
              codeOperator = '!=';
              break;
            case 'not-null':
              codeOperator = '!= null';
              break;
            case 'null':
              codeOperator = '== null';
              break;
            case 'gt':
              codeOperator = '>';
              break;
            case 'gte':
              codeOperator = '>=';
              break;
            case 'lt':
              codeOperator = '<';
              break;
            case 'lte':
              codeOperator = '<=';
              break;
            case 'contains':
              codeOperator = item.operator;
              break;
            case 'start-with':
              codeOperator = item.operator;
              break;
            case 'end-with':
              codeOperator = item.operator;
              break;
            default:
              codeOperator = item.operator;
              break;
          }
          if (item.dataType == 'datetime' && item.text && item.text != '' && item.text != null) {
            query = query + ' ' + item.caption + ' ' + codeOperator + ' (' + AXDateTime.convert(item.text, 'jalali') + ')';
          } else if (item.dataType != 'datetime') {
            query = query + ' ' + item.caption + ' ' + codeOperator + ' ' + item.text;
          }

        }
        if (id !== group.items.length - 1 && query != ' ( ') {
          query = query + ' ' + group.condition;
        }
        id += 1;
      }
      if (group.items.length > 0) {
        query = query + ' ) ';
      }
      resolve(query);
    });
  }

  public getQueryString(group: AXQueryBuilderGroup, type: AXQueryBuilderStringType): string {
    let query = '';
    switch (type) {
      case 'simple':
        if (group.items.length > 0) {
          query = ' ( ';
        }
        for (let i = 0; i < group.items.length; i++) {
          const item = group.items[i];
          if (item instanceof AXQueryBuilderGroup) {
            query = query + item.queryString;
          } else {
            query = query + ' ' + item.caption + ' ' + item.operator + ' ' + item.value;
          }
          if (i !== group.items.length - 1 && query != ' ( ') {
            query = query + ' ' + group.condition;
          }
        }
        if (group.items.length > 0) {
          query = query + ' ) ';
        }
        break;

      case 'elastic':
        if (group.items.length > 0) {
          query = ' ( ';
        }
        for (let i = 0; i < group.items.length; i++) {
          const item = group.items[i];
          if (item instanceof AXQueryBuilderGroup) {
            query = query + item.queryStringElastic;
          } else {
            query = query + ' ' + item.dataField + ' ' + item.operator + ' ' + item.value;
          }
          if (i !== group.items.length - 1 && query != ' ( ') {
            query = query + ' ' + group.condition;
          }
        }
        if (group.items.length > 0) {
          query = query + ' ) ';
        }

        break;
      case 'sql':
        break;
    }

    return query;
  }
}
