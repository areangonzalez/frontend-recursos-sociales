import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoComponent } from './recurso.component';
import { ProgramaService } from "../core/services";

const routes: Routes = [
    {
      path: '', component: RecursoComponent,
      data: { loading: true, preload: true, breadcrumb: 'Crear' },
      resolve: {
        programas: ProgramaService
      }
    },
    {
      path: ':programaid', component: RecursoComponent,
      data: { loading: true, preload: true, breadcrumb: 'Crear' },
      resolve: {
        programas: ProgramaService
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ProgramaService]
})
export class RecursoRoutingModule { }
