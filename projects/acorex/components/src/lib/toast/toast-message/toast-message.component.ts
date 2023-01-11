import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AXToastMessageComponent implements OnInit {
  constructor(private elRef: ElementRef) { }

  @Input() title: string = '';
  @Input() message: string;
  @Input() timeOut: number = 6000;
  @Input() closeable: boolean = false;

  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';

  style: string = 'info';
  icon: string = '';
  toastWidth: number = 100;

  ngOnInit(): void {
    if (this.timeOut) {
      const interval = setInterval(() => {
        --this.toastWidth;
        if (this.toastWidth === 0) {
          clearInterval(interval);
          this.close();
        }
      }, this.timeOut / 100);
    }
    switch (this.type) {
      case 'success':
        this.style = 'success';
        break;
      case 'warning':
        this.style = 'warning';
        break;
      case 'error':
        this.style = 'error';
        break;
      default:
        this.style = 'info';
        break;
    }
    switch (this.type) {
      case 'success':
        this.icon = 'fas fa-check-circle';
        break;
      case 'warning':
        this.icon = 'fas fa-exclamation-triangle';
        break;
      case 'error':
        this.icon = 'fas fa-exclamation-circle';
        break;
      default:
        this.icon = 'fas fa-info-circle';
        break;
    }
  }
  close() {
    this.elRef.nativeElement.parentElement.removeChild(this.elRef.nativeElement);
  }
}
