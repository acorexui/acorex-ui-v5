import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AXTreeSideMenuComponent } from '@acorex/components';

@Component({
  templateUrl: './tree-side-menu.page.html',
  styleUrls: ['./tree-side-menu.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeSideMenuPage implements OnInit {
  @ViewChild('treeSideMenu', { static: true })
  treeSideMenu: AXTreeSideMenuComponent;

  ngOnInit(): void {}

  select: any[] = [];
  constructor() {}

  rootData: any = [
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

  onSelectionChange(e) {
    this.select = e;
  }

  onItemClick(e) {
    if (e.item.parentNode == undefined) {
      this.treeSideMenu.closeAll();
    }
  }

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
}
