import { Injectable } from "@angular/core";

@Injectable()
export abstract class AXComponent {}

@Injectable()
export abstract class AXClosbaleComponent extends AXComponent {
  abstract close(): void;
}
