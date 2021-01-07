import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";
import { AdminLayoutComponent, AppLayoutComponent } from "./shared/layout";
import { AuthGuard } from "./core/guards/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'inicio', data: {  preload: true, breadcrumb: 'Inicio', tile: 'Inicio' },
    component: AppLayoutComponent,
    children: [
      { path: '',
        canActivate: [AuthGuard],
        loadChildren: './inicio/inicio.module#InicioModule', // prod
        data: { rol: ['usuario', 'admin'] }
      },
      { path: 'reporte-modulo-alimentar',
        loadChildren: './modulo-alimentar/modulo-alimentar.module#ModuloAlimentarModule',
        canActivate: [AuthGuard],
        data: { loading: true, preload: true, breadcrumb: 'Reportes Modulo Alimentar', rol: ['usuario', 'admin'] }
      },
      { path: 'crear-prestacion',
        loadChildren: './recurso/recurso.module#RecursoModule', // prod
        canActivate: [AuthGuard],
        data: { loading: true, preload: true, breadcrumb: 'Prestación', rol: ['usuario', 'admin'] } },
      { path: 'reporte',
        canActivate: [AuthGuard],
        loadChildren: './reporte/reporte.module#ReporteModule', // prod
        data: { loading: true, preload: true, breadcrumb: 'Reportes', title: 'Reportes', rol: ['usuario', 'admin'] } },
      { path: 'vista',
        canActivate: [AuthGuard],
        loadChildren: './vista/vista.module#VistaModule', // prod
        data: { loading: true, preload: true, breadcrumb: 'Vista', title: 'Visualizar prestación', rol: ['usuario', 'admin'] } }
    ]
  },
  { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: { title: "Administración", rol: ['admin', 'soporte'] }, loadChildren: './admin/admin.module#AdminModule' },
  { path: 'login', data: { title: "Iniciar sesión" }, loadChildren: './login/login.module#LoginModule' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
          useHash: true,
          // preload all modules; optionally we could
          // implement a custom preloading strategy for just some
          // of the modules (PRs welcome 😉)
          preloadingStrategy: CustomPreloadingStrategy
        })],
    exports: [RouterModule],
   providers: [CustomPreloadingStrategy, AuthGuard]
})
export class AppRoutingModule { }
