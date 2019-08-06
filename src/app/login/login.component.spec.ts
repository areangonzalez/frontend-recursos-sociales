import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from '../core/core.module';

import { LoginComponent } from './login.component';
import { LoaderComponent, MensajesComponent, BreadcrumbComponent, BreadcrumbsService, AppLayoutComponent, SharedModule } from "../shared";
import { PixelSpinnerModule } from 'angular-epic-spinners';
import { TitleService, AuthenticationService, LoaderService, ApiService } from '../core/services'
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs';
import { Observable, of } from 'rxjs';


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PixelSpinnerModule,
        SharedModule,
        CoreModule,
        AppRoutingModule,
        LoginRoutingModule
      ],
      declarations: [
        AppLayoutComponent,
        LoaderComponent,
        BreadcrumbComponent,
        AppComponent,
        MensajesComponent,
        LoginComponent
      ],
      providers:[
        LoaderService,
        TitleService,
        ApiService,
        AuthenticationService,
         BreadcrumbsService, TitleService,
         { provide: ActivatedRoute },
        { provide: Router },
        {provide: APP_BASE_HREF, useValue : '/login' } ],

    }).compileComponents();
  }));

  it('Logueo de usuario', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.logueado).toBeFalsy();
  });

});
