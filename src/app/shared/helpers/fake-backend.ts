import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// importo los datos JSON
import data from '../../../assets/data/data.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        const personas: any = (<any>data).personas;
        const programas: any = (<any>data).programas;
        const localidades: any = (<any>data).localidades;
        const tipoRecurso: any = (<any>data).tipoRecursoSocials;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            /* ----------------------  LISTAS GENERALES  --------------------------- */

            // get PROGRAMAS
            if (request.url.endsWith('/apimock/programas') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: programas }));
              //} else {
                  // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }
            // get TIPO RECURSO SOCIAL por ID /\/users\/\d+$/
            if(request.url.endsWith('/\/apimock/\/tipo-recurso-socials/\/d+$/') && request.method === 'GET') {
              return of(new HttpResponse({ status: 200, body: tipoRecurso }));
            }



            // pass through any requests not handled above
            return next.handle(request);

        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
