import { TestBed } from '@angular/core/testing';

import { PeriodicElementService } from './service.service';

describe('ServiceService', () => {
  let service: PeriodicElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodicElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
