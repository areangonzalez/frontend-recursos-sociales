/**
 * Routing de reportes
 * Creado 14/02/2019 - Arean Xavier González
 * Aqui se visualizan las rutas de los reportes y la pre carga de sus servicios
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { PrestacionesComponent, BeneficiariosComponent, EstadisticasComponent } from "./menu-list";
import { RecursoSocialService, LocalidadService, ProgramaService, TipoRecursoService, BeneficiarioService } from '../core/services';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ReporteComponent,
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
          { path: 'beneficiarios', component: BeneficiariosComponent, data: { breadcrumb: 'Beneficiarios', title: 'Reportes de beneficiarios' },
            resolve: {
              beneficiarios: BeneficiarioService,
              localidades: LocalidadService
            }
          },
          { path: 'estadisticas', component: EstadisticasComponent, data: { breadcrumb: 'Estadísticas', title: 'Reportes con estadísticas' },
            resolve: {
             localidades: LocalidadService
            },
          },
          { path: '', redirectTo: 'prestaciones', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [RecursoSocialService, ProgramaService, LocalidadService, TipoRecursoService, BeneficiarioService]
})
export class ReporteRoutingModule { }
