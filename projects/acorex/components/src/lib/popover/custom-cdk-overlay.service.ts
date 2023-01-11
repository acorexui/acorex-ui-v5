import {
    Overlay,
    OverlayKeyboardDispatcher,
    OverlayPositionBuilder,
    ScrollStrategyOptions,
    OverlayContainer,
    OverlayRef,
    OverlayConfig,
    OverlayOutsideClickDispatcher
} from '@angular/cdk/overlay';
import {
    ComponentFactoryResolver,
    Inject,
    Injector,
    NgZone,
    Renderer2,
    RendererFactory2,
    Injectable
} from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT, Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DynamicOverlayContainer extends OverlayContainer {
    public setContainerElement(containerElement: HTMLElement): void {
        this._containerElement = containerElement;
    }
}



@Injectable({
    providedIn: 'root'
})
export class DynamicOverlay extends Overlay {
    private readonly _dynamicOverlayContainer: DynamicOverlayContainer;
    private renderer: Renderer2;

    constructor(
        scrollStrategies: ScrollStrategyOptions,
        _overlayContainer: DynamicOverlayContainer,
        _componentFactoryResolver: ComponentFactoryResolver,
        _positionBuilder: OverlayPositionBuilder,
        _keyboardDispatcher: OverlayKeyboardDispatcher,
        _injector: Injector,
        _ngZone: NgZone,
        @Inject(DOCUMENT) _document: any,
        _directionality: Directionality,
        rendererFactory: RendererFactory2,
        _location: Location,
        _outsideClickDispatcher: OverlayOutsideClickDispatcher
    ) {
        super(
            scrollStrategies,
            _overlayContainer,
            _componentFactoryResolver,
            _positionBuilder,
            _keyboardDispatcher,
            _injector,
            _ngZone,
            _document,
            _directionality,
            _location,
            _outsideClickDispatcher
        );
        this.renderer = rendererFactory.createRenderer(null, null);

        this._dynamicOverlayContainer = _overlayContainer;
    }

    private setContainerElement(containerElement: HTMLElement): void {
        this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
        this._dynamicOverlayContainer.setContainerElement(containerElement);
    }

    public createOn(containerElement: HTMLElement, config?: OverlayConfig): OverlayRef {
        this.setContainerElement(containerElement);
        return super.create(config);
    }
}