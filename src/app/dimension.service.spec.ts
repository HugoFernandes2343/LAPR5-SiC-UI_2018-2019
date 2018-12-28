import { TestBed } from '@angular/core/testing';

import { DimensionService } from './dimension.service';

describe('DimensionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DimensionService = TestBed.get(DimensionService);
    expect(service).toBeTruthy();
  });
});
