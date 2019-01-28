import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared";

import { ProgramaComponent } from "./programa.component";
import { ProgramaListaComponent } from "./lista";
import { TipoProgramaComponent } from "./tipo-programa";
import { ProgramaRoutingModule } from "./programa-routing.module";
import { ProgramaRecursoComponent, CrearRecursoComponent } from "./recurso";
import { ProgramaBuscarPersonaComponent, CrearPersonaComponent } from "./persona";


@NgModule({
    imports: [
        SharedModule,
        ProgramaRoutingModule
    ],
    declarations: [
      ProgramaBuscarPersonaComponent,
      CrearPersonaComponent,
      ProgramaRecursoComponent,
      CrearRecursoComponent,
      ProgramaListaComponent,
      TipoProgramaComponent,
      ProgramaComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProgramaModule {
    constructor() {
    }
 }


 //schemas: [CUSTOM_ELEMENTS_SCHEMA],
