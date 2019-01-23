import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";

import { BeneficiarioComponent } from "./beneficiario.component";
import { FormularioComponent } from "./formulario";
import { ListaComponent } from "./lista";
import { SharedModule } from "../shared";
import { BeneficiarioRoutingModule } from "./beneficiario-routing.module";

@NgModule({
    imports: [
        SharedModule,
        BeneficiarioRoutingModule
    ],
    declarations: [
        BeneficiarioComponent,
        FormularioComponent,
        ListaComponent
    ]
})
export class BeneficiarioModule {
    constructor() {
    }
 }
