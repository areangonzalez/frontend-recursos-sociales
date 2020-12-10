import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import { UsuarioComponent, UsuarioModalComponent, UsuarioFormComponent } from './componentes';

@NgModule({
  declarations: [AdminComponent, GestorUsuarioComponent, UsuarioComponent, UsuarioFormComponent, UsuarioModalComponent],
  imports: [
    NgbModule,
    SharedModule,
    AdminRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AdminModule { }
