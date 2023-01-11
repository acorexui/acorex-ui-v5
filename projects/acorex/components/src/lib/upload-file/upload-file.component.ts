import {
  Component,
  ViewChild,
  Input,
  ElementRef,
  ViewEncapsulation,
  TemplateRef,
  Renderer2,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { AXUploadFileLoadEvent, AXUploadFileProgressEvent } from './upload-file.events';
import { AXProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AXBaseTextComponent, AXElementSize, AXBaseSizableComponent, AXBaseComponent } from '../base/element.class';
import { AXRenderService } from '@acorex/core';

@Component({
  selector: 'ax-upload-file',
  templateUrl: './upload-file.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { style: 'display: block; width:100%; position: relative' }
})
export class AXUploadFileComponent extends AXBaseComponent implements AXBaseSizableComponent {
  private overlayDiv: HTMLElement;

  @Input()
  dropRef: HTMLElement;

  @Input()
  progressRef: HTMLElement;

  @Input()
  label: string;

  @Input()
  size: AXElementSize = "md";

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input()
  type: 'box' | 'inline' | 'hidden' = 'inline';

  @Input()
  public template: TemplateRef<any>;

  @Input() disabled: boolean = false;
  @Output()
  onLoad: EventEmitter<AXUploadFileLoadEvent> = new EventEmitter<AXUploadFileLoadEvent>();

  @Output()
  onProgress: EventEmitter<AXUploadFileProgressEvent> = new EventEmitter<AXUploadFileProgressEvent>();

  files: File[] = [];
  focus() { }

  fileName: string = '';
  constructor(
    private el: ElementRef<HTMLElement>,
    private injectionService: AXRenderService,
    private rendrer: Renderer2,
    protected cdr: ChangeDetectorRef
  ) {
    super();
  }


  onDeleteClick(e) {
    e.stopPropagation();
  }

  onFileChange(e) {
    const files = e.target.files;
    this.addFile(files[0]);
    (this.fileInput.nativeElement as HTMLInputElement).value = null;
  }

  open() {
    this.fileInput.nativeElement.click();
  }
  remove() {
    this.files = [];
  }
  ngAfterViewInit(): void {
    if (this.dropRef != null) {
    } else {
      this.dropRef = this.el.nativeElement;
    }
    //
    if (this.progressRef != null) {
    } else {
      this.progressRef = this.el.nativeElement;
    }
    //
    if (this.type === 'hidden' || this.type === 'box') {
      this.overlayDiv = this.rendrer.createElement('div') as HTMLElement;
      this.overlayDiv.classList.add('overlay');
      this.overlayDiv.innerHTML = `
      <div class="icon-wrapper">
        <i class="far fa-cloud-upload-alt fa-3x"></i>
        <span>Drop File(s) Here</span>
      </div>
    `;
      this.overlayDiv.addEventListener('drag', this.handleOverlayDragOver);
      this.overlayDiv.addEventListener('dragover', this.handleOverlayDragOver);
      this.overlayDiv.addEventListener('dragleave', this.handleOverlayDragOver);
      this.rendrer.appendChild(this.dropRef, this.overlayDiv);
    }
    //
    this.dropRef.classList.add('ax-upload-drop-over');
    this.dropRef.addEventListener('dragover', this.handleDragOver.bind(this));
    this.dropRef.addEventListener('dragleave', this.handleDragLeave.bind(this));
    this.dropRef.addEventListener('drop', this.handleDrop.bind(this));
  }

  private handleOverlayDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.overlayDiv.classList.add('show');
    return false;
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.overlayDiv.classList.remove('show');
    return false;
  }

  handleDrop(e: DragEvent) {
    this.handleDragLeave(e);
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      this.addFile(file);
    }
  }

  private addFile(file: File) {
    const progressDiv = this.rendrer.createElement('div') as HTMLElement;
    progressDiv.classList.add('ax-upload-progress-panel');
    const progressLabel = this.rendrer.createElement('small') as HTMLElement;
    progressLabel.innerText = file.name;
    this.fileName = file.name;
    this.rendrer.appendChild(this.progressRef, progressDiv);
    const com = this.injectionService.appendComponent(AXProgressBarComponent, { progress: 0 }, progressDiv).instance as AXProgressBarComponent;
    this.rendrer.appendChild(progressDiv, progressLabel);

    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      this.onLoad.emit({
        file,
        data: (e as any).target.result
      });
      //
      // Fake Upload
      let pv = 0;
      let uploaded = 0;
      const intv = setInterval(() => {
        uploaded += 1024 * 1000;
        if (uploaded > e.total) {
          uploaded = e.total;
        }
        pv = Math.ceil((uploaded / e.total) * 100);
        com.progress = pv;
        this.onProgress.emit({
          file,
          total: e.total,
          uploaded,
          value: pv
        });
        //
        if (com.progress >= 100) {
          clearInterval(intv);
          setTimeout(() => {
            this.rendrer.removeChild(this.progressRef, progressDiv);
          }, 1000);
        }
      }, 100);
    });
    reader.readAsDataURL(file);
    this.files.push(file);
  }
}
