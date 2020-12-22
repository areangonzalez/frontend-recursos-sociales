import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarUsuarioModalComponent } from './configurar-usuario-modal.component';

describe('ConfigurarUsuarioModalComponent', () => {
  let component: ConfigurarUsuarioModalComponent;
  let fixture: ComponentFixture<ConfigurarUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
