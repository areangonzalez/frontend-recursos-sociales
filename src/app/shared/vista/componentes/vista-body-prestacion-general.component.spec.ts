import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaBodyPrestacionGeneralComponent } from './vista-body-prestacion-general.component';

describe('VistaBodyPrestacionGeneralComponent', () => {
  let component: VistaBodyPrestacionGeneralComponent;
  let fixture: ComponentFixture<VistaBodyPrestacionGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaBodyPrestacionGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaBodyPrestacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
