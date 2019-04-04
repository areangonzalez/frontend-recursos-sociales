import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', data: { loading:true, title: "Iniciar sesión" },
      children: [
        { path: '',
          loadChildren: './login/login.module#LoginModule'
        },
        { path: 'inicio',
          loadChildren: './inicio/inicio.module#InicioModule', // prod
          data: { loading: true, preload: true, breadcrumb: 'Inicio', tile: 'Inicio' }
        },
        { path: 'crear-prestacion',
          loadChildren: './recurso/recurso.module#RecursoModule', // prod
          data: { loading: true, preload: true, breadcrumb: 'Crear prestación', title: 'Crear prestación' } },
        { path: 'reporte',
          loadChildren: './reporte/reporte.module#ReporteModule', // prod
          data: { loading: true, preload: true, breadcrumb: 'Reportes', title: 'Reportes' } },
        { path: 'vista',
          loadChildren: './vista/vista.module#VistaModule', // prod
          data: { loading: true, preload: true, breadcrumb: 'Visualizar prestación', title: 'Visualizar prestación' } }
      ]
  },{ path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
          // preload all modules; optionally we could
          // implement a custom preloading strategy for just some
          // of the modules (PRs welcome 😉)
          preloadingStrategy: CustomPreloadingStrategy
        })],
    exports: [RouterModule],
   providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
