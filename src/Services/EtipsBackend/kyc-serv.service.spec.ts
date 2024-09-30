import { TestBed } from '@angular/core/testing';

import { KycServService } from './kyc-serv.service';

describe('KycServService', () => {
  let service: KycServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
