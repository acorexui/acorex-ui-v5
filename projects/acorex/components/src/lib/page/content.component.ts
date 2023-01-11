import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'ax-page-content',
  template: `
    <div class='ax-page-content'>
      <div class='inner-content'>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    ':host { height:100% }'
  ]
})
export class AXPageContentComponent {
  constructor(private el: ElementRef) { }
}
