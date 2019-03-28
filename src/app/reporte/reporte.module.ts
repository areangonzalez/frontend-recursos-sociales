import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared";
import { ReporteRoutingModule } from "./reporte-routing.module";
import { ReporteComponent } from "./reporte.component";
import { BusquedaRecursoComponent, BusquedaBeneficiarioComponent } from "./busqueda";
import { ListaRecursoComponent, ListaBeneficiarioComponent, ListaProgramasComponent } from "./lista";
import { MenuListaComponent, PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent } from "./menu-list";
import { ChartProgramaMontoComponent, ChartProgramaPrestacionesComponent } from './chart'

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
        ChartProgramaMontoComponent, ChartProgramaPrestacionesComponent,
        MenuListaComponent, PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteModule {
    constructor() {
    }
 }
