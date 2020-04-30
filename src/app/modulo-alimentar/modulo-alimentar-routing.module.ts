/**
 * Routing de Modulo alimentar
 * Creado 30/04/2020 - Arean Xavier González
 * Aqui se visualizan las rutas de modulo alimentar y la pre carga de sus servicios
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    /* {
        path: '',
        //component: ReporteComponent,
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' },
          { path: 'prestaciones', component: PrestacionesComponent, data: { breadcrumb: 'Prestaciones', title: 'Reportes de prestaciones' },
            resolve: {
              prestaciones: RecursoSocialService,
              programas: ProgramaService,
              localidades: LocalidadService,
              tipoPrestacion: TipoRecursoService
            }
          },
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' }
        ]
    } */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ModuloAlimentarRoutingModule { }
