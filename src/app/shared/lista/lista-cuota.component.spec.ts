import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCuotaComponent } from './lista-cuota.component';

describe('ListaCuotaComponent', () => {
  let component: ListaCuotaComponent;
  let fixture: ComponentFixture<ListaCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
