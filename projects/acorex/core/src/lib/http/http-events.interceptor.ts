import { IHttpError } from './http-error.class';
import { InjectionToken } from '@angular/core';
import { AXHttpRequestOptions } from './http-request.class';

export const AX_HTTP_EVENT_INTERCEPTOR = new InjectionToken<AXHttpEventInterceptor>('ax.http.events');

export interface AXHttpEventInterceptor {
    begin(request: AXHttpRequestOptions): Promise<AXHttpRequestOptions>;
    success(request: AXHttpRequestOptions, result: any): Promise<any>;
    complete(request: AXHttpRequestOptions);
    error(request: AXHttpRequestOptions, error: IHttpError);
}


