import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDatepickerI18n, NgbDateStruct, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from "ng2-charts";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PixelSpinnerModule } from "angular-epic-spinners";

/* Routing */
import { AppRoutingModule } from './app-routing.module';

// fake backend provider
import { fakeBackendProvider } from "./shared/helpers/fake-backend";

/* Modulos */
import { CoreModule } from "./core/core.module";
import {
  MensajesComponent,
  BreadcrumbComponent, BreadcrumbsService,
  CustomDatepickerI18n,
  LoaderComponent,
  SharedModule
} from "./shared";

import { AppComponent } from './app.component';
import { HttpClient } from 'selenium-webdriver/http';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MensajesComponent,
    BreadcrumbComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgbTooltipModule.forRoot(),
    PixelSpinnerModule,
    HttpClientModule,
    ChartsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    Title,
    BreadcrumbsService,

    // facke-backend providers
    fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
