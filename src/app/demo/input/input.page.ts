import { Component, OnInit, ViewChild } from '@angular/core';
import { AXValidationFormComponent, AXBasePopupPageComponent, AXMenuItemClickEvent } from '@acorex/components';
import { AXButtonItem, AXMenuItem } from '@acorex/core';

@Component({
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss']
})
export class InputPage extends AXBasePopupPageComponent implements OnInit {
  text: string = '12500000';

  textBoxValue: string = 'Sample';
  textBoxDisabled: boolean;

  number: number;
  searchValue: string = null;
  selected: any[] = [
    {
      id: 1,
      name: 'test'
    }
  ];

  maxlength: number = 10;

  @ViewChild('textAreaValidation')
  textAreaValidation: AXValidationFormComponent;

  masks = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() {
    super();

    //throw new Error('asdasdassd');
  }

  menuItems: AXMenuItem[] = [
    { text: 'Edit', name: 'edit', icon: 'farfa-pen', style: 'ax primary' },
    { text: 'Add', name: 'add', icon: 'farfa-plus', style: 'ax success', disable: true },
    { text: 'Save', name: 'save', icon: 'farfa-save', style: 'ax success' }
  ];
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
      id: '15'
    },
    {
      // orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
      jobTitle: 'Sales1',
      id: '16'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales2',
      id: '17'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales3',
      id: '18'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales4',
      id: '19'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales5',
      id: '20'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales6',
      id: '21'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales7',
      id: '22'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales8',
      id: '23'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales9',
      id: '24'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales10',
      id: '25'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales11',
      id: '26'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales12',
      id: '27'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales13',
      id: '28'
    },
    {
      //  orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
      jobTitle: 'Sales14',
      id: '29'
    },
    {
      //   orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
      jobTitle: 'Sales15',
      id: '30'
    }
  ];

  provideData = (e) => {
    return new Promise((resolve) => {
      const result: any = {
        items: this.gridData,
        totalCount: this.gridData.length
      };

      resolve(result);
    });
  };

  ngOnInit() {
    this.isLoading = true;
  }

  getFooterButtons() {
    return [
      {
        text: 'Hi Arash',
        name: 'button',
        style: 'success',
        disable: true
      }
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  handleClick() {}

  onValueChanged(e) {
  }
  num = '12';
  testTime;

  clear() {
    this.num = '';
  }

  appendToTextBoxClick(e) {
    this.textBoxValue = (this.textBoxValue ?? '') + 'Test';
  }

  textBoxDisableToggle(e) {
    this.textBoxDisabled = !this.textBoxDisabled;
  }

  validateTextArea(e) {
    this.textAreaValidation.validate().then();
    //const tab1 = this.tabService.open('widgets', 'Page 1');
    //this.close();

    this.footerButtons[0].disable = false;
    this.configFooterButtons();
  }

  onClosing(e) {
    e.data = { name: 'Ha ha' };
  }

  onFooterButtonClick(e: AXMenuItemClickEvent) {
    this.close();
  }

  NumberBosdsdx(e) {
  }
}
