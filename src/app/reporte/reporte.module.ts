import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { ReporteComponent } from "./reporte.component";
import { BusquedaRecursoComponent, BusquedaBeneficiarioComponent } from "./busqueda";
import { ListaRecursoComponent, ListaBeneficiarioComponent } from "./lista";
import { SharedModule } from "../shared";
import { ReporteRoutingModule } from "./reporte-routing.module";

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        ReporteRoutingModule
    ],
    declarations: [
        ReporteComponent,
        BusquedaRecursoComponent, BusquedaBeneficiarioComponent,
        ListaRecursoComponent, ListaBeneficiarioComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteModule {
    constructor() {
    }
 }
