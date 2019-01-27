import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";

import { ProgramaComponent } from "./programa.component";
import { ProgramaListaComponent } from "./lista";
import { TipoProgramaComponent } from "./tipo-programa";
import { SharedModule } from "../shared";
import { ProgramaRoutingModule } from "./programa-routing.module";
import { CrearRecursoComponent } from "./crear-recurso";

@NgModule({
    imports: [
        SharedModule,
        ProgramaRoutingModule
    ],
    declarations: [
      CrearRecursoComponent,
      ProgramaListaComponent,
      TipoProgramaComponent,
      ProgramaComponent
    ],
    providers: [
    ],
})
export class ProgramaModule {
    constructor() {
    }
 }
