import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

/* Modulos */
import {
  HeaderComponent,
  FooterComponent,
  BreadcrumbComponent, BreadcrumbsService,
  SharedModule
} from "./shared";
import { InicioModule } from "./inicio/inicio.module";
import { BeneficiarioModule } from "./beneficiario/beneficiario.module";
import { ProgramaModule } from "./programa/programa.module";
import { ReporteModule } from "./reporte/reporte.module";


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    InicioModule,
    BeneficiarioModule,
    ProgramaModule,
    ReporteModule
  ],
  providers: [
    BreadcrumbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
