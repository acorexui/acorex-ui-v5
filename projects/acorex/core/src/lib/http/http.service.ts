import { Injectable, Injector, InjectFlags } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpResult } from './http-result.class';
import { IHttpError } from './http-error.class';
import { AXHttpRequestOptions } from './http-request.class';
import {
    AX_HTTP_EVENT_INTERCEPTOR, AXHttpEventInterceptor
} from './http-events.interceptor';
// import { catchError, retry, retryWhen, mergeMap, delay, switchMap, scan, takeWhile, flatMap } from 'rxjs/operators';
// import { of, concat, throwError } from 'rxjs';


@Injectable()
export class AXHttpService {

    private interceptor: AXHttpEventInterceptor;
    constructor(private http: HttpClient, private injector: Injector) {
        this.interceptor = this.injector.get(AX_HTTP_EVENT_INTERCEPTOR);
    }


    get<T>(url: string, config: AXHttpRequestOptions = {}): HttpResult<T> {
        config.url = url;
        config.method = "get";
        return this.request(config);
    }

    post<T>(url: string, config: AXHttpRequestOptions = {}): HttpResult<T> {
        config.url = url;
        config.method = "post";
        return this.request(config);
    }

    delete<T>(url: string, config: AXHttpRequestOptions = {}): HttpResult<T> {
        config.url = url;
        config.method = "delete";
        return this.request(config);
    }

    put<T>(url: string, config: AXHttpRequestOptions = {}): HttpResult<T> {
        config.url = url;
        config.method = "put";
        return this.request(config);
    }


    request<T>(config: AXHttpRequestOptions): HttpResult<T> {
        return new HttpResult<T>((result?, error?, complete?) => {
            this.handleBegin(config).then(c => {
                this.http
                    .request<T>(config.method, config.url, this.mapOptions(config))
                    //.pipe(this.retry)
                    .subscribe(data => {
                        this.handleResult(data, result, complete, config);
                    }, c => {
                        this.handleError(c, error, complete, config);
                    });
            });
        })
    }


    private handleResult(data, result, complete, config: AXHttpRequestOptions) {
        if (this.interceptor) {
            this.interceptor.success(config, data).then(c => {
                if (result)
                    result(c);
                this.handleComplete(complete, config);
            });
        }
        else {
            //
            if (result)
                result(data);
            this.handleComplete(complete, config);
        }
    }

    private handleBegin(config: AXHttpRequestOptions): Promise<AXHttpRequestOptions> {
        return new Promise((resolve) => {
            if (!config.headers)
                config.headers = {};
            if (!config.params)
                config.params = {};
            //
            if (this.interceptor) {
                this.interceptor.begin(config).then(c => {
                    resolve(c);
                });
            }
            else {
                resolve(config)
            }
        })
    }

    private handleComplete(complete: Function, config: AXHttpRequestOptions) {
        if (complete)
            complete();
        if (this.interceptor)
            this.interceptor.complete(config);
    }

    private handleError(c: HttpErrorResponse, error: Function, complete: Function, config: AXHttpRequestOptions) {
        let r: IHttpError = {
            message: c.message,
            status: c.status,
            code: c.status?.toString(),
            handled: false,
            error: c.error
        }
        if (error) {
            error(r);
        }
        if (!r.handled) {
            if (this.interceptor)
                this.interceptor.error(config, r);
        }
        this.handleComplete(complete, config);
    }

    private mapOptions(options: AXHttpRequestOptions) {
        let headers = new HttpHeaders();

        for (const key in options.headers) {
            if (options.headers.hasOwnProperty(key)) {
                const value = options.headers[key];
                headers = headers.set(key, value)
            }
        }
        let params = new HttpParams();
        for (const key in options.params) {
            if (options.params.hasOwnProperty(key)) {
                const value = options.params[key];
                params = params.set(key, value);
            }
        }
        return {
            headers: headers,
            params: params,
            body: options.body,
            responseType: options.responseType || 'json'
        };
        // if (options.method == "get") {
        //     return {
        //         headers: headers,
        //         params: params
        //     };
        // }
        // else {
        //     return {
        //         headers: headers,
        //         params: params,
        //         body: options.body
        //     };
        // }
    }

}