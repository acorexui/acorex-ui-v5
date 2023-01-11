import { OnInit, Component, ViewChild } from '@angular/core';
// import { timeInterval } from 'rxjs/operators';
import { AXTreeViewComponent, AXTreeViewselectionChangedEvent, AXTreeViewItemMovedEvent } from '@acorex/components';
import { AXMenuItem } from '@acorex/core';

@Component({
  templateUrl: './tree-view.page.html'
})
export class TreeViewPage implements OnInit {
  @ViewChild('treeView', { static: true })
  treeView: AXTreeViewComponent;
  disableCheckBox: string = 'disableCheckBox';
  select: any[] = [];
  constructor() {}

  rootData: any = [
    {
      title: 'childless2',
      hasChild: false,
      disableCheckBox: true
    },
    {
      title: 'childless grandsibiling',
      hasChild: true
    },
    {
      title: 'childless sibiling',
      hasChild: true
    },
    {
      title: 'another childless sibiling',
      hasChild: true
    },
    {
      title: 'parent',
      hasChild: true
    },
    {
      title: 'another parent',
      hasChild: true
    },
    {
      title: 'another grandparent',
      hasChild: true
    }
  ];
  child1: any = [
    {
      title: 'childless',
      hasChild: false
    },
    {
      title: 'childless grandsibiling',
      hasChild: true
    },
    {
      title: 'childless sibiling',
      hasChild: false
    },
    {
      title: 'another childless sibiling',
      hasChild: false
    },
    {
      title: 'parent',
      hasChild: true
    },
    {
      title: 'another parent',
      hasChild: false
    },
    {
      title: 'another grandparent',
      hasChild: true
    }
  ];

  child2: any = [
    {
      title: 'childless2',
      hasChild: false
    },
    {
      title: 'childless grandsibiling2',
      hasChild: true
    },
    {
      title: 'childless sibiling2',
      hasChild: false
    }
  ];

  selectionNode(e: AXTreeViewselectionChangedEvent) {
  }
  selectAllClick() {
    this.treeView.selectAll();
  }
  UnselectAllClick() {
    this.treeView.unSelectAll();
  }
  openAllClickWithLoad() {
    this.treeView.openAll(true);
  }
  openAllClickNoLoad() {
    this.treeView.openAll(false);
  }
  closeAllClick() {
    this.treeView.closeAll();
  }
  getNodesClick() {
    this.treeView.scrolIntoView(this.rootData[4]);
  }

  getSelectedChild() {
  }

  getSelectedParent() {
  }

  onItemDrag(e) {
  }

  // onItemDrop(e) {
  // }
  makeData(d) {
    const dd = [];

    for (let index = 0; index < 5; index++) {
      let b = false;
      if (index === 0 || index === 2 || index === 5) {
        b = true;
      }
      dd.push({
        title: d.title + index,
        hasChild: b
      });
    }
    return dd;
  }
  contextItems1: AXMenuItem[] = [
    {
      text: 'کپی',
      divider: true
    },
    { text: 'انتقال', divider: true },
    { text: 'حذف', divider: true },
    {
      text: 'جدید',
      startIcon: 'fas fa-plus',
      items: [
        {
          text: 'آیتم جدید',
          startIcon: 'fas fa-plus',
          items: [
            { text: 'آیتم نوع اول', startIcon: 'fas fa-plus' },
            { text: 'آیتم نوع دوم', startIcon: 'fas fa-plus' },
            { text: 'آبجکت', startIcon: 'fas fa-plus' }
          ]
        },
        { text: 'آبجکت نوع اول', startIcon: 'fas fa-plus' },
        { text: 'آبجکت نوع دوم', startIcon: 'fas fa-plus' }
      ]
    }
  ];

  contextItems2: AXMenuItem[] = [
    {
      text: 'Copy'
    },
    {
      text: 'New',
      startIcon: 'fas fa-plus',
      divider: true
    }
  ];
  gridDataRoot2: any = [
    {
      title: 'childless',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs1',
          hasChild: true,
          childeren: [{ title: 'childless11', hasChild: false }]
        }
      ]
    },
    {
      title: 'childless grandsibiling',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs2',
          hasChild: true,
          childeren: [{ title: 'childless22', hasChild: false }]
        }
      ]
    },
    {
      title: 'childless sibiling',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs3',
          hasChild: true,
          childeren: [{ title: 'childless33', hasChild: false }]
        }
      ]
    },
    {
      title: 'another childless sibiling',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs4',
          hasChild: true,
          childeren: [{ title: 'childless44', hasChild: false }]
        }
      ]
    },
    {
      title: 'parent',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs5',
          hasChild: true,
          childeren: [{ title: 'childless55', hasChild: false }]
        }
      ]
    },
    {
      title: 'another parent',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs6',
          hasChild: true,
          childeren: [{ title: 'childless66', hasChild: false }]
        }
      ]
    },
    {
      title: 'another grandparent',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs7',
          hasChild: true,
          childeren: [{ title: 'childless77', hasChild: false }]
        }
      ]
    },
    {
      title: 'parent',
      hasChild: true,
      childeren: [
        {
          title: 'sdsfs8',
          hasChild: true,
          childeren: [
            {
              title: 'childless88',
              hasChild: false
            }
          ]
        }
      ]
    }
  ];

  selectedItem = [
    // ['parent2', 'parent21', 'parent'],
    // ['parent2', 'parent23', 'parent'],
    // ['parent0', 'parent00', 'parent001']
  ];
  pushSellected() {
    this.selectedItem.push(['parent2', 'parent21', 'parent']);
    this.treeView.refresh();
  }

  onSelectionChange(e) {
    this.select = e;
  }

  onSelectionChange2(e) {
    //this.select = e;
    ;
    //e.value.parent.selectParent();
    //  e.value.children.selectChilds();
  }

  onItemClick(e) {
    // e.cancel = true;
  }

  onItemOpening(e) {
  }

  onItemClosing(e) {
  }

  seletedKeyFieldsChanged(e) {
  }

  getselectedKeyClick() {
  }

  onContextMenuItemClick(e) {
  }

  provideCMList = (e) => {
    return new Promise((resolve) => {
      if (e.title == 'childless') {
        resolve(this.contextItems2);
      } else {
        resolve(this.contextItems1);
      }
    });
  };

  provideData = (e) => {
    if (e == null) {
      return new Promise((resolve) => {
        resolve(this.rootData);
      });
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.makeData(e));
        }, 1000);
      });
    }
  };

  provideData2 = (e) => {
    return new Promise((resolve) => {
      resolve(this.gridDataRoot2);
    });
  };

  ngOnInit() {}

  onItemMoved(e: AXTreeViewItemMovedEvent) {
    setTimeout(() => {
      e.resolve(false);
    }, 500);
  }
}
