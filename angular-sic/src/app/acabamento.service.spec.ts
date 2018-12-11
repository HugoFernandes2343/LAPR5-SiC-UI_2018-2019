import { TestBed } from '@angular/core/testing';

import { AcabamentoService } from './acabamento.service';

describe('AcabamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcabamentoService = TestBed.get(AcabamentoService);
    expect(service).toBeTruthy();
  });
});
