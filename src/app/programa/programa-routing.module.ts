import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramaComponent } from './programa.component';
import { ProgramaListaComponent } from "./lista";
import { TipoProgramaComponent } from "./tipo-programa";
import { ProgramaRecursoComponent, CrearRecursoComponent } from "./recurso";
import { CrearPersonaComponent } from "./persona";

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
            { path:'recurso', component: ProgramaRecursoComponent, data: {breadcrumb: 'Crear recurso'},
              children: [
                { path: '', redirectTo: 'nuevo', pathMatch: 'full' },
                { path: 'nuevo', component: CrearRecursoComponent  },
                { path: 'crear-persona', component: CrearPersonaComponent, data: {breadcrumb: 'Crear persona'}  },

              ]
            }
          ]
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramaRoutingModule { }
