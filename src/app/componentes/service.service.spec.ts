import { TestBed } from '@angular/core/testing';

import { CatalogosService } from './catalogos.service';

describe('ServiceService', () => {
  let service: CatalogosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
