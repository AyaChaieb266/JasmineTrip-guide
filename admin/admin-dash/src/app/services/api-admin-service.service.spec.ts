import { TestBed } from '@angular/core/testing';

import { ApiAdminServiceService } from './api-admin-service.service';

describe('ApiAdminServiceService', () => {
  let service: ApiAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
