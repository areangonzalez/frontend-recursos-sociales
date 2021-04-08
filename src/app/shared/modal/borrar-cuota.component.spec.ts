import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCuotaComponent } from './borrar-cuota.component';

describe('BorrarCuotaComponent', () => {
  let component: BorrarCuotaComponent;
  let fixture: ComponentFixture<BorrarCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
