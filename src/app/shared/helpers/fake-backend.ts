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
            // obtener reurso por ID
            if(request.url.match(/\/apimock\/recursos\/\d+$/) && request.method === 'GET') {
              let urlParts = request.url.split('/');
              let id = parseInt(urlParts[urlParts.length - 1]);
              console.log("recurso id: ",id);
              let recurso = recursos.filter(recurso => { return recurso.id === id; });
              let recursoEncontrado = recurso.length ? recurso[0] : null;
              let alumnos: any[] = [];
              if(recursoEncontrado["alumnos"]!== undefined) {
                for (let i = 0; i < recursoEncontrado["alumnos"].length; i++) {
                  let encontrado = personas.filter(alumno => { return alumno.id === recursoEncontrado["alumnos"][i].alumnoid; });
                  alumnos.push(encontrado[0]);
                }

                recursoEncontrado["alumnos"] = alumnos;
              }

              console.log("recurso encontrado: ",recursoEncontrado);
              //console.log(tipos);
              return of(new HttpResponse({ status: 200, body: recursoEncontrado }));
            }
            // Persona por ID
            if(request.url.match(/\/apimock\/personas\/\d+$/) && request.method === 'GET') {
              let urlParts = request.url.split('/');
              let id = parseInt(urlParts[urlParts.length - 1]);
              let persona = personas.filter(persona => { return persona.id === id; });
              let personaEncontrada = persona.length ? persona[0] : null;

              //console.log(tipos);
              return of(new HttpResponse({ status: 200, body: personaEncontrada }));
            }
            // get buscador de recurso social
            if(request.url.endsWith('/apimock/recursos') && request.method === 'GET') {
              // parametros
              let programaid = request.params.get('programaid');
              let pageSize: number = parseInt(request.params.get('pagesize'));
              let localidadid = request.params.get('localidadid');
              let tipo_recursoid = request.params.get('tipo_recursoid');
              let fecha_desde: string = request.params.get('fecha_desde');
              let fecha_hasta: string = request.params.get('fecha_hasta');
              let global_search: string = request.params.get('global_param');
              let page: number = parseInt(request.params.get("page"));
              // variables de uso general
              //let search = (global_search != '') ? global_search.split(" ") : [] ;
              let search = global_search.split(" ");
              let totalPaginas = 0;
              let recursosEncontrados: any[] = [];
              let listaRecursos = {
                total_filtrado: 0,
                pagesize: pageSize,
                pages: totalPaginas,
                estado: true,
                resultado:recursosEncontrados
              };
              // esto facilita la busqueda de un recurso con la persona y su dirección
              for (let i = 0; i < recursos.length; i++) {
                recursos[i]["programa"] = nombrePorId(recursos[i]["programaid"], programas);
                for (let j = 0; j < personas.length; j++) {
                  // preguntar si los id's soinciden
                  if (recursos[i]["personaid"] == personas[j]["id"]){
                    // actualizo las localidades
                    personas[j]["lugar"]["localidad"] = nombrePorId(personas[j]["lugar"]["localidadid"], localidades);
                    // creo a la persona dentro del recurso
                    recursos[i]["persona"] = personas[j];
                  }
                  // pregunto si alumnos existe en el recurso
                  if (recursos[i]["alumnos"] !== undefined){
                    for (let k = 0; k < recursos[i]["alumnos"].length; k++) {
                      for (let l = 0; l < personas.length; l++) {
                        // verifico si el alumno tiene el mismo id que la persona
                        if (recursos[i]["alumnos"][k]["alumnoid"] == personas[l]["id"]) {
                          // actualizo su localidad
                          personas[l]["lugar"]["localidad"] = nombrePorId(personas[l]["lugar"]["localidadid"], localidades);
                          // creo los alumnos
                          recursos[i]["alumnos"][k] = personas[l];
                        }
                      }
                    }
                  }
                }
              }// fin for de recursos

              if (pageSize == 0 && programaid !== undefined){ // paginacion 0 y un id de programa
                let totalRecursos = parseInt(programaid) * 13;
                recursosEncontrados = recursos.filter(recurso => { return recurso.programaid === programaid });

                // armo array final
                listaRecursos["total_filtrado"] = totalRecursos;
                listaRecursos["pagesize"] = pageSize;
                listaRecursos["resultado"] = recursosEncontrados;

                return of(new HttpResponse({ status: 200, body: listaRecursos }));
              }else{
                recursosEncontrados = recursos.filter(
                  recurso => {
                    for (let i = 0; i < search.length; i++) {
                      let nombre = recurso.persona.nombre.split(" ");
                      for (let j = 0; j < nombre.length; j++) {
                          if ( nombre[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                            return recurso;
                          }
                      }
                      if (recurso.persona.nro_documento.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ){
                        return recurso;
                      }
                      if ( recurso.persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                        return recurso;
                      }
                    }
                  });
                  if (localidadid) {
                    recursosEncontrados = recursosEncontrados.filter(recurso => { return parseInt(localidadid) === parseInt(recurso.persona.lugar.localidadid); });
                  }
                  if (programaid) {
                    recursosEncontrados = recursosEncontrados.filter(recurso => { return parseInt(programaid) === parseInt(recurso.programaid); });
                  }
                  if (tipo_recursoid) {
                    recursosEncontrados = recursosEncontrados.filter(recurso => { return parseInt(tipo_recursoid) === parseInt(recurso.tipo_recursoid); });
                  }
                  //console.log(recursosEncontrados);
                  let totalFiltrado:number = recursosEncontrados.length;
                  let total:number = totalFiltrado/pageSize;
                  let numEntero = Math.floor(total);
                  let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

                  listaRecursos.total_filtrado = recursosEncontrados.length;
                  listaRecursos.pages = totalPagina;
                  if (page > 0) {
                    page = page - 1;
                    let pageStart = page * pageSize;
                    let pageEnd = pageStart + pageSize;
                    listaRecursos.resultado = recursosEncontrados.slice(pageStart, pageEnd);
                  }else{
                    listaRecursos.resultado = recursosEncontrados.slice(0,pageSize);
                  }



                return of(new HttpResponse({ status: 200, body: listaRecursos }));
              }
                //console.log(tipos);
            }
            //Guardado de recurso
            if(request.url.endsWith('/apimock/recursos') && request.method === 'POST') {
              let nuevoRecurso = request.body;
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
              let globalSearch = request.params.get('global_param');
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
                  page = page;
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
            // Actualizacion de una persona
            if (request.url.match(/\/apimock\/personas\/\d+$/) && request.method === 'PUT') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // find user by id in users array
                  let urlParts = request.url.split('/');
                  let personaid = parseInt(urlParts[urlParts.length - 1]);
                  let datosPersona = request.body;

                  let persona = personas.filter(persona => { return persona.id === personaid; });
                  let personaEncontrada = persona.length ? persona[0] : null;

                  if (personaEncontrada["contacto"] !== undefined) {
                    delete personaEncontrada["contacto"];
                  }
                  if (personaEncontrada["hogar"] !== undefined) {
                    delete personaEncontrada["hogar"];
                  }
                  if (personaEncontrada["estudios"] !== undefined) {
                    delete personaEncontrada["estudios"];
                  }
                  if (datosPersona.apellido !== undefined){
                    personaEncontrada["apellido"]             = datosPersona.apellido;
                    personaEncontrada["celular"]              = datosPersona.celular;
                    personaEncontrada["cuil"]                 = datosPersona.cuil;
                    personaEncontrada["email"]                = datosPersona.email;
                    personaEncontrada["estado_civil"]         = nombrePorId(datosPersona.estado_civilid, estadoCivil);
                    personaEncontrada["estado_civilid"]       = datosPersona.estado_civilid;
                    personaEncontrada["fecha_nacimiento"]     = datosPersona.fecha_nacimiento;
                    personaEncontrada["genero"]               = nombrePorId(datosPersona.generoid, generos);
                    personaEncontrada["generoid"]             = datosPersona.generoid;
                    personaEncontrada["id"]                   = datosPersona.id;
                    personaEncontrada["nombre"]               = datosPersona.nombre;
                    personaEncontrada["nro_documento"]        = datosPersona.nro_documento;
                    personaEncontrada["red_social"]           = datosPersona.red_social;
                    personaEncontrada["sexo"]                 = nombrePorId(datosPersona.sexoid, sexos);
                    personaEncontrada["sexoid"]               = datosPersona.sexoid;
                    personaEncontrada["telefono"]             = datosPersona.telefono;
                    personaEncontrada["lugar"]["altura"]      = datosPersona.lugar.altura;
                    personaEncontrada["lugar"]["barrio"]      = datosPersona.lugar.barrio;
                    personaEncontrada["lugar"]["calle"]       = datosPersona.lugar.calle;
                    personaEncontrada["lugar"]["depto"]       = datosPersona.lugar.depto;
                    personaEncontrada["lugar"]["escalera"]    = datosPersona.lugar.escalera;
                    personaEncontrada["lugar"]["id"]          = datosPersona.lugar.id;
                    personaEncontrada["lugar"]["localidad"]   = nombrePorId(datosPersona.lugar.localidadid, localidades);
                    personaEncontrada["lugar"]["localidadid"] = datosPersona.lugar.localidadid;
                    personaEncontrada["lugar"]["piso"]        = datosPersona.lugar.piso;
                  }else{
                    personaEncontrada["celular"]              = datosPersona.celular;
                    personaEncontrada["red_social"]           = datosPersona.red_social;
                    personaEncontrada["telefono"]             = datosPersona.telefono;
                    personaEncontrada["email"]                = datosPersona.email;
                  }

                  let personasAgregadas = [];
                  if (localStorage.getItem('personas')) {
                    let existe = false;
                    personasAgregadas = [JSON.parse(localStorage.getItem('personas'))];
                    for (let i = 0; i < personasAgregadas[0].length; i++) {
                      if (personasAgregadas[0][i].id === personaid){
                        personasAgregadas[0][i] = personaEncontrada;
                        existe = true;
                      }
                    }
                    if (!existe) {
                      personasAgregadas[0].push(personaEncontrada);
                    }
                    localStorage.setItem('personas', JSON.stringify(personasAgregadas[0]));
                  }else{
                    personasAgregadas.push(personaEncontrada);
                    localStorage.setItem('personas', JSON.stringify(personasAgregadas));
                  }
                  for (let i = 0; i < personas.length; i++) {
                    if (personas[i].id === personaid) {
                      personas[i] = personaEncontrada;
                    }}

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
