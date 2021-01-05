import { TestBed } from '@angular/core/testing';

import { SoporteService } from './soporte.service';

describe('SoporteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoporteService = TestBed.get(SoporteService);
    expect(service).toBeTruthy();
  });
});
