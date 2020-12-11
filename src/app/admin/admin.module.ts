import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import { UsuarioComponent, UsuarioModalContent, UsuarioModalComponent, UsuarioFormComponent, UsuarioPassFormComponent } from './componentes';

@NgModule({
  imports: [
    NgbModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, GestorUsuarioComponent, UsuarioComponent, UsuarioFormComponent, UsuarioModalContent, UsuarioModalComponent, UsuarioPassFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [UsuarioModalContent, UsuarioModalComponent]

})
export class AdminModule { }
