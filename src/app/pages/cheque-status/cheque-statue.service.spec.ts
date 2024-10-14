import { TestBed } from '@angular/core/testing';

import { ChequeStatueService } from './cheque-statue.service';

describe('ChequeStatueService', () => {
  let service: ChequeStatueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequeStatueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
