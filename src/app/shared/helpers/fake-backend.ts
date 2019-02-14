import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// importo los datos JSON
import * as data from '../../../assets/data/data.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        function getPersonas(){
          let personas = (<any>data).personas;
          let existe = false;
          if (localStorage.getItem('personas')) {
            let personaStorage: any[] = JSON.parse(localStorage.getItem('personas'));
            for (let j = 0; j < personaStorage.length; j++) {
              for (let i = 0; i < personas.length; i++) {
                if (personas[i].id === personaStorage[j].id){
                  personas[i] = personaStorage[j]; // actualizo los datos
                  existe = true;
                }
              }
              if(!existe){ // si no existe la persona la agrego
                personas.push(personaStorage[j]);
              }
            }
          }

          return personas;
        }

        function getRecursos(){
          let recursos = (<any>data).recursos;
          let existe = false;
          if(localStorage.getItem("recursos")) {
            let recursoStorage: any[] = JSON.parse(localStorage.getItem("recursos"));
            for (let i = 0; i < recursoStorage.length; i++) {
              for (let j = 0; j < recursos.length; j++) {
                if (recursoStorage[i].id === recursos[j].id){
                  //recursos[j] = recursoStorage[i]; // si se edito
                  existe = true;
                }
              }
              if (!existe) {
                recursos.push(recursoStorage[i]);
              }
            }
          }

          return recursos;
        }

        function nombrePorId(id, lista){
          for (let i = 0; i < lista.length; i++) {
            if (lista[i].id == id){
              return lista[i].nombre;
            }
          }
        }

        function hoy() {
          let fecha = new Date();
          return fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate();
        }


        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let personas = getPersonas();
        let recursos = getRecursos();
        let programas = (<any>data).programas;
        let localidades = (<any>data).localidads;
        let tipoRecurso = (<any>data).tipoRecursoSocials;
        let sexos = (<any>data).sexos;
        let generos = (<any>data).generos;
        let estadoCivil = (<any>data).estadoCivils;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // get buscador de recurso social por programaid
            if(request.url.endsWith('/apimock/recursos') && request.method === 'GET') {
              let programaid: number = parseInt(request.params.get('programaid'));
              let pageSize: number = parseInt(request.params.get('pagesize'));
              let totalRecursos = programaid * 13;
              let recursoEncontrados: any[] = recursos.filter(recurso => { return recurso.programaid === programaid });
              let listaRecursos = {
                total_filtrado: totalRecursos,
                pagesize: pageSize,
                pages: 0,
                estado: true,
                resultado:recursoEncontrados
              };

              //console.log(tipos);
              return of(new HttpResponse({ status: 200, body: listaRecursos }));
            }
            //Guardado de recurso
            if(request.url.endsWith('/apimock/recursos') && request.method === 'POST') {
              let nuevoRecurso = request.body;
              console.log("nuevo: ", nuevoRecurso);
              // validation
              let duplicateRecurso = recursos.filter(recurso => { return recurso.id === nuevoRecurso.id; }).length;
              if (duplicateRecurso) {
                  return throwError({ error: { message: 'Esta persona ya existe!' } });
              }
              let recursoid = recursos.length + 1;

              nuevoRecurso["id"] = recursoid;
              nuevoRecurso["fecha_inicial"] = hoy();
              nuevoRecurso["tipo_recurso"] = nombrePorId(nuevoRecurso.tipo_recursoid, tipoRecurso);
              nuevoRecurso["programa"] = nombrePorId(nuevoRecurso.programaid, programas);

              delete nuevoRecurso["fechaAlta"];

              //personas.push(nuevaPersona);
              let recursosAgregados = [];
              if (localStorage.getItem('recursos')) {
                recursosAgregados = [JSON.parse(localStorage.getItem('recursos'))];
                recursosAgregados[0].push(nuevoRecurso);
                localStorage.setItem('recursos', JSON.stringify(recursosAgregados[0]));
              }else{
                recursosAgregados.push(nuevoRecurso);
                localStorage.setItem('recursos', JSON.stringify(recursosAgregados));
              }
              recursos.push(nuevoRecurso);

              return of(new HttpResponse({ status: 200, body: {id:recursoid} }));
            }
            // get Buscador de personas
            if(request.url.endsWith('/apimock/personas') && request.method === 'GET') {
              let globalSearch = request.params.get('global_search');
              let pageSize:number = parseInt(request.params.get('pagesize'));
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
                    if ( persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                      return persona;
                    }
                    if ( persona.lugar.calle.toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                      return persona;
                    }
                  }
                });
                let totalFiltrado:number = resultado.length;
                let total:number = totalFiltrado/pageSize;
                let numEntero = Math.floor(total);
                let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

                listaPersonas.total_filtrado = resultado.length;
                listaPersonas.pages = totalPagina;
                if (page > 0) {
                  let pageStart = page * pageSize;
                  let pageEnd = pageStart + pageSize;
                  listaPersonas.resultado = resultado.slice(pageStart, pageEnd);
                }else{
                  listaPersonas.resultado = resultado.slice(0,pageSize);
                }

              return of(new HttpResponse({ status: 200, body: listaPersonas }));

            }
            // guardar persona
            if (request.url.endsWith('/apimock/personas') && request.method === 'POST') {
              // get new user object from post body
              let nuevaPersona = request.body;

              // validation
              let duplicateUser = personas.filter(persona => { return persona.nro_documento === nuevaPersona.nro_documento; }).length;
              if (duplicateUser) {
                  return throwError({ error: { message: 'Esta persona ya existe!' } });
              }

              // save new user
              let id = personas.length + 1;
              nuevaPersona.id = id;
              nuevaPersona.sexo = nombrePorId(nuevaPersona.sexoid, sexos);
              nuevaPersona.genero = nombrePorId(nuevaPersona.generoid, generos);
              nuevaPersona.estado_civil = nombrePorId(nuevaPersona.estado_civilid, estadoCivil);
              nuevaPersona.lugar.localidad = nombrePorId(nuevaPersona.lugar.localidadid, localidades);

              //personas.push(nuevaPersona);
              let personasAgregadas = [];
              if (localStorage.getItem('personas')) {
                personasAgregadas = [JSON.parse(localStorage.getItem('personas'))];
                personasAgregadas[0].push(nuevaPersona);
                localStorage.setItem('personas', JSON.stringify(personasAgregadas[0]));
              }else{
                personasAgregadas.push(nuevaPersona);
                localStorage.setItem('personas', JSON.stringify(personasAgregadas));
              }
              personas.push(nuevaPersona);
              // respond 200 OK
              return of(new HttpResponse({ status: 200, body: {id: id} }));
            }

            // get user by id
            if (request.url.match(/\/apimock\/personas\/\d+$/) && request.method === 'PUT') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // find user by id in users array
                  let urlParts = request.url.split('/');
                  let personaid = parseInt(urlParts[urlParts.length - 1]);
                  let datosPersona = request.body;


                  let matchedUsers = personas.filter(persona => { return persona.id === personaid; });
                  let personaEncontrada = matchedUsers.length ? matchedUsers[0] : null;
                  // actualizo los datos de contacto
                  console.log("encuentro persona ",personaEncontrada);
                  for (const key in datosPersona) {
                    for (const clave in personaEncontrada) {
                      if ( datosPersona[clave] != undefined && key === 'lugar' ) {
                        if (datosPersona['lugar'][key] === personaEncontrada['lugar'][clave]) {
                          personaEncontrada['lugar'][clave] = datosPersona['lugar'][clave];
                        }
                      }else if ( datosPersona[clave] != undefined && clave === key ){
                        personaEncontrada[clave] = datosPersona[clave];
                      }
                    }
                  }

                  console.log("actulizo persona: ",personaEncontrada);

                  let personasAgregadas = [];
                  if (localStorage.getItem('personas')) {
                    let existe = false;
                    personasAgregadas = [JSON.parse(localStorage.getItem('personas'))];
                    for (let i = 0; i < personasAgregadas.length; i++) {
                      if (personasAgregadas[0][i].id === personaid){
                        personasAgregadas[0][i] = personaEncontrada;
                        existe = true;
                      }}
                    if (!existe) {
                      personasAgregadas[0].push(personaEncontrada);
                    }
                    localStorage.setItem('personas', JSON.stringify(personasAgregadas[0]));
                  }else{
                    personasAgregadas.push(personaEncontrada);
                    localStorage.setItem('personas', JSON.stringify(personasAgregadas));
                  }

                  return of(new HttpResponse({ status: 200, body: {id:personaid} }));
              /* } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorised' } });
              } */
          }

            /* ----------------------  LISTAS GENERALES  --------------------------- */
            // get TIPO RECURSO SOCIAL por programa id
            if(request.url.endsWith('/apimock/tipo-recursos') && request.method === 'GET') {
              let programaid = request.params.get('programaid');
              let tipos = tipoRecurso.filter(recurso => { return recurso.programaid === parseInt(programaid) });
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
            // get PROGRAMAS por id /\/users\/\d+$/
            if (request.url.match(/\/apimock\/programas\/\d+$/) && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let programaElegido = programas.filter(programa => { return programa.id === id });
                  return of(new HttpResponse({ status: 200, body: programaElegido[0] }));
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
