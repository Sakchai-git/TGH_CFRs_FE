import { TestBed } from '@angular/core/testing';

import { RunBatchManualService } from './run-batch-manual.service';

describe('RunBatchManualService', () => {
  let service: RunBatchManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunBatchManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
