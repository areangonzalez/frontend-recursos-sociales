import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";
import { AppLayoutComponent } from "./shared/layout";
import { AuthGuard } from "./core/guards/auth.guard";


const routes: Routes = [
//  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  //{ path: 'inicio', data: {  preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
  {
    path: 'inicio', data: {  preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
    component: AppLayoutComponent,
    children: [
      { path: '',
        canActivate: [AuthGuard],
        loadChildren: './inicio/inicio.module#InicioModule', // prod
      },
      { path: 'reporte-modulo-alimentar',
        loadChildren: './modulo-alimentar/modulo-alimentar.module#ModuloAlimentarModule',
        canActivate: [AuthGuard],
        data: { loading: true, preload: true, breadcrumb: 'Reportes Modulo Alimentar' }
      },
      { path: 'crear-prestacion',
        loadChildren: './recurso/recurso.module#RecursoModule', // prod
        canActivate: [AuthGuard],
        data: { loading: true, preload: true, breadcrumb: 'Prestación' } },
      { path: 'reporte',
        canActivate: [AuthGuard],
        loadChildren: './reporte/reporte.module#ReporteModule', // prod
        data: { loading: true, preload: true, breadcrumb: 'Reportes', title: 'Reportes' } },
      { path: 'vista',
        canActivate: [AuthGuard],
        loadChildren: './vista/vista.module#VistaModule', // prod
        data: { loading: true, preload: true, breadcrumb: 'Vista', title: 'Visualizar prestación' } }
    ]
  },
  { path: 'login', data: { title: "Iniciar sesión" }, loadChildren: './login/login.module#LoginModule' },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
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
   providers: [CustomPreloadingStrategy, AuthGuard]
})
export class AppRoutingModule { }
