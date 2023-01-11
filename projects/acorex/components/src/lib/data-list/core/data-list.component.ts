import { ContentChild, Input, Directive } from '@angular/core';
import { AXDataSourceComponent } from '../../data-source/datasource.component';
import { AXDataSourceReadParams } from '../../data-source/read-param';
import { AXBaseComponent } from '../../base/element.class';


@Directive()
export abstract class AXDataListComponent extends AXBaseComponent {



  @Input()
  items: any[] = [];

  // @ContentChild(AXDataSourceComponent, { static: true })
  // private _contentDataSource: AXDataSourceComponent;

  // private _dataSource: AXDataSourceComponent;

  // @Input()
  // public get dataSource(): AXDataSourceComponent {
  //   return this._dataSource ? this._dataSource : this._contentDataSource;
  // }

  // public set dataSource(v: AXDataSourceComponent) {
  //   this._dataSource = v;
  // }


  abstract dataSource: AXDataSourceComponent;


  // ngAfterContentInit(): void {
  //   this.configDataList();
  // }


  protected configDataList() {
    if (this.dataSource) {
      this.dataSource.onDataReceived.subscribe(c => {
        this.dataReceived(c.data.result);
      });
    }
  }

  private dataReceived(data: any) {
    this.items = data;
  }

  private params: AXDataSourceReadParams = {};

  fetch(params: AXDataSourceReadParams = {}) {
    this.params = params;
    if (this.dataSource) {
      this.dataSource.fetch(params);
    }
  }

  refresh() {
    this.fetch(this.params);
  }
}
