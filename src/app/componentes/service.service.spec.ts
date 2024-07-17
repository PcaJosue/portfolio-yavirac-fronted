import { TestBed } from '@angular/core/testing';

import { CatalogosService } from './catalogos.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServiceService', () => {
  let service: CatalogosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CatalogosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
