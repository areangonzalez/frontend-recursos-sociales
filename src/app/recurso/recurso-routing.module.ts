import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoComponent } from './recurso.component';

const routes: Routes = [
    {
      path: '', component: RecursoComponent,
      data: { loading: true, preload: true, breadcrumb: 'Crear' },
    },
    {
      path: ':programaid', component: RecursoComponent,
      data: { loading: true, preload: true, breadcrumb: 'Crear' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecursoRoutingModule { }
