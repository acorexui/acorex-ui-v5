import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXFormGroupComponent, AXValidationFormComponent } from '@acorex/components';
import { AXHttpService, AXTranslatorService } from '@acorex/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './validation.page.html'
})
export class ValidationPage {
  constructor(public cdr: ChangeDetectorRef, public translator: AXTranslatorService, public http: HttpClient) { }

  @ViewChild(AXValidationFormComponent) form: AXValidationFormComponent;
  clear() {
    this.textBoxValue = '';
  }

  time = "10:30:30 am";
  textBoxValue: string = 'skdjfjksdhfjksd@yahoo.com';
  text: string = '';
  gridData: any = [
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales1',
      id: '1'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales2',
      id: '2'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales3',
      id: '3'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales4',
      id: '4'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales5',
      id: '5'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales6',
      id: '6'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales7',
      id: '7'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales8',
      id: '8'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales9',
      id: '9'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales10',
      id: '10'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales11',
      id: '11'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales12',
      id: '12'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales13',
      id: '13'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales14',
      id: '14'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales15',
      id: '1555'
    }
  ];
  onSelectionChange(e) {
  }
  submit() {
    this.form.validate().then(c => {
    });
  }



  provideLazyData = (e) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.gridData);
      }, 5000);
    });
  }

  // customValidation = (e): Promise<boolean> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(e.value?.startsWith('arash'));
  //     }, 1000);
  //   });
  // }

  customValidation = (e): boolean => {
    return e.value?.startsWith('arash');
  }
  testTime = "10:30:30 am";
  num = '12';

  onValueChanged(e) {
  }


  provideData = (e) => {
    ;
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
          resolve({ items: res.result.foods, totalCount: 71 });
        });
    });
  };

}
