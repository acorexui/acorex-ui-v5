import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AXBaseTextComponent, AXValidatableComponent } from '../base/element.class';

@Component({
  selector: 'ax-password-box',
  templateUrl: './password-box.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style:'width: 100%' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXPasswordBoxComponent }]
})
export class AXPasswordBoxComponent extends AXBaseTextComponent {
  constructor(protected cdr: ChangeDetectorRef, ref: ElementRef) {
    super(cdr, ref);
  }

  type: 'text' | 'password' = 'password';
  eyeIcon: string = 'far fa-eye';

  handleShowPassword() {
    this.eyeIcon = 'far fa-eye-slash';
    if (this.type === 'password') {
      this.type = 'text';
      this.eyeIcon = 'far fa-eye-slash';
    } else {
      this.type = 'password';
      this.eyeIcon = 'far fa-eye';
    }
  }
}
