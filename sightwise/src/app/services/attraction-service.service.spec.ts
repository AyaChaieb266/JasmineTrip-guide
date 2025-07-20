import { TestBed } from '@angular/core/testing';

import { AttractionServiceService } from './attraction-service.service';

describe('AttractionServiceService', () => {
  let service: AttractionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttractionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
