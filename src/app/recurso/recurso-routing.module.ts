import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoComponent } from './recurso.component';
import { ProgramaService, TipoRecursoService, TipoResponsableService, LocalidadService } from "../core/services";

const routes: Routes = [
    {
      path: '', component: RecursoComponent,
      data: { loading: true, preload: true, breadcrumb: 'Crear', title: 'Crear prestación' },
      resolve: {
        programas: ProgramaService,
        tipoRecursos: TipoRecursoService,
        tipoResponsables: TipoResponsableService,
        localidades: LocalidadService
      }
    },
    {
      path: ':programaid', component: RecursoComponent,
      data: { loading: true, preload: true, breadcrumb: 'Crear', title: 'Crear prestación' },
      resolve: {
        programas: ProgramaService,
        tipoRecursos: TipoRecursoService,
        tipoResponsables: TipoResponsableService,
        localidades: LocalidadService
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ProgramaService, TipoRecursoService, TipoResponsableService, LocalidadService]
})
export class RecursoRoutingModule { }
