import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramaComponent } from './programa.component';
import { ProgramaListaComponent } from "./lista";
import { TipoProgramaComponent } from "./tipo-programa";
import { CrearRecursoComponent } from "./crear-recurso";

const routes: Routes = [
    {
      path: '', component: ProgramaComponent,
      children: [
        { path: '', redirectTo: 'todos', pathMatch: 'full' },
        { path: 'todos', component: ProgramaComponent, data: { breadcrumb: 'todos' } },
        { path: ':breadcrumb/:id', component: TipoProgramaComponent,
          children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            { path:'lista', component: ProgramaListaComponent, data: {breadcrumb: 'lista'} },
            { path:'nuevo', component: CrearRecursoComponent, data: {breadcrumb: 'Crear recurso'} }
          ]
        },
        //{ path: 'agregar-recurso', component: , data: { breadcrumb: 'Crear', title: 'Crear Beneficiario' } },
        /* { path: 'editar/:id', component: AscensoDescensoComponent, data: { breadcrumb: 'Editar' } },
        { path: 'vista/:id', component: GoleadoresComponent, data: { breadcrumb: 'Vista' } }, */
        //{ path: '', redirectTo: 'lista', pathMatch: 'full' }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramaRoutingModule { }
