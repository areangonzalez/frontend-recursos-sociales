import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioModalComponent } from './usuario-modal.component';

describe('UsuarioModalComponent', () => {
  let component: UsuarioModalComponent;
  let fixture: ComponentFixture<UsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
