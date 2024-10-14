import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunBatchManualHistoryPopupComponent } from './run-batch-manual-history-popup.component';

describe('RunBatchManualHistoryPopupComponent', () => {
  let component: RunBatchManualHistoryPopupComponent;
  let fixture: ComponentFixture<RunBatchManualHistoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunBatchManualHistoryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunBatchManualHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
