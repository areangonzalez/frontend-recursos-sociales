import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";

import { BeneficiarioComponent } from "./beneficiario.component";
import { SharedModule } from "../shared";
import { BeneficiarioRoutingModule } from "./beneficiario-routing.module";

@NgModule({
    imports: [
        SharedModule,
        BeneficiarioRoutingModule
    ],
    declarations: [
        BeneficiarioComponent
    ],
    providers: [
    ],
})
export class BeneficiarioModule {
    constructor() {
    }
 }
