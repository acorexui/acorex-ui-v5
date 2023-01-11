import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AXBaseComponent, AXBaseSizableComponent, AXElementSize } from '../base/element.class';

@Component({
  selector: 'ax-label',
  templateUrl: './label.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AXLabelComponent extends AXBaseComponent implements AXBaseSizableComponent {
  constructor() {
    super();
  }

  @Input()
  size: AXElementSize = 'md';

  ngOnInit(): void {}
}
