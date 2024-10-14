import { TestBed } from '@angular/core/testing';

import { ImportStatementService } from './import-statement.service';

describe('ImportStatementService', () => {
  let service: ImportStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
