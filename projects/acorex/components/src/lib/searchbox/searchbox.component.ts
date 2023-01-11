import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXBaseTextComponent } from '../base/element.class';
import { AXBaseEvent, AXValueEvent } from '../base/events.class';


@Component({
  selector: 'ax-search-box',
  templateUrl: './searchbox.component.html',
  host: { style:'width: 100%' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXSearchBoxComponent extends AXBaseTextComponent {

  @Output()
  public textChanged: EventEmitter<AXValueEvent<any>> = new EventEmitter<AXValueEvent<any>>();
  @Output()
  onButtonClick: EventEmitter<AXValueEvent<any>> = new EventEmitter<AXValueEvent<any>>();

  @Input()
  placeholder: string = 'جستجو ...';

  constructor(protected cdr: ChangeDetectorRef, ref: ElementRef) {
    super(cdr, ref);
  }

  private _text: string;
  @Input()
  public get text(): string {
    return this._text;
  }
  public set text(v: string) {
    if (v !== this._text) {
      const old = this._text;
      this._text = v;
      this.textChanged.emit({
        component: this,
        value: v,
        oldValue: old
      });
    }
  }

  ngOnInit() {
    this.value = '';
    this.text = '';
  }

  onSearchChanged(text: string) {
    if (!this.searchChangeObserver) {
      Observable.create(observer => {

        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(this.delay))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          this.text = c;
          this.value = c;
        });
    }

    this.searchChangeObserver.next(text);
  }

  @Input()
  delay: number = 500;

  private searchChangeObserver: any;

  handleKeyEvent(e: KeyboardEvent) {
    //  this.searchChangeObserver.next(this.text);
    this.onkey.emit(e);
  }

  click(e: MouseEvent) {
    this.onButtonClick.emit({
      component: this,
      htmlElement: this.ref.nativeElement,
      value: this.text
    });
    // this.searchChangeObserver.next(this.text);
  }
}
