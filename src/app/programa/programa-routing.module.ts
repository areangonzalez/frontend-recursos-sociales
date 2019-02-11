import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramaComponent } from './programa.component';
import { ProgramaListaComponent } from "./lista";
import { TipoProgramaComponent } from "./tipo-programa";
import { ProgramaRecursoComponent } from "./recurso";

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
            { path:'prestacion', component: ProgramaRecursoComponent, data: { breadcrumb: 'Crear prestación',title: 'Crear prestación' } }
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
