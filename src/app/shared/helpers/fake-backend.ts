import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// importo los datos JSON
import * as data from '../../../assets/data/data.json';
import { NgForOf } from '@angular/common';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let personas = (<any>data).personas;
        let programas = (<any>data).programas;
        let localidades = (<any>data).localidads;
        let tipoRecurso = (<any>data).tipoRecursoSocials;
        let sexos = (<any>data).sexos;
        let generos = (<any>data).generos;
        let estadoCivil = (<any>data).estadoCivils;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            /* ----------------------  LISTAS GENERALES  --------------------------- */
            // get TIPO RECURSO SOCIAL por programa id
            if(request.url.endsWith('/apimock/personas') && request.method === 'GET') {
              let globalSearch = request.params.get('global_search');
              let pageSize = parseInt(request.params.get('pagesize'));
              let page = parseInt(request.params.get('page'));
              let search = globalSearch.split(" ");
              let resultado = [];

              let listaPersonas = {
                total_filtrado: 0,
                pagesize: pageSize,
                pages: 0,
                estado: true,
                resultado:[]
              };
              console.log(search);
              resultado = personas.filter(
                persona => {
                  for (let i = 0; i < search.length; i++) {
                    let nombre = persona.nombre.split(" ");
                    for (let j = 0; j < nombre.length; j++) {
                        if ( nombre[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                          return persona;
                        }
                    }
                    if (persona.nro_documento.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ){
                      return persona;
                    }
                    //if ( search[i] === persona.apellido ) {
                    if ( persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                      return persona;
                    }
                    if ( persona.lugar.calle.toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                      return persona;
                    }
                  }
                });

                let totalFiltrado = parseInt(resultado.length);
                let total = parseFloat(totalFiltrado/pageSize);
                let totalPagina = (total > parseInt(total)) ? parseInt(total) + 1 : total;

                listaPersonas.total_filtrado = resultado.length;
                listaPersonas.pages = totalPagina;
                if (page > 0) {
                  console.log("pagina mayor a 0: ",page);
                  let pageStart = page * pageSize;
                  let pageEnd = pageStart + pageSize;
                  listaPersonas.resultado = resultado.slice(pageStart, pageEnd);
                }else{
                  listaPersonas.resultado = resultado.slice(0,pageSize);
                }

              return of(new HttpResponse({ status: 200, body: listaPersonas }));

            }


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
            // get TIPO RECURSO SOCIAL por programa id
            if(request.url.endsWith('/apimock/tipo-recurso-socials') && request.method === 'GET') {
              let programaid = request.params.get('programaid');
              let cont = 0;
              let tipos = tipoRecurso.filter(recurso => { return recurso.programaid === programaid });

              return of(new HttpResponse({ status: 200, body: tipos }));

            }
            // get sexos
            if (request.url.endsWith('/apimock/sexos') && request.method === 'GET') {
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: sexos }));
              //} else {
                  // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }
            // get localidades
            if (request.url.endsWith('/apimock/localidads') && request.method === 'GET') {
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: localidades }));
              //} else {
                  // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }
            // get estado civil
            if (request.url.endsWith('/apimock/estado-civils') && request.method === 'GET') {
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: estadoCivil }));
              //} else {
                  // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }
            // get genero
            if (request.url.endsWith('/apimock/generos') && request.method === 'GET') {
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: generos }));
              //} else {
                  // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
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
