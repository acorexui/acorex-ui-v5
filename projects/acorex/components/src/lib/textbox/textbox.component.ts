import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { AXBaseTextComponent, AXValidatableComponent } from '../base/element.class';

@Component({
  selector: 'ax-text-box',
  templateUrl: './textbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style:'width: 100%' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXTextBoxComponent }]
})
export class AXTextBoxComponent extends AXBaseTextComponent {

  @Input()
  mask: any;

  @Input()
  type: 'text' | 'number' | 'tel' | 'url' | 'password' | 'search' = 'text';

  @Input()
  showMask: boolean = true;

  @Input()
  maxLength: number;

  @Input()
  maskGuid: boolean = false;

  @Input()
  maskPlaceholder: string = '_';

  @Input()
  maskKeepCharPositions: boolean = false;

  constructor(protected cdr: ChangeDetectorRef, ref: ElementRef) {
    super(cdr, ref);
  }
}
