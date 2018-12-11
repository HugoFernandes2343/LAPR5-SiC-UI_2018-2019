import { TestBed } from '@angular/core/testing';

import { GerirencomendasasService } from './gerirencomendasas.service';

describe('GerirencomendasasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GerirencomendasasService = TestBed.get(GerirencomendasasService);
    expect(service).toBeTruthy();
  });
});
