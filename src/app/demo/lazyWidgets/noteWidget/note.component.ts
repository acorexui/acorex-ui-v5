import { Component, OnInit, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { AXWidgetComponent } from '@acorex/layout';
import { EventEmitter } from 'events';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { array } from '@amcharts/amcharts4/core';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteWidgetComponent {
  constructor(private zone: NgZone) {
    // super();
    // this.bg
    // this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 1, content: 'wer' }];
  }

  @ViewChild('contentContainer') contentContainer: ElementRef<HTMLDivElement>;
  @ViewChild('note') note: ElementRef<HTMLDivElement>;

  noteBackgroundColor: string;
  cursorPosition: number = 0;
  showNote: boolean = true;
  notes: any = [];

  // focusout = new EventEmitter();

  // colors = ['#fff7d1', '#e4f9e0', '#ffe4f1', '#9e9e9e', '#f2e6ff', '#e2f1ff', '#f3f2f1'];
  colors: any = ['#ffe66e', '#a1ef9b', '#ffafdf', '#d7afff', '#9edfff', '#e0e0e0', '#767676'];
  addNote() {
    this.notes.push({ id: this.notes.length, content: '' });
  }

  saveNote() {
    const id = this.note.nativeElement.getAttribute('id');
    const content = this.note.nativeElement.innerText;
    this.note.nativeElement.innerText = content;
    const json = {
      id: id,
      content: content,
      color: this.noteBackgroundColor
    };
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.setCaret();
  }

  updateNote(newValue) {
    this.notes.forEach((note, index) => {
      if (note.id == newValue.id) {
        this.notes[index].content = newValue.content;
        this.notes[index].color = newValue.color;
      }
    });
  }

  handleShowNote(color: string) {
    if (this.showNote === true) {
      this.noteBackgroundColor = color;
      this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 1, content: '', color: '#000' }];
      this.showNote = false;
    } else {
      this.contentContainer.nativeElement.style.backgroundColor = color;
    }
  }
  loadNote() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 1, content: '' }];
  }

  ngAfterViewInit(): void {
    // this.contentContainer.nativeElement.style.backgroundColor = this.bg;
    // setTimeout(() => {
    //   this.isBusy = false;
    // }, 500);
  }

  getSelectionCharacterOffsetWithin(element) {
    let start = 0;
    let end = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection != 'undefined') {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        start = preCaretRange.toString().length;
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        end = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != 'Control') {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToStart', textRange);
      start = preCaretTextRange.text.length;
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      end = preCaretTextRange.text.length;
    }
    return { start: start, end: end };
  }

  reportSelection() {
    const selOffsets = this.getSelectionCharacterOffsetWithin(this.note.nativeElement);
    this.note.nativeElement.innerHTML = 'Selection offsets: ' + selOffsets.start + ', ' + selOffsets.end;
    this.cursorPosition = selOffsets.end;
  }

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    }
  }

  setCaret() {
    const selOffsets = this.getSelectionCharacterOffsetWithin(this.note.nativeElement);
    this.cursorPosition = selOffsets.end;
    this.setCaretPosition(this.note.nativeElement, this.cursorPosition);
  }

  // window.onload = function() {
  //   document.addEventListener("selectionchange", reportSelection, false);
  //   document.addEventListener("mouseup", reportSelection, false);
  //   document.addEventListener("mousedown", reportSelection, false);
  //   document.addEventListener("keyup", reportSelection, false);
  // };
}
