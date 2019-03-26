import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { PrestacionesComponent, BeneficiariosComponent, ProgramasComponent } from "./menu-list";

const routes: Routes = [
    {
        path: '',
        component: ReporteComponent,
        children: [
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' },
          { path: 'prestaciones', component: PrestacionesComponent, data: { breadcrumb: 'Prestaciones' } },
          { path: 'beneficiarios', component: BeneficiariosComponent, data: { breadcrumb: 'Beneficiarios' } },
          { path: 'programas', component: ProgramasComponent, data: { breadcrumb: 'Programas' } },
          /* { path: 'lista-equipos', component: EquiposComponent, data: { breadcrumb: 'Equipos' } }, */
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteRoutingModule { }
