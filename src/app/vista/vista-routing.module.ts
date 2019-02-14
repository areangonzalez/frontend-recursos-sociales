import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaRecursoComponent } from './recurso';

const routes: Routes = [
    /* {
      path: ':recursoid', component: VistaRecursoComponent,
    }, */
    {
      path: 'prestacion/:recursoid', component: VistaRecursoComponent,
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
