import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AXPropertyConfig, AXProperyEditorValueChangeEvent, AXSearchBarComponent } from '@acorex/components';
import { AXDateTime } from '@acorex/core';
@Component({
  templateUrl: './search-bar.page.html'
})
export class SearchBarPage implements AfterViewInit {
  constructor() {}
  ngAfterViewInit(): void {
    this.items[4].value = [{ text: 'مرد', value: 1 }];
    this.items[this.items.length - 1].value = [{ text: 'زن', value: 2 }];

    this.searchBar.refresh();
  }

  @ViewChild('searchBar') searchBar: AXSearchBarComponent;

  _context: any;
  prop = {
    property: {
      editorClass: 'ax/editors/select',
      name: 'genderType',
      title: 'جنسیت',
      row: 2,
      col: {
        md: 6,
        sm: 12
      },
      order: 2,
      editorOptions: {
        remoteOperation: true,
        selectionMode: 'single',
        textField: 'text',
        valueField: 'value',
        // returnAllData: true,
        items: () => {
          return (e) => {
            return this.handleData(e);
          };
        }
      }
    },
    value: 1
  };

  handleChangeValue(e) {
    if (e.property.name === 'genderType') {
      this.searchBar.clearItem('genderType2');
    }
  }

  counter = 0;
  onSearchValue(e) {
    debugger;
    console.log('emit is', this.counter++);
  }

  handleValueChange(e: AXProperyEditorValueChangeEvent) {}

  items: AXPropertyConfig[] = [
    {
      property: {
        editorClass: 'ax/editors/date',
        name: 'startDate',
        title: 'تاریخ',
        editorOptions: {
          type: 'jalali'
        },
        filterOptions: {
          operator: 'gte'
        },
        row: 1,
        col: 3,
        visible: true
      },
      value: new AXDateTime().toISOString()
    },
    {
      property: {
        editorClass: 'ax/editors/date',
        name: 'startDate',
        title: 'تاریخ',
        editorOptions: {
          type: 'jalali'
        },
        filterOptions: {
          operator: 'lte'
        },
        row: 1,
        col: 3,
        visible: true
      },
      value: new AXDateTime().toISOString()
    },

    {
      property: {
        editorClass: 'ax/editors/selectBox',
        name: 'startDate',
        title: 'text',
        editorOptions: {
          remoteOperation: true,
          textField: 'name',
          valueField: 'id',
          items: () => {
            return (e) => {
              return Promise.resolve<any[]>([
                {
                  id: 1,
                  name: 'اضافات'
                },
                {
                  id: 2,
                  name: 'کسورات'
                }
              ]);
            };
          }
        },
        row: 1,
        col: 3,
        visible: true
      },
      value: null
    },
    {
      property: {
        editorClass: 'ax/editors/selectBox',
        name: 'text',
        title: 'جنیست',
        editorOptions: {
          returnAllData: true,
          remoteOperation: true,
          selectionMode: 'single',
          textField: 'text',
          valueField: 'value',
          // returnAllData: true,
          items: () => {
            return (e) => {
              return this.handleData(e);
            };
          }
        },

        row: 1,
        col: 12
      },
      value: [{ text: 'مرد', value: 1 }]
    },
    {
      property: {
        editorClass: 'ax/editors/selectBox',
        name: 'text',
        title: '1جنیست',
        editorOptions: {
          returnAllData: true,
          remoteOperation: true,
          selectionMode: 'single',
          textField: 'text',
          valueField: 'value',
          // returnAllData: true,
          items: () => {
            return (e) => {
              return this.handleData(e);
            };
          }
        },

        row: 1,
        col: 12
      },
      value: null
    },
    {
      property: {
        editorClass: 'ax/editors/selectBox',
        name: 'text',
        title: '2جنیست',
        editorOptions: {
          returnAllData: true,
          remoteOperation: true,
          selectionMode: 'single',
          textField: 'text',
          valueField: 'value',
          // returnAllData: true,
          items: () => {
            return (e) => {
              return this.handleData(e);
            };
          }
        },

        row: 1,
        col: 12
      },
      value: [{ text: 'مرد', value: 1 }]
    }
  ];

  handleData = (e) => {
    return Promise.resolve({
      items: [
        { text: 'مرد', value: 1 },
        { text: 'زن', value: 2 }
      ],
      totalCount: 2
    });
  };
}
