import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class LoginModule {
    constructor() {
    }
 }
