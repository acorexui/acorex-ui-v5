import { Component, OnInit, ViewChild } from '@angular/core';
import { AXLOVComponent } from '@acorex/data-grid';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './lov.page.html'
})
export class LovPage implements OnInit {
  constructor(private http: HttpClient) {}
  @ViewChild('lov1', { static: true }) lov1: AXLOVComponent;

  ngOnInit(): void {
    this.lov1.focus();
  }
  clear() {
    this.selectedItems = [];
  }
  textField: string = 'jobTitle';

  valueField: string = 'id';

  // selectedItems: any[] = [
  //     {
  //         // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
  //         jobTitle: 'Sales1mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmjkhjhkhkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
  //         id: '1'
  //     },
  //     {
  //         jobTitle: 'Sales2',
  //         id: '2'
  //     },
  // ];

  selectedItems2: any[] = [
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales11jhjkhjkhkjhkhkjhkjdfgdrfdyreydfdgfdgdgdgdgdgdgdyruypi[okkj',
      id: '11'
    },
    {
      jobTitle: 'Sales21',
      id: '21'
    }
  ];
  selectedItems: any[] = [];
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.selectedItems = [
      // {
      //     jobTitle: 'Sales1mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmjkhjhkhkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      //     id: '1'
      // },
      // {
      //     jobTitle: 'Sales2',
      //     id: '2'
      // },
    ];
  }
  rtl: boolean = false;
  filterData = [
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales3',
      id: '3',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales4',
      id: '4',
      hasChild: false
    },
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales1mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmjkhjhkhkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      id: '1',
      hasChild: true
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales2',
      id: '2',
      hasChild: true
    }
  ];
  gridData: any = [
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales1mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmjkhjhkhkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      id: '1',
      hasChild: true
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales2',
      id: '2',
      hasChild: true
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales3',
      id: '3',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales4',
      id: '4',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales5',
      id: '5',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales6',
      id: '6',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales7',
      id: '7',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales8',
      id: '8',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales9',
      id: '9',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales10',
      id: '10',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales11',
      id: '11',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales12',
      id: '12',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales13',
      id: '13',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales14',
      id: '14',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales15',
      id: '15',
      hasChild: false
    },
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales16',
      id: '16',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales17',
      id: '17',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales18',
      id: '18',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales19',
      id: '19',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales20',
      id: '20',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales21',
      id: '21',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales22',
      id: '22',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales23',
      id: '23',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales24',
      id: '24',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales25',
      id: '25',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales26',
      id: '26',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales27',
      id: '27',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales28',
      id: '28',
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales29',
      id: '29',
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales30',
      id: '30',
      hasChild: false
    }
  ];

  gridData2: any = [
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales11jhjkhjkhkjhkhkjhkjdfgdrfdyreydfdgfdgdgdgdgdgdgdyruypi[okkj',
      id: '11'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales21',
      id: '21'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales31',
      id: '31'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales41',
      id: '41'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales51',
      id: '51'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales61',
      id: '61'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales71',
      id: '71'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales81',
      id: '81'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales91',
      id: '91'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales101',
      id: '101'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales111',
      id: '111'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales121',
      id: '121'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales131',
      id: '131'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales141',
      id: '141'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales151',
      id: '151'
    },
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales161',
      id: '161'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales171',
      id: '171'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales181',
      id: '181'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales191',
      id: '191'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales201',
      id: '201'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales211',
      id: '211'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales221',
      id: '221'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales231',
      id: '231'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales241',
      id: '241'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales251',
      id: '251'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales261',
      id: '261'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales271',
      id: '271'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales281',
      id: '281'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales291',
      id: '291'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales301',
      id: '301'
    }
  ];

  handleLovSelectionChange(e) {
  }

  provideData = (e) => {
    return new Promise((resolve) => {
      let data = [];
      let totall = 0;
      if (e.searchText) {
        // data = this.gridData.slice(2, 6);
        // totall = 4
        data = this.filterData;
        totall = 4;
      } else if (e.filter && e.filter.jobTitle) {
        // data = this.gridData.slice(4, 6);
        //  totall = 2
        data = this.filterData;
        totall = 4;
      } else {
        data = this.gridData.slice(e.skip, e.take);
        totall = 30;
      }

      const result: any = {
        items: data,
        totalCount: totall
      };
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  };

  provide2234 = (e) => {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          `http://192.168.25.71:30110/cis/healthProduct/filterServiceItem/list `,
          {
            take: e.take,
            skip: e.skip,
            sort: [],
            group: null,
            aggregate: null,
            data: {},
            logic: 'and',
            filter: { filters: [], logic: 'and' },
            providerQualifier: null
          },
          {
            headers: {
              Authorization: `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFGRzc2NUJCRjBGMUIifQ.eyJ1c2VyX3BlcnNvbl9pZCI6NTU1Njk2MzI3LCJ1c2VyX2lkIjoxNSwidXNlcl9uYW1lIjoibS5uaWtvb2thciIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJvcmdhbml6YXRpb25fdXNlcl9pZCI6MywiYXBwbGljYXRpb25fc3lzdGVtX2lkIjoyLCJjcmVhdGlvbl9kYXRlIjoiMjAyMS0xMC0wOVQxNDozODoxNy4yNDgiLCJleHAiOjE2OTY4NDk2OTcsImp0aSI6IjQ0NjM4YTFkLWQzNWUtNGEyYi1hMDczLTJhYjY0OGYyOGEyNyIsImF1dGhvcml0aWVzIjpbIjcyIiwiRU5EX0dST1VQIiwiSU5TVVJBTkNFX1JFUE9SVCIsIkJBU0lDX0NMSU5JQyIsIlJFUE9SVEVSIiwiVEFSSUZGIiwiUkVDRVBUSU9OIiwiMTYiLCJBRERfU1VCX1RBUklGRiIsIklOU1VSQU5DRSIsIlNFUlZJQ0VfVElNRV9TRVRUSU5HIiwiNzQiLCJDQVNIX0JPWCIsIkNBU0hfQk9YX0NSRUFUSU9OIiwiUkVDRUlWRV9QQVlNRU5UIiwiQ1JFQVRJTkdfU1lTVEVNIiwiQ0FMRU5EQVJfU0hJRlQiLCJTRVRUVVBfUkVHSVNURVJBVElPTiIsIkNSRUFUSU5HX1BPUyIsIkRFQVRIX05PVElGSUFDVElPTiIsIlBBVElFTlRfUkVTRUFSQ0giLCJQUkVTRU5UQUJMRV9TRVJWSUNFIiwiUkVTRVJWQVRJT04iLCJSRUdJU1RFUkFUSU9OIiwiRklOQUxfUkVHSVNURVIiLCJwcmVzY3JpcHRpb25IZWFsdGhDb21wYW55IiwiMiIsIjE1IiwidGFyaWZmX3NlcnZpY2UiLCJQQVRJRU5UX1JFQ09SRCIsIkhDT19NQU5BR01FTlQiLCI3IiwiSU5TVVJBTkNFX1NVQiIsInByZXNjcmlwdGlvbkNvbXBhbnkiLCIzIiwiQ0FTSF9CT1hfTUFOQUdFTUVOVCIsIkNBU0hfQk9YX0RFUE9TSVRfQ09ORklSTSIsIkNIRUNLT1VUX1JFUVVFU1QiLCJwcmVzY3JpcHRpb25UYW1pbiIsIkxPQ0FMX0lURU0iLCJDT01NSVRFRF9CSUxMIiwiU0VSVklDRV9CQVNFRF9DQVNIX0JPWF9SRVBPUlQiLCJDQVNIX0JPWF9PUEVSQVRJT05fTUFOQUdFTUVOVCIsIkNBU0hfQk9YX0VESVRfQU5OT1VOQ0VNRU5UX0FNVCIsIlJFR0lTVEVSX0RPQ1RPUiIsInByZXNjcmlwdGlvblNhbGFtYXQiXSwiY2xpZW50X2lkIjoiY2xpZW50QXBwSWQifQ.FZTIHdYx7rdzY50duCTVD4YlXD1vQLQQqy5GqrcpiXN1s-KEex47PaHUzO1K7kmRaLkOme_rjhibKd9-19Ac7CK82iIdoct1UF4J9-gXubRYXDxLfRD0_3TQmgF9qR3sYkfI8ODypc1VmOFV3P1BDCHokOZXv4V64LXoERI_5fd-eKx0YGkcFwRzvUj5jAPKKFStdPPMFiScC4_RsN7AxyXxQq1G6c6WLtNY0_i6gjxlFVJx4zG2Uy9SYRB9YUTVMEpNV3vH-QnimmNTo4q8TxliSd2Zync-F6-3jTxvg74kWfnfxtRIrx2aEb9xow3S_3staEc9mhg7xkp-mO4meA`
            }
          }
        )
        .toPromise()
        .then((data: any) => {
          resolve({ items: data.result.data, totalCount: data.result.total });
        })
        .catch((c) => {
          reject(c);
        });
    });
  };

  provideData2 = (e) => {
    return new Promise((resolve) => {
      let data = [];
      let totall = 0;
      if (e.searchText) {
        data = this.gridData.slice(0, 4);
        totall = 4;
      } else {
        data = this.gridData.slice(e.skip, e.take);
        totall = 30;
      }

      const result: any = {
        items: data,
        totalCount: totall
      };

      setTimeout(() => {
        resolve(result);
      }, 500);
    });
  };
}
