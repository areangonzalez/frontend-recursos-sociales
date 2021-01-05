import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPermisoUsuarioModalComponent } from './borrar-permiso-usuario-modal.component';

describe('BorrarPermisoUsuarioModalComponent', () => {
  let component: BorrarPermisoUsuarioModalComponent;
  let fixture: ComponentFixture<BorrarPermisoUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarPermisoUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarPermisoUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
