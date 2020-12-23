import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRolPermisoComponent } from './administrar-rol-permiso.component';

describe('AdministrarRolPermisoComponent', () => {
  let component: AdministrarRolPermisoComponent;
  let fixture: ComponentFixture<AdministrarRolPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRolPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRolPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
