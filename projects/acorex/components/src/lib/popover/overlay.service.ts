import { Injectable, ApplicationRef, ViewContainerRef, TemplateRef, EventEmitter } from '@angular/core';
import { Overlay, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { TemplatePortal, Portal, ComponentPortal } from '@angular/cdk/portal';
import { AXConnectedPosition } from '@acorex/core';
import { merge } from 'rxjs';
import { DynamicOverlay } from './custom-cdk-overlay.service';

export interface AXOverlayViewRef {
  instance: any;
  dispose: () => void;
}

export interface AXOverlayConfigs {
  position?: AXConnectedPosition | AXConnectedPosition[];
  hasBackdrop?: boolean;
  transparentBackdrop?: boolean;
  closeOnClickOutside?: boolean;
  targetElement?: HTMLElement;
  containerElement?: HTMLElement;
  onBackdropClick?: () => void;
  panelClass?: string[] | string;
  backdropClass?: string[] | string;
  scroll?: 'auto' | 'block';
  direction?: 'rtl' | 'ltr';
}

@Injectable({ providedIn: 'root' })
export class AXOverlayService {
  constructor(private overlayService: DynamicOverlay, private overlayService2: Overlay, private appRef: ApplicationRef) {}

  show(content: any, context?: any, configs?: AXOverlayConfigs): AXOverlayViewRef {
    configs = Object.assign(
      {
        hasBackdrop: true,
        transparentBackdrop: true,
        closeOnClickOutside: true
      },
      configs || {}
    );
    // get root viewref
    const viewRef: ViewContainerRef = this.appRef.components[0].instance.viewRef;

    let portal: Portal<any>;
    // get component by route
    if (typeof content === 'string') {
      // TODO
    }
    // create portal from component
    else if (content instanceof TemplateRef) {
      portal = new TemplatePortal(content, viewRef, context);
    } else if (typeof content === 'function') {
      portal = new ComponentPortal(content, viewRef);
    }
    let positionStrategy: PositionStrategy;
    if (configs.position && configs.targetElement) {
      positionStrategy = this.overlayService
        .position()
        .flexibleConnectedTo(configs.targetElement)
        .withPositions(Array.isArray(configs.position) ? configs.position : [configs.position])
        .withPush(true);
    } else {
      positionStrategy = this.overlayService.position().global().centerHorizontally().centerVertically();
    }
    let scrollStrategy: ScrollStrategy = this.overlayService.scrollStrategies.reposition({ autoClose: true });
    if (configs.scroll === 'block') {
      scrollStrategy = this.overlayService.scrollStrategies.block();
    }

    const config = {
      positionStrategy,
      scrollStrategy,
      hasBackdrop: configs.hasBackdrop,
      disposeOnNavigation: true,
      backdropClass: configs.backdropClass ? configs.backdropClass : configs.transparentBackdrop ? 'cdk-overlay-transparent-backdrop' : undefined,
      panelClass: configs.panelClass ? configs.panelClass : ['animate__animated', 'animate__fadeIn']
    };
    // joon nanat dorost sho
    let overlayRef = configs.containerElement ? this.overlayService.createOn(configs.containerElement, config) : this.overlayService2.create(config);

    const host = overlayRef.attach(portal);
    if (host.instance) {
      Object.assign(host.instance, context);
      setTimeout(() => {
        host.changeDetectorRef.detectChanges();
      }, 0);
    }
    if (configs.direction) overlayRef.setDirection(configs.direction);
    if (configs.closeOnClickOutside) {
      merge(overlayRef.backdropClick() as any, overlayRef.detachments() as any).subscribe(() => {
        overlayRef.dispose();
        overlayRef = undefined;
        if (configs.onBackdropClick) {
          configs.onBackdropClick();
        }
      });
    }
    return {
      instance: host.instance,
      dispose: overlayRef.dispose.bind(overlayRef)
    };
  }
}
