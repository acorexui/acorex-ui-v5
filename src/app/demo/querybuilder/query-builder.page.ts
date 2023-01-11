import { OnInit, Component, ViewChild } from '@angular/core';
import { AXQueryBuilderComponent, AXQueryBuilderService } from '@acorex/components';

@Component({
  templateUrl: './query-builder.page.html'
})
export class QueryBuilderPage implements OnInit {
  ngOnInit() { }
  constructor(private p: AXQueryBuilderService) { }
  @ViewChild('query') query: AXQueryBuilderComponent;

  //items1 = JSON.parse('')
  items = JSON.parse(
    '{"condition":"AND","items":[{"operator":"equal","dataFieldItem":[{"dataField":"firstName","dataType":"string","control":{"type":"textBox"},"caption":"نام ","selected":false}],"caption":"نام ","dataField":"firstName","dataType":"string","control":{"type":"textBox"},"value":"10","valueItem":[],"text":"10","onDemandLabel":""},{"condition":"OR","items":[{"operator":"equal","dataFieldItem":[{"dataField":"lastName","dataType":"string","control":{"type":"selectBox","options":{"textField":"name","valueField":"val","mode":"single"}},"caption":"lastname","selected":false}],"caption":"lastname","dataField":"lastName","dataType":"string","control":{"type":"selectBox","options":{"textField":"name","valueField":"val","mode":"single"}},"value":1,"valueItem":[{"val":1,"name":"Item 1","selected":true}],"text":"Item 1","onDemandLabel":""},{"operator":"equal","dataFieldItem":[{"dataField":"b","dataType":"boolean","control":{"type":"boolean"},"caption":"b","selected":false}],"caption":"b","dataField":"b","dataType":"boolean","control":{"type":"boolean"},"value":"true","valueItem":[],"text":"true","onDemandLabel":""},{"condition":"AND","items":[{"operator":"contains","dataFieldItem":[{"dataField":"lov","dataType":"string","control":{"type":"selectBox","options":{"textField":"name","valueField":"val","mode":"multiple","remoteOperation":true}},"caption":"lov","selected":true}],"caption":"lov","dataField":"lov","dataType":"string","control":{"type":"selectBox","options":{"textField":"name","valueField":"val","mode":"multiple","remoteOperation":true}},"value":[3,4],"valueItem":[{"val":3,"name":"2حسین ساعدی","selected":true},{"val":4,"name":"2مهران رحمتی","selected":true}],"text":"2حسین ساعدی- 2مهران رحمتی","onDemandLabel":""}],"queryString":" (  lov contains 3,4 ) ","queryStringElastic":" (  lov contains 3,4 ) "}],"queryString":" (  lastname equal 1 OR b equal true OR (  lov contains 3,4 )  ) ","queryStringElastic":" (  lastName equal 1 OR b equal true OR (  lov contains 3,4 )  ) "}],"queryString":" (  نام  equal 10 AND (  lastname equal 1 OR b equal true OR (  lov contains 3,4 )  )  ) ","queryStringElastic":" (  firstName equal 10 AND (  lastName equal 1 OR b equal true OR (  lov contains 3,4 )  )  ) "}'
  ); //this.items1.items;
  mode: any = 'edit';
  fields = [
    {
      dataField: 'firstName',
      dataType: 'datetime',
      control: {
        type: 'datetime'
      },
      caption: 'نام '
    },
    {
      dataField: 'lastName',
      dataType: 'string',
      control: {
        type: 'selectBox',
        options: {
          dataSource: this.provideDataSample,
          textField: 'name',
          valueField: 'val',
          mode: 'single'
        }
      },
      caption: 'lastname'
    },
    {
      dataField: 'age',
      dataType: 'number',
      control: {
        type: 'numberBox'
      },
      caption: 'age'
    },
    {
      dataField: 'b',
      dataType: 'boolean',
      control: {
        type: 'boolean'
      },
      caption: 'b'
    },
    {
      dataField: 'lov',
      dataType: 'string',
      control: {
        type: 'selectBox',
        options: {
          dataSource: this.lovProvideDataSample,
          textField: 'name',
          valueField: 'val',
          mode: 'multiple',
          remoteOperation: true
        }
      },
      caption: 'lov'
    }
  ];
  pr() {
    return [{}];
  }
  queryd: any;
  getQueryDisplay() {
    debugger
    this.queryd = this.query.getQueryBuilder();
  }
  runQuery() {
    debugger
    this.p.runQuery(this.query.getQueryBuilder().groups, this.provideDataSample);
  }

  tt: string = '';
  saveQuery() {
    debugger
    this.query.saveRule().then((c: any) => {
      this.tt = c.queryString;
    });
  }
  onRuleChanged(e) {
    this.saveQuery();
  }

  provideDataSample(e) {
    return Promise.resolve([
      {
        val: 1,
        name: 'Item 1'
      },
      {
        val: 2,
        name: 'Item 2'
      }
    ]);
  }

  lovProvideDataSample(e) {
    return Promise.resolve([
      {
        val: 1,
        name: '1حسین ساعدی'
      },
      {
        val: 2,
        name: '1مهران رحمتی'
      },
      {
        val: 3,
        name: '2حسین ساعدی'
      },
      {
        val: 4,
        name: '2مهران رحمتی'
      },
      {
        val: 5,
        name: '3حسین ساعدی'
      },
      {
        val: 6,
        name: '3مهران رحمتی'
      },
      {
        val: 7,
        name: '4حسین ساعدی'
      },
      {
        val: 8,
        name: '4مهران رحمتی'
      },
      {
        val: 9,
        name: '5حسین ساعدی'
      },
      {
        val: 10,
        name: '5مهران رحمتی'
      }
    ]);
  }
}
