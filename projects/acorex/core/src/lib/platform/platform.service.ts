import { Injectable } from "@angular/core";
import { from, fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";


export type AXPlatforms = 'Android' | 'Desktop' | 'iOS' | 'Mobile';
export type AXBrowsers = 'Chrome' | 'Safari' | 'Edge' | 'Firefox' | 'Opera' | 'MSIE';
export type AXTechnologies = 'PWA' | 'Hybrid' | 'Electron';




const isChrome = (win: Window): boolean =>
    testUserAgent(win, /Chrome/i);

const isFirefox = (win: Window): boolean =>
    testUserAgent(win, /Firefox/i);

const isEdge = (win: Window): boolean =>
    testUserAgent(win, /Edge/i);

const isSafari = (win: Window): boolean =>
    testUserAgent(win, /Safari/i);

const isOpera = (win: Window): boolean =>
    testUserAgent(win, /Opera/i) || testUserAgent(win, /OPR/i);

const isMSIE = (win: Window): boolean =>
    testUserAgent(win, /MSIE/i) || testUserAgent(win, /Trident/i);


const isMobileWeb = (win: Window): boolean =>
    isMobile(win) && !isHybrid(win);

const isIpad = (win: Window) => {
    // iOS 12 and below
    if (testUserAgent(win, /iPad/i)) {
        return true;
    }

    // iOS 13+
    if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
        return true;
    }

    return false;
};

const isIphone = (win: Window) =>
    testUserAgent(win, /iPhone/i);

const isIOS = (win: Window) =>
    testUserAgent(win, /iPhone|iPod/i) || isIpad(win);

const isAndroid = (win: Window) =>
    testUserAgent(win, /android|sink/i);

const isAndroidTablet = (win: Window) => {
    return isAndroid(win) && !testUserAgent(win, /mobile/i);
};

const isPhablet = (win: Window) => {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);

    return (smallest > 390 && smallest < 520) &&
        (largest > 620 && largest < 800);
};

const isTablet = (win: Window) => {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);

    return (
        isIpad(win) ||
        isAndroidTablet(win) ||
        (
            (smallest > 460 && smallest < 820) &&
            (largest > 780 && largest < 1400)
        )
    );
};

const isMobile = (win: Window) =>
    matchMedia(win, '(any-pointer:coarse)');

const isDesktop = (win: Window) =>
    !isMobile(win);

const isHybrid = (win: Window) =>
    isCordova(win) || isCapacitorNative(win);

const isCordova = (win: any): boolean =>
    !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);

const isCapacitorNative = (win: any): boolean => {
    const capacitor = win['Capacitor'];
    return !!(capacitor && capacitor.isNative);
};

const isElectron = (win: Window): boolean =>
    testUserAgent(win, /electron/i);

const isPWA = (win: Window): boolean =>
    !!(win.matchMedia('(display-mode: standalone)').matches || (win.navigator as any).standalone);

export const testUserAgent = (win: Window, expr: RegExp) =>
    expr.test(win.navigator.userAgent);

const matchMedia = (win: Window, query: string): boolean =>
    win.matchMedia(query).matches;


const PLATFORMS_MAP = {
    'Android': isAndroid,
    'iOS': isIOS,
    'Desktop': isDesktop,
    'Mobile': isMobile,
    'Chrome': isChrome,
    'Firefox': isFirefox,
    'Safari': isSafari,
    'Edge': isEdge,
    'Opera': isOpera,
    'Hybrid': isHybrid,
    'PWA': isPWA,
    'Electron': isElectron,
};


export class AXPlatformEvent {
    nativeEvent: UIEvent | Event;
    source: AXPlatform
}

@Injectable({
    providedIn: 'platform',
})
export class AXPlatform {
    resize: Subject<AXPlatformEvent> = new Subject<AXPlatformEvent>();
    click: Subject<AXPlatformEvent> = new Subject<AXPlatformEvent>()
    scroll: Subject<AXPlatformEvent> = new Subject<AXPlatformEvent>()

    isRtl(): boolean {
        return document.dir == 'rtl' || document.body.dir == 'rtl' || document.body.style.direction == 'rtl';
    }


    isLandscape(): boolean {
        return window.innerHeight < window.innerWidth;
    }

    isPortrate(): boolean {
        return !this.isLandscape()
    }

    is(name: AXPlatforms | AXBrowsers | AXTechnologies): boolean {
        return PLATFORMS_MAP[name](window) || false;
    }


    switchDarkMode() {
        const _html = document.getElementsByTagName("html")[0];
        _html.classList.add('ax-dark')

    }

    switchLightMode() {
        const _html = document.getElementsByTagName("html")[0];
        _html.classList.remove('ax-dark')
    }

    private _setFullHeightRatio() {
        document.querySelector<HTMLElement>(':root').style.setProperty('--ax-vh', window.innerHeight / 100 + 'px');
    }

    constructor() {

        fromEvent<UIEvent>(window, 'resize')
            .pipe(debounceTime(100))
            .pipe(distinctUntilChanged())
            .subscribe((e) => {
                this.resize.next({
                    nativeEvent: e,
                    source: this
                });
                //
                this._setFullHeightRatio();
            });


        document.addEventListener('click', (e) => {
            this.click.next({
                nativeEvent: e,
                source: this
            });
        }, true)

        document.addEventListener('scroll', (e) => {
            this.scroll.next({
                nativeEvent: e,
                source: this
            });
        }, true);
        // init functions
        this._setFullHeightRatio();
    }
}