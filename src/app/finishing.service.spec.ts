import { TestBed } from '@angular/core/testing';

import { FinishingService } from './finishing.service';

describe('FinishingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinishingService = TestBed.get(FinishingService);
    expect(service).toBeTruthy();
  });
});
