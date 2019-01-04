import { TestBed } from '@angular/core/testing';

import { OrdersService } from './order.service';

describe('OrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });
});
