import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from "../shared";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import {
  UsuarioComponent, UsuarioModalContent, UsuarioModalComponent, UsuarioFormComponent,
  UsuarioPassFormComponent, InfoUsuarioComponent, ConfigUsuarioComponent,
  ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent,
  AdministrarRolPermisoComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent
} from './componentes';
import { ProgramaPermisoComponent } from './componentes/tablas';

@NgModule({
  imports: [
    NgbModule,
    NgSelectModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, GestorUsuarioComponent, UsuarioComponent, UsuarioFormComponent, UsuarioModalContent, UsuarioModalComponent, InfoUsuarioComponent, UsuarioPassFormComponent, ConfigUsuarioComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent, AdministrarRolPermisoComponent, ProgramaPermisoComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [UsuarioModalContent, UsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent]

})
export class AdminModule { }
