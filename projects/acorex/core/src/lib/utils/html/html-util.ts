import { AXMathUtil } from '../math/math-util';

export type AXPlacement =
  | 'top-start'
  | 'top-middle'
  | 'top-end'
  | 'center-start'
  | 'center-end'
  | 'bottom-start'
  | 'bottom-middle'
  | 'bottom-end';

export interface AXIPoint {
  x: number;
  y: number;
}

export interface AXConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';
  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';
  weight?: number;
  offsetX?: number;
  offsetY?: number;
}

export class AXPoint implements AXIPoint {
  constructor(public x: number, public y: number) {
  }
}

export interface AXClientRecCtor {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  bottom?: number;
  right?: number;
}
export class AXClientRec implements AXClientRecCtor {


  private _left: number;
  public get left(): number {
    return this._left;
  }
  public set left(v: number) {
    this._left = v;
  }


  private _top: number;
  public get top(): number {
    return this._top;
  }
  public set top(v: number) {
    this._top = v;
  }


  private _right: number;
  public get right(): number {
    return this._right;
  }
  public set right(v: number) {
    this._right = v;
  }


  private _bottom: number;
  public get bottom(): number {
    return this._bottom;
  }
  public set bottom(v: number) {
    this._bottom = v;
  }



  private _width: number;
  public get width(): number {
    return this._width;
  }
  public set width(v: number) {
    this._width = v;
  }


  private _height: number;
  public get height(): number {
    return this._height;
  }
  public set height(v: number) {
    this._height = v;
  }


  constructor(rec: AXClientRecCtor) {
    this._left = rec.left;
    this._top = rec.top;
    this._width = rec.width;
    this._height = rec.height;
    this._right = this._left + this._width;
    this._bottom = this._top + this._height;
  }

  public intersect(rec: AXClientRecCtor): boolean {
    return (this.left < rec.left + rec.width &&
      this.left + this.width > rec.left &&
      this.top < rec.top + rec.height &&
      this.top + this.height > rec.top);
  }


}
// @dynamic
export class AXHtmlUtil {
  static getBoundingRectPoint(el: HTMLElement, placement: AXPlacement): AXPoint {
    const rec = el.getBoundingClientRect();
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    switch (placement) {
      case 'top-start':
        return new AXPoint(rec.left, rec.top);
      case 'top-middle':
        return new AXPoint(rec.left + (width / 2), rec.top);
      case 'top-end':
        return new AXPoint(rec.left + (width), rec.top);
      case 'center-end':
        return new AXPoint(rec.left + (width), rec.top + (height / 2));
      case 'bottom-end':
        return new AXPoint(rec.left + (width), rec.top + (height));
      case 'bottom-middle':
        return new AXPoint(rec.left + (width / 2), rec.top + (height));
      case 'bottom-start':
        return new AXPoint(rec.left, rec.top + (height));
      case 'center-start':
        return new AXPoint(rec.left, rec.top + (height / 2));
      default:
        return new AXPoint(rec.left + (width / 2), rec.top + (height));
    }
  }

  static isInRecPoint(pos: AXIPoint, rec: AXClientRecCtor): boolean {
    return pos.x >= rec.left && pos.x <= (rec.left + rec.width) && pos.y >= rec.top && (pos.y <= (rec.top + rec.height));
  }

  // static isOverLap(rec1: AXClientRecCtor, rec2: AXClientRecCtor): boolean {
  //   const r1: AXClientRec = new AXClientRec(rec1);
  //   const r2: AXClientRec = new AXClientRec(rec2);

  //   return ;
  // }

  static isInElementBound(pos: AXIPoint, element: HTMLElement): boolean {
    const elBound = element.getBoundingClientRect();
    return AXHtmlUtil.isInRecPoint(pos, {
      left: elBound.left,
      width: elBound.width,
      top: elBound.top,
      height: elBound.height
    });
  }

  static getDimensions(): { width: number, height: number } {
    let winW = 630;
    let winH = 460;
    if (document.body && document.body.offsetWidth) {
      winW = document.body.offsetWidth;
      winH = document.body.offsetHeight;
    }
    if (document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
      winW = document.documentElement.offsetWidth;
      winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
      winW = window.innerWidth;
      winH = window.innerHeight;
    }
    return { width: winW, height: winH };
  }

  static getOffsetRight(elem: HTMLElement): number {
    let element = elem;
    const width = element.offsetWidth;
    let right = 0;
    while (element.offsetParent) {
      right += element.offsetLeft;
      element = element.offsetParent as HTMLElement;
    }
    right += element.offsetLeft;
    right = AXHtmlUtil.getDimensions().width - right;
    right -= width;
    return right;
  }

  static getUID(): string {
    return 'el-' + AXMathUtil.randomRange(1000000000, 9999999999).toString();
  }


  static getRelatedPosition(source: HTMLElement, placement: AXPlacement, target: HTMLElement, alignment: AXPlacement): AXIPoint {
    const result: AXIPoint = { x: 0, y: 0 };

    const sourcePos: AXPoint = AXHtmlUtil.getBoundingRectPoint(source, placement);


    let top: number = 0;
    let left: number = 0;
    switch (alignment) {
      case 'top-start':
        top = sourcePos.y;
        left = sourcePos.x;
        break;
      case 'top-middle':
        top = sourcePos.y;
        left = sourcePos.x - target.offsetWidth / 2;
        break;
      case 'top-end':
        top = sourcePos.y;
        left = sourcePos.x - target.offsetWidth;
        break;
      case 'center-end':
        top = sourcePos.y - target.offsetHeight / 2;
        left = sourcePos.x - target.offsetWidth;
        break;
      case 'bottom-end':
        top = sourcePos.y - target.offsetHeight;
        left = sourcePos.x - target.offsetWidth;
        break;
      case 'bottom-middle':
        top = sourcePos.y - target.offsetHeight;
        left = sourcePos.x - target.offsetWidth / 2;
        break;
      case 'bottom-start':
        top = sourcePos.y - target.offsetHeight;
        left = sourcePos.x;
        break;
      case 'center-start':
        top = sourcePos.y - target.offsetHeight / 2;
        left = sourcePos.x;
        break;
    }
    result.y = top;
    result.x = left;
    return result;
  }


  static collision(a: HTMLElement, b: HTMLElement): boolean {
    const ac = a.getBoundingClientRect();
    const bc = b.getBoundingClientRect();

    if (ac.left < bc.left + bc.width && ac.left + ac.width > bc.left &&
      ac.top < bc.top + bc.height && ac.top + ac.height > bc.top) {
      return true;
    }
    else {
      return false;
    }
  }

}
