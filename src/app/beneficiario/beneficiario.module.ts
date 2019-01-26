import { NgModule, ModuleWithProviders } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from "@angular/router";

import { BeneficiarioComponent } from "./beneficiario.component";
import { FormularioComponent } from "./formulario";
import { ListaComponent } from "./lista";
import { SharedModule } from "../shared";
import { BeneficiarioRoutingModule } from "./beneficiario-routing.module";

@NgModule({
    imports: [
        SharedModule,
        // FormsModule, ReactiveFormsModule,
        // HttpClientModule,
        RouterModule,
        BeneficiarioRoutingModule
    ],
    declarations: [
        BeneficiarioComponent,
        FormularioComponent,
        ListaComponent
    ],
    exports: [
      // FormsModule, ReactiveFormsModule,
      // HttpClientModule,
      RouterModule,
      BeneficiarioComponent,
      FormularioComponent,
      ListaComponent,
    ]
})
export class BeneficiarioModule {
    constructor() {
    }
 }
