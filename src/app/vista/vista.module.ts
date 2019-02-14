import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";

import { VistaRoutingModule } from "./vista-routing.module";
import { VistaComponent } from "./vista.component";
import { VistaRecursoComponent } from "./recurso";


@NgModule({
    imports: [
      NgbModule,
      SharedModule,
      VistaRoutingModule
    ],
    declarations: [
      VistaComponent,
      VistaRecursoComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class VistaModule {
    constructor() {
    }
 }
