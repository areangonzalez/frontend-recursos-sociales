import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormPersonaComponent } from "./formulario/persona";


@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
      FormPersonaComponent
    ],
    exports: [
        CommonModule,
    ]
})
export class SharedModule { }
