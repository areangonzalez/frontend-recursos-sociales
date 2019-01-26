import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioModule } from "./inicio/inicio.module";
export function loadInicioModule() { return InicioModule; }
import { BeneficiarioModule } from "./beneficiario/beneficiario.module";
export function loadBeneficiarioModule() { return BeneficiarioModule; }
import { ProgramaModule } from "./programa/programa.module";
export function loadProgramaModule() { return ProgramaModule; }
import { ReporteModule } from "./reporte/reporte.module";
export function loadReporteModule() { return ReporteModule; }

import { CustomPreloadingStrategy } from "./custom-preloading-strategy";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        data: { preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
        children: [
          {
            path: '',
            loadChildren: loadInicioModule,
          },
          {
            path: 'beneficiario',
            loadChildren: loadBeneficiarioModule,
            data: { preload: true, breadcrumb: 'Beneficiario' }
          },{
              path: 'programa',
              loadChildren: loadProgramaModule,
              data: { preload: true, breadcrumb: 'Programas' }
          },
          {
              path: 'reporte',
              loadChildren: loadReporteModule,
              data: { preload: true, breadcrumb: 'Reportes' }
          },
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
