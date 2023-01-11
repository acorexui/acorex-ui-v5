import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AXHttpService } from '@acorex/core';
import { AXSelectBoxComponent } from '@acorex/components';

@Component({
  templateUrl: './select-box.page.html'
})
export class SelectBoxPage {
  @ViewChild('select', { static: true })
  select: AXSelectBoxComponent;

  remoteOperation: boolean = true;

  constructor(private http: HttpClient) {
    // setTimeout(() => {
    //     this.value = 10;
    // }, 5000);
  }
  selectedValues2: any[] = [];
  selectedValues: any[] = [108];
  selectedItems: any = [{ ID: 105, Name: 'sdfjsd' }];
  value: any = [];
  selectionChanged(e) {
    this.select;
  }
  selectedItemsChange(e) {
  }

  disabledCallback(e: any) {
    if (e.item.ID == 107) {
      return true;
    } else {
      return false;
    }
  }

  selectionChanged2(e) {
  }
  refresh() {
    this.select.refresh();
  }
  pushSellected() {
  }
  provideData = (e) => {
    // return new Promise((resolve) => {
    //   resolve(this.testItem);
    // });
    return new Promise((resolve, reject) => {
      this.http
        .post<any>('https://api.highcook.ir/foods/getfoodsByCatId', {
          CatId: 1,
          Skip: e.skip,
          Limit: e.take
        })
        .subscribe((res: any) => {
          if (e.searchText != '' && e.searchText != null && e.searchText != undefined) {
            setTimeout(() => {
              resolve(
                //{
                //   items:
                res.result.foods.filter((c) => c.ID === 107)
                // totalCount: 1
                // }
              );
            }, 1);
          } else {

            res.result.foods[1].Name= res.result.foods[1].Name + res.result.foods[1].Name  + res.result.foods[1].Name  + res.result.foods[1].Name  + res.result.foods[1].Name  + res.result.foods[1].Name  + res.result.foods[1].Name  + res.result.foods[1].Name;


            setTimeout(() => {
              resolve({
                items: res.result.foods,
                totalCount: 71
              });
            }, 1);
          }
        });
    });
  };



  selectValue() {
    // this.selectedValues = [108];
    //this.select.refresh();
  }

  testItem = [
    {
      Name: 'ali',
      ID: 10
    }
  ];

  favoriteTermClick(a,b,x,d){

  }

  provideData2 = (e) => {
    return new Promise((resolve) => {
      this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe((c: any) => {
        if (this.remoteOperation) {
          if (e.searchText) {
            resolve(
              //{
              // items:
              c.filter((c) => String(c['title']).toLowerCase().includes(e.searchText.toLowerCase())).slice(e.skip, e.take)
              // totalCount: 200
              //  }
            );
          } else {
            setTimeout(() => {
              resolve(c.slice(e.skip, e.take));
            }, 0);
          }
        } else {
          setTimeout(() => {
            resolve(c);
          }, 0);
        }
      });
    });
  };
}
