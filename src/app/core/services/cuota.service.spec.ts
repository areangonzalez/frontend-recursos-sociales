import { TestBed } from '@angular/core/testing';

import { CuotaService } from './cuota.service';

describe('CuotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuotaService = TestBed.get(CuotaService);
    expect(service).toBeTruthy();
  });
});
