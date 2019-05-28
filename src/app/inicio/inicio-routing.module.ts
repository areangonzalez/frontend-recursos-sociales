import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { ProgramaService } from "../core/services";

const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        data: { title: 'Inicio' },
        resolve: {
          programas: ProgramaService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ProgramaService]
})
export class InicioRoutingModule { }
