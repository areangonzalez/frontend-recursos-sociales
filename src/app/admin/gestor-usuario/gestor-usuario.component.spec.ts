import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorUsuarioComponent } from './gestor-usuario.component';

describe('GestorUsuarioComponent', () => {
  let component: GestorUsuarioComponent;
  let fixture: ComponentFixture<GestorUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
