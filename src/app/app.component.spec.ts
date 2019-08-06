import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppLayoutComponent, LoaderComponent, MensajesComponent, BreadcrumbComponent, BreadcrumbsService, SharedModule } from "./shared";
import { PixelSpinnerModule } from 'angular-epic-spinners';
import { TitleService } from './core/services';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PixelSpinnerModule,
        SharedModule,
        CoreModule,
        AppRoutingModule,
      ],
      declarations: [
        AppLayoutComponent,
        BreadcrumbComponent,
        LoaderComponent,
        AppComponent,
        MensajesComponent
      ],
      providers:[ BreadcrumbsService, TitleService, {provide: APP_BASE_HREF, useValue : '/' } ],

    }).compileComponents();
  }));

  it('El usuario no esta logueado', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.logueado).toBeFalsy();
  });

});
