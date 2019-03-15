import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

import { InicioModule } from "./inicio/inicio.module";
export function loadInicioModule() { return InicioModule; }
import { RecursoModule } from "./recurso/recurso.module";
export function loadRecursoModule() { return RecursoModule; }
import { ReporteModule } from "./reporte/reporte.module";
export function loadReporteModule() { return ReporteModule; }
import { VistaModule } from "./vista/vista.module";
export function loadVistaModule() { return VistaModule; }

import { CustomPreloadingStrategy } from "./custom-preloading-strategy";

function cambiarRutas() {
  if (environment.production == true) { // prod
    return [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', data: { loading: true, preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
          children: [
            { path: '', loadChildren: './inicio/inicio.module#InicioModule' },
            { path: 'crear-prestacion', loadChildren: './recurso/recurso.module#RecursoModule',
              data: { loading: true, preload: true, breadcrumb: 'Crear prestación', title: 'Crear prestación' } },
            { path: 'reporte', loadChildren: './reporte/reporte.module#ReporteModule',
              data: { loading: true, preload: true, breadcrumb: 'Reportes', title: 'Reportes' } },
            { path: 'vista', loadChildren: './vista/vista.module#VistaModule',
              data: { loading: true, preload: true, breadcrumb: 'Visualizar prestación', title: 'Visualizar prestación' } }
          ]
      },{ path: '**', redirectTo: 'inicio', pathMatch: 'full' },
    ];
  }else{ // dev
    return [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', data: { loading: true, preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
          children: [
            { path: '', loadChildren: loadInicioModule, },
            { path: 'crear-prestacion', loadChildren: loadRecursoModule,
              data: { loading: true, preload: true, breadcrumb: 'Crear prestación', title: 'Crear prestación' } },
            { path: 'reporte', loadChildren: loadReporteModule,
              data: { loading: true, preload: true, breadcrumb: 'Reportes', title: 'Reportes' } },
            { path: 'vista', loadChildren: loadVistaModule,
              data: { loading: true, preload: true, breadcrumb: 'Visualizar prestación', title: 'Visualizar prestación' } }
          ]
      },{ path: '**', redirectTo: 'inicio', pathMatch: 'full' }
    ];
  }
}

const routes: Routes = cambiarRutas();

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{
            // preload all modules; optionally we could
            // implement a custom preloading strategy for just some
            // of the modules (PRs welcome 😉)
            preloadingStrategy: CustomPreloadingStrategy
    })],
    exports: [RouterModule],
    providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
