import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { AXBaseSizableComponent, AXElementSize } from "../base/element.class";

@Component({
  selector: "ax-panel-box",
  templateUrl: "./panel-box.component.html",
  styleUrls: ["./panel-box.component.scss"],
  animations: [
    trigger("visibilityChanged", [
      state(
        "shown",
        style({
          height: "*",
          opacity: 1,
        })
      ),
      state(
        "hidden",
        style({
          height: "0px",
          opacity: 0,
          padding: 0,
        })
      ),
      transition("Void => *", animate("0ms")),
      transition("shown => hidden", animate("200ms")),
      transition("hidden => shown", animate("200ms")),
    ]),
  ],
})
export class AXPanelBoxComponent implements AXBaseSizableComponent {
  @ContentChild("header", { static: true })
  headerTemplate: TemplateRef<any>;

  @Input() size: AXElementSize = "md";

  @Input() type: string = "";

  // @Input()
  // caption: string = 'Caption';

  private _caption: string = "caption";
  @Input()
  get caption(): string {
    return this._caption;
  }
  set caption(val: string) {
    this._caption = val === "" ? "caption" : val;
  }

  @Output()
  collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _collapsed: boolean = false;

  @Input()
  get collapsed(): boolean {
    return this._collapsed;
  }
  set collapsed(val: boolean) {
    if (val !== this._collapsed) {
      this._collapsed = val;
      this.collapsedChange.emit(this._collapsed);
    }
  }

  @Input() allowCollapse: boolean = true;

  toggle() {
    if (this.allowCollapse) {
      this.collapsed = !this.collapsed;
    }
  }
}
