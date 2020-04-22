import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared";
import { ReporteRoutingModule } from "./reporte-routing.module";
import { ReporteComponent } from "./reporte.component";
import { BusquedaRecursoComponent, BusquedaBeneficiarioComponent, BusquedaModuloAlimentarComponent } from "./busqueda";
import { ListaRecursoComponent, ListaBeneficiarioComponent, ListaProgramasComponent, ListaModuloAlimentarComponent } from "./lista";
import { MenuListaComponent, PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent, ModuloAlimentarComponent } from "./menu-list";
import { BeneficiarioProgramaLocalidadComponent, BeneficiarioTipoPrestacionLocalidadComponent } from './beneficiario';
import {
  ChartProgramaMontoComponent, ChartProgramaPrestacionesComponent, ChartProgramaBeneficiariosComponent,
  ChartBeneficiarioProgramaLocalidadComponent, ChartBeneficiarioTipoPrestacionLocalidadComponent, ChartLocalidadMontoComponent
 } from './chart';

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        ReporteRoutingModule
    ],
    declarations: [
        ReporteComponent,
        BusquedaRecursoComponent, BusquedaBeneficiarioComponent, BusquedaModuloAlimentarComponent,
        ListaRecursoComponent, ListaBeneficiarioComponent, ListaProgramasComponent, ListaModuloAlimentarComponent,
        BeneficiarioProgramaLocalidadComponent, BeneficiarioTipoPrestacionLocalidadComponent,
        ChartProgramaMontoComponent, ChartProgramaPrestacionesComponent, ChartProgramaBeneficiariosComponent,
        ChartBeneficiarioProgramaLocalidadComponent, ChartBeneficiarioTipoPrestacionLocalidadComponent, ChartLocalidadMontoComponent,
        MenuListaComponent, PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent, ModuloAlimentarComponent
    ],
    entryComponents: [
      ChartBeneficiarioProgramaLocalidadComponent, ChartBeneficiarioTipoPrestacionLocalidadComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteModule {
    constructor() {
    }
 }
