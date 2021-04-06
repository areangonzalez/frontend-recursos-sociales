import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHeaderComponent } from './vista-header.component';

describe('VistaHeaderComponent', () => {
  let component: VistaHeaderComponent;
  let fixture: ComponentFixture<VistaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
