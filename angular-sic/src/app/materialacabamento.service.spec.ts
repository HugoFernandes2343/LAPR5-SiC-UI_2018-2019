import { TestBed } from '@angular/core/testing';

import { MaterialacabamentoService } from './materialacabamento.service';

describe('MaterialacabamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialacabamentoService = TestBed.get(MaterialacabamentoService);
    expect(service).toBeTruthy();
  });
});
