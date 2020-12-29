import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaPermisoComponent } from './programa-permiso.component';

describe('ProgramaPermisoComponent', () => {
  let component: ProgramaPermisoComponent;
  let fixture: ComponentFixture<ProgramaPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
