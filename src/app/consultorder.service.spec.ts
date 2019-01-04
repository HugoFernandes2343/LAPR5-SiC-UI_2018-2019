import { TestBed } from '@angular/core/testing';

import { ConsultOrderService } from './consultorder.service';

describe('ConsultOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultOrderService = TestBed.get(ConsultOrderService);
    expect(service).toBeTruthy();
  });
});
