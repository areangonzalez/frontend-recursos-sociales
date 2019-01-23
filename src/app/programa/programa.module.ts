import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";

import { ProgramaComponent } from "./programa.component";
import { SharedModule } from "../shared";
import { ProgramaRoutingModule } from "./programa-routing.module";

@NgModule({
    imports: [
        SharedModule,
        ProgramaRoutingModule
    ],
    declarations: [
        ProgramaComponent
    ],
    providers: [
    ],
})
export class ProgramaModule {
    constructor() {
    }
 }
