import { Component, OnInit, DebugElement, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { AXMenuItem } from '@acorex/core';
import { AXFilterColumnGroup, AXPopupService, AXDialogService, AXBasePageComponent, AXButtonComponent } from '@acorex/components';
import { AXGridDataColumn, AXDataGridComponent } from '@acorex/data-grid';
import { InputPage } from '../input/input.page';
import { AXGridRowParams } from 'projects/acorex/data-grid/src/public-api';
import { AXLoadingService } from 'projects/acorex/components/src/public-api';
import { TestPage } from '../test/test.page';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './dataGrid.page.html',
  styleUrls: ['./dataGrid.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataGridPage extends AXBasePageComponent implements OnInit {
  constructor(
    private ref: ElementRef<HTMLDivElement>,
    private popup: AXPopupService,
    private dialog: AXDialogService,
    private loadingService: AXLoadingService,
    private http: HttpClient
  ) {
    super();
  }

  num: number = -1325424.0125456;

  @ViewChild('gridTree', { static: true })
  gridTree: AXDataGridComponent;

  takeCount: number = 1;

  @ViewChild('grid', { static: true })
  grid: AXDataGridComponent;

  selectRow: any[] = ['Contract'];
  numColumns: any[] = [{}, {}];
  groupDefaultExpanded = -1;
  getRowClass = (e: AXGridRowParams) => {
    if (e.data) {
      return 'success';
    }
  };

  g1: any[] = [
    {
      id: 1,
      startDate: '99/01/01',
      endDate: '99/01/31',
      yearId: 5,
      hasChild: true
    },
    {
      id: 1,
      startDate: '99/02/01',
      endDate: '99/01/31',
      yearId: 5,
      hasChild: true
    },
    {
      id: 1,
      startDate: '99/03/01',
      endDate: '99/01/31',
      yearId: 5,
      hasChild: true
    }
  ];

  g2: any[] = [
    {
      id: 1,
      comissionId: 1,
      groupName: 'عمومی',
      hasChild: true
    },
    {
      id: 2,
      comissionId: 1,
      groupName: 'A گروه',
      hasChild: true
    },
    {
      id: 3,
      comissionId: 1,
      groupName: 'B گروه',
      hasChild: true
    }
  ];

  g3: any[] = [
    {
      id: 1,
      groupId: 1,
      seasonType: 'Low Season',
      cent: '50%'
    },
    {
      id: 2,
      groupId: 1,
      seasonType: 'Medium Season',
      cent: '35%'
    },
    {
      id: 3,
      groupId: 1,
      seasonType: 'Peak Season',
      cent: '20%'
    },
    {
      id: 4,
      groupId: 1,
      seasonType: 'High Season',
      cent: '15%'
    },
    {
      id: 5,
      groupId: 1,
      seasonType: 'Static Season',
      cent: '10%'
    },
    {
      id: 6,
      groupId: 2,
      seasonType: 'Low Season',
      cent: '53%'
    },
    {
      id: 7,
      groupId: 2,
      seasonType: 'Medium Season',
      cent: '38%'
    },
    {
      id: 8,
      groupId: 2,
      seasonType: 'Peak Season',
      cent: '23%'
    },
    {
      id: 9,
      groupId: 2,
      seasonType: 'High Season',
      cent: '17%'
    },
    {
      id: 10,
      groupId: 2,
      seasonType: 'Static Season',
      cent: '13%'
    },
    {
      id: 11,
      groupId: 3,
      seasonType: 'Low Season',
      cent: '50%'
    },
    {
      id: 12,
      groupId: 3,
      seasonType: 'Medium Season',
      cent: '37%'
    },
    {
      id: 13,
      groupId: 3,
      seasonType: 'Peak Season',
      cent: '23%'
    },
    {
      id: 14,
      groupId: 3,
      seasonType: 'High Season',
      cent: '17%'
    },
    {
      id: 15,
      groupId: 3,
      seasonType: 'Static Season',
      cent: '13%'
    }
  ];

  selectionChangedGroup(e) {
  }

  getRowClass2 = (e: AXGridRowParams) => {
    if (e.data) {
      return 'font-weight-bold';
    }
  };

  gridDataChild: any = [
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales Executive1',
      employmentType: Math.random().toString(),
      date: new Date(),
      id: 3,
      hasChild: false
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales Executive2',
      employmentType: 'C2',
      date: new Date(),
      id: 4,
      hasChild: false
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales Executive3',
      employmentType: 'C3',
      date: new Date(),
      id: 5,
      hasChild: false
    }
  ];

  gridDataRoot: any = [
    {
      id: 1,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 2,
      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 3,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 4,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 5,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },
    {
      id: 11,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 21,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 31,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 41,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 51,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },
    {
      id: 12,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 22,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 32,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 42,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 512,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },
    {
      id: 111,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 211,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 311,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 411,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 511,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },

    {
      id: 13,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 23,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 33,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 43,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 53,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },
    {
      id: 113,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 213,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 313,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 413,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 513,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },
    {
      id: 123,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 223,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 323,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 423,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 5123,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    },
    {
      id: 1113,
      employmentType: 'Permanent3',
      date: new Date(),
      hasChild: false
    },
    {
      id: 2113,

      employmentType: 'Permanent4',
      date: new Date(),
      hasChild: false
    },
    {
      id: 3113,

      employmentType: 'Contract1',
      date: new Date(),
      hasChild: true
    },
    {
      id: 4113,

      employmentType: 'Contract2',
      date: new Date(),
      hasChild: true
    },
    {
      id: 5113,

      employmentType: 'Contract3',
      date: new Date(),
      hasChild: true
    }
  ];

  group: any = [
    {
      jobTitle: 'CEO',
      rowHeight: 55
    },
    {
      jobTitle: 'Director of Operations'
    },
    {
      jobTitle: 'Parts Technician'
    },
    {
      jobTitle: 'Inventory Control'
    },
    {
      jobTitle: 'Sales Manager'
    }
  ];

  data = [
    {
      athlete: 'Michael Phelps',
      age: 23,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
      rowHeight: 100
    },
    {
      athlete: 'Michael Phelps',
      age: 19,
      country: 'United States',
      year: 2004,
      date: '29/08/2004',
      sport: 'Swimming',
      gold: 6,
      silver: 0,
      bronze: 2,
      total: 8
    },
    {
      athlete: 'Michael Phelps',
      age: 27,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 4,
      silver: 2,
      bronze: 0,
      total: 6
    },
    {
      athlete: 'Natalie Coughlin',
      age: 25,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 1,
      silver: 2,
      bronze: 3,
      total: 6
    },
    {
      athlete: 'Aleksey Nemov',
      age: 24,
      country: 'Russia',
      year: 2000,
      date: '01/10/2000',
      sport: 'Gymnastics',
      gold: 2,
      silver: 1,
      bronze: 3,
      total: 6
    },
    {
      athlete: 'Alicia Coutts',
      age: 24,
      country: 'Australia',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 3,
      bronze: 1,
      total: 5
    },
    {
      athlete: 'Missy Franklin',
      age: 17,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 4,
      silver: 0,
      bronze: 1,
      total: 5
    },
    {
      athlete: 'Ryan Lochte',
      age: 27,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 2,
      silver: 2,
      bronze: 1,
      total: 5
    },
    {
      athlete: 'Allison Schmitt',
      age: 22,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 3,
      silver: 1,
      bronze: 1,
      total: 5
    },
    {
      athlete: 'Natalie Coughlin',
      age: 21,
      country: 'United States',
      year: 2004,
      date: '29/08/2004',
      sport: 'Swimming',
      gold: 2,
      silver: 2,
      bronze: 1,
      total: 5
    },
    {
      athlete: 'Ian Thorpe',
      age: 17,
      country: 'Australia',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 3,
      silver: 2,
      bronze: 0,
      total: 5
    },
    {
      athlete: 'Dara Torres',
      age: 33,
      country: 'United States',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 2,
      silver: 0,
      bronze: 3,
      total: 5
    },
    {
      athlete: 'Cindy Klassen',
      age: 26,
      country: 'Canada',
      year: 2006,
      date: '26/02/2006',
      sport: 'Speed Skating',
      gold: 1,
      silver: 2,
      bronze: 2,
      total: 5,
      rowHeight: 70
    },
    {
      athlete: 'Nastia Liukin',
      age: 18,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Gymnastics',
      gold: 1,
      silver: 3,
      bronze: 1,
      total: 5
    },
    {
      athlete: 'Marit Bjørgen',
      age: 29,
      country: 'Norway',
      year: 2010,
      date: '28/02/2010',
      sport: 'Cross Country Skiing',
      gold: 3,
      silver: 1,
      bronze: 1,
      total: 5
    },
    { athlete: 'Sun Yang', age: 20, country: 'China', year: 2012, date: '12/08/2012', sport: 'Swimming', gold: 2, silver: 1, bronze: 1, total: 4 },
    {
      athlete: 'Kirsty Coventry',
      age: 24,
      country: 'Zimbabwe',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 1,
      silver: 3,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Libby Lenton-Trickett',
      age: 23,
      country: 'Australia',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 2,
      silver: 1,
      bronze: 1,
      total: 4
    },
    {
      athlete: 'Ryan Lochte',
      age: 24,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 2,
      silver: 0,
      bronze: 2,
      total: 4
    },
    {
      athlete: 'Inge de Bruijn',
      age: 30,
      country: 'Netherlands',
      year: 2004,
      date: '29/08/2004',
      sport: 'Swimming',
      gold: 1,
      silver: 1,
      bronze: 2,
      total: 4
    },
    {
      athlete: 'Petria Thomas',
      age: 28,
      country: 'Australia',
      year: 2004,
      date: '29/08/2004',
      sport: 'Swimming',
      gold: 3,
      silver: 1,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Ian Thorpe',
      age: 21,
      country: 'Australia',
      year: 2004,
      date: '29/08/2004',
      sport: 'Swimming',
      gold: 2,
      silver: 1,
      bronze: 1,
      total: 4
    },
    {
      athlete: 'Inge de Bruijn',
      age: 27,
      country: 'Netherlands',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 3,
      silver: 1,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Gary Hall Jr.',
      age: 25,
      country: 'United States',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 2,
      silver: 1,
      bronze: 1,
      total: 4
    },
    {
      athlete: 'Michael Klim',
      age: 23,
      country: 'Australia',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 2,
      silver: 2,
      bronze: 0,
      total: 4
    },
    {
      athlete: "Susie O'Neill",
      age: 27,
      country: 'Australia',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 1,
      silver: 3,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Jenny Thompson',
      age: 27,
      country: 'United States',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 3,
      silver: 0,
      bronze: 1,
      total: 4
    },
    {
      athlete: 'Pieter van den Hoogenband',
      age: 22,
      country: 'Netherlands',
      year: 2000,
      date: '01/10/2000',
      sport: 'Swimming',
      gold: 2,
      silver: 0,
      bronze: 2,
      total: 4
    },
    {
      athlete: 'An Hyeon-Su',
      age: 20,
      country: 'South Korea',
      year: 2006,
      date: '26/02/2006',
      sport: 'Short-Track Speed Skating',
      gold: 3,
      silver: 0,
      bronze: 1,
      total: 4
    },
    {
      athlete: 'Aliya Mustafina',
      age: 17,
      country: 'Russia',
      year: 2012,
      date: '12/08/2012',
      sport: 'Gymnastics',
      gold: 1,
      silver: 1,
      bronze: 2,
      total: 4
    },
    {
      athlete: 'Shawn Johnson',
      age: 16,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Gymnastics',
      gold: 1,
      silver: 3,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Dmitry Sautin',
      age: 26,
      country: 'Russia',
      year: 2000,
      date: '01/10/2000',
      sport: 'Diving',
      gold: 1,
      silver: 1,
      bronze: 2,
      total: 4
    },
    {
      athlete: 'Leontien Zijlaard-van Moorsel',
      age: 30,
      country: 'Netherlands',
      year: 2000,
      date: '01/10/2000',
      sport: 'Cycling',
      gold: 3,
      silver: 1,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Petter Northug Jr.',
      age: 24,
      country: 'Norway',
      year: 2010,
      date: '28/02/2010',
      sport: 'Cross Country Skiing',
      gold: 2,
      silver: 1,
      bronze: 1,
      total: 4
    },
    {
      athlete: 'Ole Einar Bjørndalen',
      age: 28,
      country: 'Norway',
      year: 2002,
      date: '24/02/2002',
      sport: 'Biathlon',
      gold: 4,
      silver: 0,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Janica Kostelic',
      age: 20,
      country: 'Croatia',
      year: 2002,
      date: '24/02/2002',
      sport: 'Alpine Skiing',
      gold: 3,
      silver: 1,
      bronze: 0,
      total: 4
    },
    {
      athlete: 'Nathan Adrian',
      age: 23,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 2,
      silver: 1,
      bronze: 0,
      total: 3
    },
    {
      athlete: 'Yannick Agnel',
      age: 20,
      country: 'France',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 2,
      silver: 1,
      bronze: 0,
      total: 3
    },
    {
      athlete: 'Brittany Elmslie',
      age: 18,
      country: 'Australia',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 2,
      bronze: 0,
      total: 3
    },
    {
      athlete: 'Matt Grevers',
      age: 27,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 2,
      silver: 1,
      bronze: 0,
      total: 3
    },
    {
      athlete: 'Ryosuke Irie',
      age: 22,
      country: 'Japan',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 0,
      silver: 2,
      bronze: 1,
      total: 3
    },
    {
      athlete: 'Cullen Jones',
      age: 28,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 2,
      bronze: 0,
      total: 3
    }
  ];
  gridGroupDataRoot: any = [
    {
      jobTitle: 'CEO',
      employmentType: 'Permanent'
    },
    {
      jobTitle: 'CEO',
      employmentType: 'Permanent'
    },
    {
      jobTitle: 'Director of Operations',
      employmentType: 'Permanent'
    },
    {
      jobTitle: 'Director of Operations',
      employmentType: 'Permanent'
    },
    {
      jobTitle: 'Parts Technician',
      employmentType: 'Contract'
    },
    {
      jobTitle: 'Parts Technician',
      employmentType: 'Contract'
    },
    {
      jobTitle: 'Inventory Control',
      employmentType: 'Permanent'
    },
    {
      jobTitle: 'Inventory Control',
      employmentType: 'Permanent 2'
    },
    {
      jobTitle: 'Sales Manager',
      employmentType: 'Permanent'
    }
  ];

  f = [
    {
      employmentType200: 'Permanent12sdf'
    },
    {
      employmentType200: 'Permanent 2sdfs21f'
    },
    {
      jobTitle: 'Director of Operations',
      employmentType: 'Permanents',
      employmentType200: 'sd;fsjfkls'
    }
  ];

  handleMenuItemClick(e) {}

  selectionChanged(e) {
  }

  deSelect() {
    this.grid.deselectAll();
  }

  onRowSelectionChanged(e) {
  }

  rowSelectionChange(e) {
    this.unselect();
  }

  filterGroups: AXFilterColumnGroup[] = [
    {
      caption: 'Information',
      columns: [
        {
          caption: 'Number',
          type: 'text',
          field: 'id'
        }
      ]
    }
  ];

  onItemClick(e) {
    this.popup.open(TestPage, 'Input Demo');
  }
  handleMenuItemClick2(e) {
    this.popup.open(TestPage, 'Input Demo');
  }
  rebuildClick() {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 10000);
    const id = this.loadingService.show(this.ref.nativeElement.querySelector('.loading-xxx'));
    this.numColumns.push({});
    setTimeout(() => {
      //this.grid.rebuildGrid();
      this.loadingService.hide(id);
    }, 1000);
  }
  onFilterChange(e) {}
  toolbarItemsEnd: AXMenuItem[] = [
    {
      icon: 'fas fa-save',
      text: 'Add',
      style: 'ax success'
    },
    {
      icon: 'fas fa-trash',
      text: 'Remove',
      disable: true,
      style: 'ax danger'
    }
  ];

  commandItems: AXMenuItem[] = [
    {
      name: 'edit',
      style: 'ax success blank',
      icon: 'far fa-pen',
      disable: true
    },
    {
      name: 'delete',
      style: 'ax danger blank',
      icon: 'far fa-trash-alt'
    }
  ];

  refreshClick() {
    //  this.gridTree.refresh();
    this.gridTree.paginationGoToPage(13);
  }
  getCommandItems = (row: any) => {
    if (row.data.jobTitle == 'CEO') return this.commandItems.filter((c) => c.name != 'edit');
    else return this.commandItems;
  };
  makeDate() {
    return [];
  }

  provide223 = (e) => {
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
              resolve({
                items: res.result.foods.filter((c) => c.ID === 107),
                totalCount: 1
              });
            }, 0);
          } else {
            setTimeout(() => {
              resolve({ items: res.result.foods, totalCount: 71 });
            }, 0);
          }
        });
    });
  };
  searchVisible: boolean = true;
  resizeGrid() {
    this.searchVisible = !this.searchVisible;
  }
  provideData = (e) => {
    if (e.group.keys.length === 0) {
      return new Promise((resolve) => {
        resolve(this.gridDataRoot);
      });
    } else if (e.group.keys.length === 1) {
      return new Promise((resolve) => {
        this.gridDataChild[0].employmentType = Math.random().toString();
        resolve(this.gridDataChild.filter((c) => c.id == e.group.keys[e.group.keys.length - 1]));
      });
    } else {
      return new Promise((resolve) => {
        resolve(this.makeDate());
      });
    }
  };

  provide = (e) => {
    return new Promise((resolve) => {
      resolve(this.gridDataRoot);
    });
  };

  provide2 = (e) => {
    return new Promise((resolve) => {
      resolve(this.gridDataRoot);
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
  unselect(){
    this.gridTree.deselectByKeyField(2793499);
  }
  // `http://192.168.25.71:30115/hotel/list`

  getReserveListGrid = (item) => {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          `https://api.tport.ir/hotel/list`,
          {
            take: item.take,
            skip: item.skip,
            sort: null,
            group: null,
            aggregate: null,
            data: {
              agencyId: null
            },
            filter: {},
            providerQualifier: 'reserveRequestGridProvider'
          },
          {
            headers: {
              Authorization: `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFOSkhEU1VFTThMSkQ3MzI5Sk5ESEszMjBNSkwifQ.eyJhZGRpdGlvbmFsSW5mb3JtYXRpb24iOnsidXNlcl9wZXJzb25faWQiOjczLCJvcmdhbml6YXRpb25fdXNlcl9pZCI6NzAsImFwcGxpY2F0aW9uX3N5c3RlbV9pZCI6MTl9LCJ1c2VyX2lkIjo3MCwidXNlcl9uYW1lIjoiY3JzX2FkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImNyZWF0aW9uX2RhdGUiOiIyMDIyLTA2LTEzVDE0OjU4OjUwLjQwMyIsImV4cCI6MTcxODE4ODEzMCwianRpIjoiZjk5YWQ2YzMtM2ZmNS00MzljLTlhZmItNDE3OTRhZjM4NzIyIiwiYXV0aG9yaXRpZXMiOlsiMTAtMjEiLCJBR0VOQ1lfQ0hBTkVTX1dBSVRJTkdfQVBQUk9WQUwiLCJBR0VOQ1lfTElTVCIsIkFHRU5DWV9NQU5BR0VNRU5UIiwiQ0hBTkdFU19XQUlUSU5HX0FQUk9WQUwiLCJDSVRZX0xJU1QiLCJDUkVBVEVfSE9URUxfQUdFTkNZX1JFUVVFU1QiLCJDUkVBVEVfVVNFUl9SRVFVRVNUIiwiQ1JTX0FDQ09VTlRJTkciLCJDUlNfQU5OVUFMX0ZFRVNfUkVQT1JUIiwiQ1JTX0JBU0lDX0lORk9STUFUSU9OIiwiQ1JTX0NSRUFURV9IT1RFTF9BR0VOQ1kiLCJDUlNfUkVTRVJWRV9GSU5BTkNJQUxfUkVQT1JUIiwiRElTQ09VTlQtTUFOQUdFTUVOVCIsIkhPVEVMU19NQU5BR0VNRU5UIiwiSE9URUxTX1BJQ1RVUkVTX01BTkFHRU1FTlQiLCJIT1RFTF9BVFRSQUNUSU9OU19ESVNUQU5DRSIsIkhPVEVMX0NIQU5HRVNfV0FJVElOR19BUFBST1ZBTCIsIkhPVEVMX0xJU1QiLCJNRUhSX1BSSUNFIiwiTkVXX0FHRU5DWV9SRVFVRVNUIiwiTkVXX0hPVEVMX1JFUVVFU1QiLCJPRkZFUl9QUklDRSIsIlBNU19MSVNUIiwiUE1TX01BTkFHRU1FTlQiLCJQTVNfTUFQUEVEX0hPVEVMIiwiUE1TX01BUFBFRF9ST09NUyIsIlRPVVJJU1RfQVRUUkFDVElPTlMiLCJVU0VSX01BTkFHRU1FTlQiLCJXQVJSQU5UWV9DT05UUkFDVFNfTElTVCIsIldhbGxldC1NYW5hZ2VtZW50IiwiY3JzLXJlc2VydmUtbGlzdCIsImNycy11c2VyLW1hbmFnZW1lbnQiLCJkZXBvc2l0LXdhbGxldCIsImhvdGVsLWFnZW5jeS11c2VyLW1hbmFnZW1lbnQiLCJwYWdlLW1hbmFnZW1lbnQiLCJ3aXRoZHJhd2FsLXdhbGxldCJdLCJjbGllbnRfaWQiOiJjbGllbnRBcHBJZCJ9.IyeL0LOAj8crSVtHt2BWPt7Sfle1s5AGyezNk4HH0eOZddGtzh3G-z0OXurL8fuR1PqkOXJuz-6WGeFC-p59IrCaz67R6iP4Ct4EyAr4Sj0TF-mDEO2pB_w7SAOGHgMeDkjluFL6ZAhOOLbxsini3-Ncn5lo2P38-jo5C47NOfF_GsmqwctdP9xC3Ls9RZhS2wLlkGNw0brhs2NA1ykPbi2iVSe_AtpLqVpMo8a9Uyfyd61nRdjxHJyI4N6WyBB4qp9Uis6ySP9ThWmM_OAwEMG68mLo-Os392VTHBDb5OnAnSpSVwK8mmGXoA4u1NJzdseROdeqrbQnjdl8Bo3hYQ`
            }
          }
        )
        .toPromise()
        .then((res: any) => {
          resolve({ items: res.data, totalCount: res.total || 0 });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  provide2Data = (e) => {
    if (e.group.keys.length === 0) {
      return new Promise((resolve) => {
        //resolve(this.group);
        resolve(this.g1);
      });
    } else if (e.group.keys.length === 2) {
      return new Promise((resolve) => {
        resolve(this.g3.filter((c) => c.groupId == 1));
      });
    } else if (e.group.keys.length === 1) {
      return new Promise((resolve) => {
        resolve(this.g2.filter((c) => c.comissionId == 1));
        // resolve(this.gridGroupDataRoot.filter((c) => c.jobTitle === e.group.keys[e.group.keys.length - 1]));
      });
    }
  };
  provide3Data = (e) => {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  };
  columnGroupOpened(e) {}

  // getDataPath = (item: any) => {
  //   return item.orgHierarchy;
  // };

  getServerSideGroupKey(e) {}

  onCommandItemClick(e) {
    this.dialog.confirm(
      'Dialog Title',
      `Lorem ipsum, or lipsum as it is sometimes known,
  is dummy text used in laying out print, graphic or
  web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to
  have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.`
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  selectionCondition = (params) => {
    if (params.data.hasChild) {
      return true;
    } else {
      return false;
    }
  };
}
