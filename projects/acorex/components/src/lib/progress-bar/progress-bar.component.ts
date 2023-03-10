import { Component, Input } from '@angular/core';
import { AXBaseComponent } from '../base/element.class';

@Component({
  selector: 'ax-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class AXProgressBarComponent extends AXBaseComponent {
  @Input() progress: number = 0;
}
