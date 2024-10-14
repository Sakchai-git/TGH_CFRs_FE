import { TestBed } from '@angular/core/testing';

import { AutoReconcileService } from './auto-reconcile.service';

describe('AutoReconcileService', () => {
  let service: AutoReconcileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoReconcileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
