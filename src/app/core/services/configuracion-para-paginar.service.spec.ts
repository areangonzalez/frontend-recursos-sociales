import { TestBed } from '@angular/core/testing';

import { ConfiguracionParaPaginarService } from './configuracion-para-paginar.service';

describe('ConfiguracionParaPaginarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracionParaPaginarService = TestBed.get(ConfiguracionParaPaginarService);
    expect(service).toBeTruthy();
  });
});
