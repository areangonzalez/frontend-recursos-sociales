import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared";
import { ReporteRoutingModule } from "./reporte-routing.module";
import { ReporteComponent } from "./reporte.component";
import { BusquedaRecursoComponent, BusquedaBeneficiarioComponent } from "./busqueda";
import { ListaRecursoComponent, ListaBeneficiarioComponent, ListaProgramasComponent } from "./lista";
import { MenuListaComponent, PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent } from "./menu-list";
import { BeneficiarioProgramaLocalidadComponent } from './beneficiario';
import {
  ChartProgramaMontoComponent, ChartProgramaPrestacionesComponent, ChartProgramaBeneficiariosComponent,
  ChartBeneficiarioProgramaLocalidadComponent
 } from './chart';

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        ReporteRoutingModule
    ],
    declarations: [
        ReporteComponent,
        BusquedaRecursoComponent, BusquedaBeneficiarioComponent,
        ListaRecursoComponent, ListaBeneficiarioComponent, ListaProgramasComponent,
        BeneficiarioProgramaLocalidadComponent,
        ChartProgramaMontoComponent, ChartProgramaPrestacionesComponent, ChartProgramaBeneficiariosComponent,
        ChartBeneficiarioProgramaLocalidadComponent,
        MenuListaComponent, PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent
    ],
    entryComponents: [
      ChartBeneficiarioProgramaLocalidadComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteModule {
    constructor() {
    }
 }
