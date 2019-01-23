import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramaComponent } from './programa.component';

const routes: Routes = [
    {
        path: '',
        component: ProgramaComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramaRoutingModule { }
