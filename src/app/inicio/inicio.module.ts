import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";

import { InicioComponent } from "./inicio.component";
import { SharedModule } from "../shared";
import { InicioRoutingModule } from "./inicio-routing.module";

@NgModule({
    imports: [
        SharedModule,
        InicioRoutingModule
    ],
    declarations: [
        InicioComponent
    ],
    providers: [
    ],
})
export class InicioModule {
    constructor() {
    }
 }
