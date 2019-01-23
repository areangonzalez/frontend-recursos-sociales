import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";

import { ReporteComponent } from "./reporte.component";
import { SharedModule } from "../shared";
import { ReporteRoutingModule } from "./reporte-routing.module";

@NgModule({
    imports: [
        SharedModule,
        ReporteRoutingModule
    ],
    declarations: [
        ReporteComponent
    ],
    providers: [
    ],
})
export class ReporteModule {
    constructor() {
    }
 }
