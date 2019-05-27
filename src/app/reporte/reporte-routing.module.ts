/**
 * Routing de reportes
 * Creado 14/02/2019 - Arean Xavier González
 * Aqui se visualizan las rutas de los reportes y la pre carga de sus servicios
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent } from "./menu-list";

const routes: Routes = [
    {
        path: '',
        component: ReporteComponent,
        children: [
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' },
          { path: 'prestaciones', component: PrestacionesComponent, data: { breadcrumb: 'Prestaciones' } },
          { path: 'beneficiarios', component: BeneficiariosComponent, data: { breadcrumb: 'Beneficiarios' } },
          { path: 'estadisticas', component: EstadisticasComponent, data: { breadcrumb: 'Estadísticas' } },
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteRoutingModule { }
