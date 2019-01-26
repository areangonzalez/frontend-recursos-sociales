import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

/* Modulos */
import { CoreModule } from "./core/core.module";
import {
  HeaderComponent,
  FooterComponent,
  BreadcrumbComponent, BreadcrumbsService,
  CustomDatepickerI18n,
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
    CoreModule,
    SharedModule,
    InicioModule,
    BeneficiarioModule,
    ProgramaModule,
    ReporteModule
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    Title,
    BreadcrumbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
