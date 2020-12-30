import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import { UsuarioService } from '../core/services';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    data: { loading: true, preload: true, breadcrumb: 'Administración', title: 'Administración' },
  },{
    path: 'gestor-usuarios', component: GestorUsuarioComponent,
    data: { loading: true, preload: true, title: 'Gestión de Usuarios' },
    resolve: { usuarios: UsuarioService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UsuarioService]
})
export class AdminRoutingModule { }
