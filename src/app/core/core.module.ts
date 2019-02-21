import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  TitleService,
  ApiService,
  LoaderService,
  MensajesService,
  PersonaService,
  TipoRecursoService,
  ProgramaService,
  SexoService,
  GeneroService,
  EstadoCivilService,
  LocalidadService,
  RecursoSocialService
} from './services';

import { UtilService } from "./utils";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    TitleService,
    UtilService,
    ApiService,
    LoaderService,
    MensajesService,
    PersonaService,
    TipoRecursoService,
    ProgramaService,
    SexoService,
    GeneroService,
    EstadoCivilService,
    LocalidadService,
    RecursoSocialService
    /*
    AuthGuard,
    JwtService,
     */
  ],
  declarations: []
})
export class CoreModule { }
