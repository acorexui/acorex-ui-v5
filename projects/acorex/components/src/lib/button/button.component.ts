import { Component, Input, ViewEncapsulation, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AXBaseButtonComponent } from '../base/element.class';

@Component({
  selector: 'ax-button',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button.component.html'
})
export class AXButtonComponent extends AXBaseButtonComponent {

  constructor(private el: ElementRef) {
    super();
  }

  @ViewChild('container', { static: true }) container: ElementRef<HTMLButtonElement>;

  @Input()
  type: string = 'primary';

  @Input()
  icon: string;

  @Input()
  submitBehavior: boolean = false;

  @Input()
  cancelBehavior: boolean = false;

  @Input()
  block: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  selected: boolean = false;

  ngAfterViewInit(): void {
    if (this.submitBehavior) {
      setTimeout(() => {
        this.focusButton();
      }, 10);
    }
  }



  handleClick(e: MouseEvent) {
    if (this.disabled === true) {
      this.click.emit({
        component: this,
        htmlElement: this.el.nativeElement,
        htmlEvent: e,
      });
      e.stopPropagation();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(e: KeyboardEvent) {
    if (this.cancelBehavior) {
      this.handleClick(null);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }

  focusButton() {
    this.container.nativeElement.focus();
  }
}
