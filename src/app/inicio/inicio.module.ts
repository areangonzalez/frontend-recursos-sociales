import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class InicioModule {
    constructor() {
    }
 }
