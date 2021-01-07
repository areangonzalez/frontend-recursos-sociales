import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaUsuarioModalComponent } from './baja-usuario-modal.component';

describe('BajaUsuarioModalComponent', () => {
  let component: BajaUsuarioModalComponent;
  let fixture: ComponentFixture<BajaUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
