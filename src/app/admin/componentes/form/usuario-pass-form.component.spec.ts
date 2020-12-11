import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPassFormComponent } from './usuario-pass-form.component';

describe('UsuarioPassFormComponent', () => {
  let component: UsuarioPassFormComponent;
  let fixture: ComponentFixture<UsuarioPassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
