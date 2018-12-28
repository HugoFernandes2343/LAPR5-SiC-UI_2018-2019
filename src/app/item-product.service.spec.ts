import { TestBed } from '@angular/core/testing';

import { ItemProductService } from './item-product.service';

describe('ItemProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemProductService = TestBed.get(ItemProductService);
    expect(service).toBeTruthy();
  });
});
