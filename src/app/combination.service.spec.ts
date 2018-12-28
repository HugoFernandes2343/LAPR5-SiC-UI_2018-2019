import { TestBed } from '@angular/core/testing';

import { CombinationService } from './combination.service';

describe('CombinationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombinationService = TestBed.get(CombinationService);
    expect(service).toBeTruthy();
  });
});
