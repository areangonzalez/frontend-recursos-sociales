import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioModule } from "./inicio/inicio.module";
export function loadInicioModule() { return InicioModule; }
import { RecursoModule } from "./recurso/recurso.module";
export function loadRecursoModule() { return RecursoModule; }
import { ReporteModule } from "./reporte/reporte.module";
export function loadReporteModule() { return ReporteModule; }
import { VistaModule } from "./vista/vista.module";
export function loadVistaModule() { return VistaModule; }

import { CustomPreloadingStrategy } from "./custom-preloading-strategy";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        data: { loading: true, preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
        children: [
          {
            path: '',
            loadChildren: loadInicioModule, // dev
            // loadChildren: './inicio/inicio.module#InicioModule', // production
          },
          {
            path: 'crear-prestacion',
            loadChildren: loadRecursoModule, // dev
            // loadChildren: './recurso/recurso.module#RecursoModule', // production
            data: { preload: true, breadcrumb: 'Crear prestación' }
          },
          {
              path: 'reporte',
              loadChildren: loadReporteModule, // dev
              // loadChildren: './reporte/reporte.module#ReporteModule', // production
              data: { preload: true, breadcrumb: 'Reportes' }
          },
          {
            path: 'vista',
            loadChildren: loadVistaModule, // dev
            // loadChildren: './vista/vista.module#VistaModule', // production
            data: { preload: true, breadcrumb: 'Visualizar prestación' }
          }
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
];

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
