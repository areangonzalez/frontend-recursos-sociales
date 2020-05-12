/**
 * Routing de Modulo alimentar
 * Creado 30/04/2020 - Arean Xavier González
 * Aqui se visualizan las rutas de modulo alimentar y la pre carga de sus servicios
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
/* Componentes */
import { ModuloAlimentarReporteComponent } from "./modulo-alimentar-reporte.component";
import { BeneficiariosComponent, EstadisticasComponent } from "./menu";
/* Servicios */
import { LocalidadService, TipoResponsableService, ModuloAlimentarService, ComisionFomentoService, MunicipioService, DelegacionService, EstadisticaService } from '../core/services';


const routes: Routes = [
    {
        path: '',
        component: ModuloAlimentarReporteComponent,
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'beneficiarios', pathMatch: 'full' },
          { path: 'beneficiarios', component: BeneficiariosComponent, data: { breadcrumb: 'Beneficiarios', title: 'Reportes de Modulo Alimentar' },
            resolve: {
              localidades: LocalidadService,
              tipoResponsables: TipoResponsableService,
              moduloAlimentar: ModuloAlimentarService, // listado de prestaciones de modulo alimentar
              comisionesDeFomento: ComisionFomentoService,
              municipios: MunicipioService,
              delegaciones: DelegacionService
            },
          },
          { path: 'estadisticas', component: EstadisticasComponent,
            data: { breadcrumb: 'Estadísticas', title: 'Reportes de Estadísticas Modulo Alimentar' },
            resolve: {
              estadisticas: EstadisticaService
            }
          },
          { path: '', redirectTo: 'beneficiarios', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [LocalidadService, TipoResponsableService, ModuloAlimentarService, ComisionFomentoService, MunicipioService, DelegacionService]
})
export class ModuloAlimentarRoutingModule { }
