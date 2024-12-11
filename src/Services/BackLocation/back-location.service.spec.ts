import { TestBed } from '@angular/core/testing';

import { BackLocationService } from './back-location.service';

describe('BackLocationService', () => {
  let service: BackLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
