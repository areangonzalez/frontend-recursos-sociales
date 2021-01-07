import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { DetalleProgramaService } from "../core/services";

const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        data: { title: 'Inicio', rol: ['usuario', 'admin'] },
        resolve: {
          programas: DetalleProgramaService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [DetalleProgramaService]
})
export class InicioRoutingModule { }
