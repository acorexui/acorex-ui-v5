import { Component } from '@angular/core';
import { AXMenuItem } from '@acorex/core';

@Component({
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage {
  constructor() {}
  menuItems: AXMenuItem[] = [
    { text: 'New',startIcon: 'fas fa-rocket', style: 'ax primary', disable: true, tooltip: 'Hello world!' },
    { text: 'Remove', startIcon: 'fas fa-rocket', style: 'ax success', tooltip: 'Hello world!' },
    { text: 'Update', startIcon: 'fas fa-rocket', style: 'ax light' },
    { text: 'Update', startIcon: 'fas fa-rocket', endIcon: 'fas fa-rocket', style: 'ax light' },
    { startIcon: 'fas fa-rocket', style: 'ax light' },
    {
      text: 'More',
      startIcon: 'fas fa-rocket',
      style: 'ax light',
      endIcon: '',
      items: [
        {
          text: 'New',
          startIcon: 'fas fa-rocket'
        },
        {
          text: 'Remove',
          startIcon: 'fas fa-rocket',
          items: [
            { text: 'New', icon: 'farfa-rocket', startIcon: 'fas fa-rocket', style: 'ax primary blank', disable: true },
            { text: 'Remove', startIcon: 'fas fa-rocket', style: 'ax success blank' },
            { text: 'Remove', startIcon: 'fas fa-rocket', style: 'ax primary blank', endIcon: 'fas fa-rocket' }
          ],
          divider: true
        },
        { text: 'Update', startIcon: 'fas fa-rocket' }
      ]
    }
  ];
  handleItemClick(event) {}
  contextItems: AXMenuItem[] = [
    {
      text: 'New',
      startIcon: 'fas fa-plus',
      items: [
        {
          text: 'New Item',
          startIcon: 'fas fa-plus',
          items: [
            { text: 'New Item', startIcon: 'fas fa-plus' },
            { text: 'New Object', startIcon: 'fas fa-plus' },
            { text: 'New Array', startIcon: 'fas fa-plus' }
          ]
        },
        { text: 'New Object', startIcon: 'fas fa-plus' },
        { text: 'New Array', startIcon: 'fas fa-plus' }
      ],
      divider: true
    },
    {
      text: 'Copy',
      items: [
        { text: 'Copy Item', startIcon: 'fas fa-plus' },
        { text: 'Copy Object', startIcon: 'fas fa-plus' },
        { text: 'Copy Array', startIcon: 'fas fa-plus' }
      ]
    },
    { text: 'Cut' },
    { text: 'Delete' }
  ];
}
