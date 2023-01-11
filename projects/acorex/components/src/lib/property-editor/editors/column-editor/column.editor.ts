import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { AXTranslator } from '@acorex/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AXProperyEditorComponent } from '../../property-editor.class';
import { AXPopupService } from '../../../popup/popup.service';
import { AXDataSourceReadParams } from '../../../data-source/read-param';


export interface AXTableColumnModel {
  id: number;
  index: number;
  fieldName: string;
  caption?: string;
  fieldType?: string;
  displayType?: string;
  fillByUser?: boolean;
  rowHeader?: boolean;
}

@Component({
  templateUrl: './column.editor.html',
  styleUrls: ['./column.editor.scss']
})
export class ColumnPropertyEditorComponent extends AXProperyEditorComponent<AXTableColumnModel[]> implements OnInit {
  @ViewChild('tplEdit')
  tplEdit: TemplateRef<any>;

  columns: AXTableColumnModel[] = [];

  index: number = 2;

  constructor(protected cdr: ChangeDetectorRef, private popupService: AXPopupService) {
    super(cdr);
  }

  columnTypeData: any[] = [
    { id: 1, title: 'String' },
    { id: 2, title: 'Number' },
    { id: 3, title: 'Boolean' },
    { id: 4, title: 'Data' },
    { id: 5, title: 'Time' }
  ];

  ngOnInit(): void {
    this.columns = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
  }

  ngAfterViewInit() {
    this.onRenderCompleted.emit();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  handleAddColumn() {
    this.columns.push({
      id: Math.floor(1000*Math.random()*9000),
      index: this.index,
      fieldName: 'ستون' + this.index,
      caption: 'ستون' + this.index,
      fieldType: '',
      displayType: '',
      fillByUser: false,
      rowHeader: false
    });
    this.index++;
  }

  handleAddClick() {
    if (this.columns.length === 0) {
      this.columns.push({
        id: Math.floor(1000*Math.random()*9000),
        index: 1,
        fieldName: 'ستون 1',
        caption: 'ستون 1',
        fieldType: '',
        displayType: '',
        fillByUser: false,
        rowHeader: false
      });
    }
    const popup = this.popupService.open(this.tplEdit, {
      title: 'ستون',
      size: 'lg',
      footerButtons: [
        {
          name: 'confirm',
          text: AXTranslator.get('common.confirm'),
          style: 'success',
          submitBehavior: true,
          cancelBehavior: false,
          onClick: () => {
            super.handleValueChange(this.columns);
            this.cdr.detectChanges();
            this.index++;
            popup.close();
          }
        },
        {
          name: 'cancel',
          text: AXTranslator.get('common.cancel'),
          style: 'danger blank',
          submitBehavior: false,
          cancelBehavior: true,
          onClick: () => {
            this.cdr.detectChanges();
            popup.close();
          }
        }
      ]
    });
  }

  handleRemoveClick(item: AXTableColumnModel) {
    this.columns = this.columns.filter((c) => c.id !== item.id);
    super.handleValueChange(this.columns);
  }

  handleDataReceived = (e: AXDataSourceReadParams) => {
    return Promise.resolve(this.columnTypeData);
  }

}
