import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunBatchManualComponent } from './run-batch-manual.component';

describe('RunBatchManualComponent', () => {
  let component: RunBatchManualComponent;
  let fixture: ComponentFixture<RunBatchManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunBatchManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunBatchManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
