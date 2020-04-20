import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import { AuthGuard } from "./guards/auth.guard";

import {
  JwtService,
  AuthenticationService,
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
  RecursoSocialService,
  BeneficiarioService,
  TipoRedSocialService,
  DescargasService,
  DetalleProgramaService,
  EstadisticaService,
  TipoResponsableService,
  ResponsableEntregaService,
  ModuloAlimentarService,
  ComisionFomentoService,
  MunicipioService
} from './services';

import { UtilService } from "./utils";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthGuard,
    JwtService,
    AuthenticationService,
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
    RecursoSocialService,
    BeneficiarioService,
    TipoRedSocialService,
    DescargasService,
    DetalleProgramaService,
    EstadisticaService,
    TipoResponsableService,
    ResponsableEntregaService,
    ModuloAlimentarService,
    ComisionFomentoService,
    MunicipioService
  ],
  declarations: []
})
export class CoreModule { }
