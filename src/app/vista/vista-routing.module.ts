import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaRecursoComponent } from './recurso';

const routes: Routes = [
    {
      path: 'prestacion/:recursoid', component: VistaRecursoComponent, data: { title: 'Visualizar prestación', breadcrumb: 'Prestación' }
    },
    {
      path: '',
      redirectTo: '/',
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VistaRoutingModule { }
