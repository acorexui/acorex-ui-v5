import { Component, Input, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'ax-tab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AXTabComponent {
  @Input() caption: string;
  @Input() name: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template: any;
  @Input() dataContext: any;
  @Input() icon: string;
}
