import { TestBed } from '@angular/core/testing';

import { PrologService } from './prolog.service';

describe('PrologService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrologService = TestBed.get(PrologService);
    expect(service).toBeTruthy();
  });
});
