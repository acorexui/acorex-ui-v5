import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { AXBaseTextComponent, AXValidatableComponent } from '../base/element.class';

@Component({
  selector: 'ax-text-area',
  templateUrl: './textarea.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style:'width: 100%' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXTextAreaComponent }]
})
export class AXTextAreaComponent extends AXBaseTextComponent {
  constructor(protected cdr: ChangeDetectorRef, ref: ElementRef) {
    super(cdr, ref);
  }

  @Input()
  rows: number = 0;
  @Input()
  cols: number = 0;

  @Input()
  maxLength: number = null;
}
