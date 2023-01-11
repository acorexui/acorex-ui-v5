import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ax-loading-indicator',
  templateUrl: './loading-indicator.component.html'
})
export class AXLoadingIndicatorComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.size = 80;
  }

  @Input()
  size: number;
}
