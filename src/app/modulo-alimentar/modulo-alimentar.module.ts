import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared";
import { ModuloAlimentarRoutingModule } from "./modulo-alimentar-routing.module";
import { ModuloAlimentarReporteComponent } from "./modulo-alimentar-reporte.component";

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        ModuloAlimentarRoutingModule
    ],
    declarations: [
      ModuloAlimentarReporteComponent

    ],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuloAlimentarModule {
    constructor() {
    }
 }
