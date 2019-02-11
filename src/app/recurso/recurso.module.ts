import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";

import { RecursoRoutingModule } from "./recurso-routing.module";
import { RecursoComponent } from "./recurso.component";
import { VistaRecursoComponent } from "./vista";


@NgModule({
    imports: [
      NgbModule,
      SharedModule,
      RecursoRoutingModule
    ],
    declarations: [
      RecursoComponent,
      VistaRecursoComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RecursoModule {
    constructor() {
    }
 }
