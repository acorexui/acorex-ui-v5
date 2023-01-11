import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { AXProperyEditorComponent, AXProperyEditorValueChangeEvent, AXPropertyConfig } from './property-editor.class';
import { AXEventService, AXObjectUtil, AXRenderService, getPropByPath, setPropByPath } from '@acorex/core';
import { Subscription } from 'rxjs';
import { AXValidationFormComponent } from '../validation/validation-form.component';

@Directive({
  selector: '[ax-property-editor-renderer]'
})
export class AXPropertyEditorRendererDirective {
  private instance: AXProperyEditorComponent<any>;

  @Input()
  property: AXPropertyConfig;

  @Input()
  validationForm: AXValidationFormComponent;

  private _context: any = {};
  @Input()
  public get context(): any {
    return this._context;
  }
  public set context(v: any) {
    this._context = v;
  }

  @Input()
  host: any;

  @Input()
  groupId: any;

  @Output()
  onValueChange: EventEmitter<AXProperyEditorValueChangeEvent> = new EventEmitter<AXProperyEditorValueChangeEvent>();

  private subscription: Subscription;

  constructor(
    private target: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderService: AXRenderService,
    private eventService: AXEventService
  ) {}

  clear() {
    if (this.instance?.value) {
      this.instance.value = null;
    }
  }

  ngOnInit(): void {
    this.createComponent();
  }

  createComponent() {
    this.renderService.findLoadedComponentByRoute(this.property.property.editorClass).then((c) => {
      if (c) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(c.component);
        const cmpRef = this.target.createComponent(factory);
        this.instance = cmpRef.instance as AXProperyEditorComponent<any>;
        this.subscription = this.instance.valueChange.subscribe((value) => {
          this.property.value = value;
          this.onValueChange.emit(this.property);
          if (this.property?.property?.name) {
            setTimeout(() => {
              this.eventService.broadcast(`props-${this.groupId}-${this.property.property.name}`, this.property);
            }, 0);
          }
        }) as any;
        this.watchChanges();
        this.assignProps();
        this.instance.value = this.property.value;

        // this.instance.onRenderCompleted.subscribe(() => {

        // });

        if (this.validationForm) {
          this.instance.validatableComponentRegistered.subscribe((v) => {
            this.validationForm.addWidget(v);
          });
        }
      }
    });
  }

  private watchChanges() {
    const varsRegx = /((\$\{[a-zA-Z_0-9]+\})+)/gm;
    const varNameRegx = /[a-zA-Z_0-9]+/gm;
    const options = this.property.property.editorOptions;
    if (!options) {
      return;
    }
    for (const p in options) {
      if (options.hasOwnProperty(p)) {
        const opt = options[p];
        const vars = typeof opt === 'string' ? opt?.match(varsRegx) : [];
        // bind the props
        if (vars?.length) {
          vars.forEach((v) => {
            const path = v.match(varNameRegx)?.length ? v.match(varNameRegx)[0] : null;
            if (path) {
              this.eventService.on(`props-${this.groupId}-${path}`, (e: AXPropertyConfig) => {
                let execCode = opt.slice();
                const params = {};
                vars.forEach((vv) => {
                  const p2 = vv.match(varNameRegx)?.length ? vv.match(varNameRegx)[0] : null;
                  params[p2] = AXObjectUtil.deepCopy(this.context[p2]) || null;
                  execCode = execCode.replace(vv, `__params__.${p2}`);
                });

                const func = new Function('__params__', `try { return ${execCode}} catch(e){  return null;  }`);
                const val = func(params);

                const keys = p.split('.');
                const prop = Object.assign({}, this.instance[keys[0]]);
                if (keys.length > 1) {
                  this.instance[keys[0]] = setPropByPath(prop, p, val);
                } else {
                  setPropByPath(this.instance, p, val);
                }
              });
            }
          });
        }
        // else {
        //    this.assignProps();
        // }
      }
    }
  }

  private assignProps() {
    const options = this.property.property.editorOptions;
    if (!options) {
      return;
    }
    const varsRegx = /((\$\{[a-zA-Z_0-9]+\})+)/gm;
    for (const p in options) {
      if (options.hasOwnProperty(p)) {
        const opt = options[p];
        const vars = typeof opt === 'string' ? opt?.match(varsRegx) : [];
        if (vars?.length) {
          continue;
        } else {
          const val = typeof opt === 'function' ? opt({ data: this.context, host: this.host }, this.property) : opt;
          if (val instanceof Promise) {
            val.then((v) => {
              setPropByPath(this.instance, p, val);
            });
          } else {
            setPropByPath(this.instance, p, val);
          }
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
