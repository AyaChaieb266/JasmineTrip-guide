import { TestBed } from '@angular/core/testing';

import { SecuritéServiceService } from './securité-service.service';

describe('SecuritéServiceService', () => {
  let service: SecuritéServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuritéServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
