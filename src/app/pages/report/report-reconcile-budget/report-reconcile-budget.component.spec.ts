import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReconcileBudgetComponent } from './report-reconcile-budget.component';

describe('ReportReconcileBudgetComponent', () => {
  let component: ReportReconcileBudgetComponent;
  let fixture: ComponentFixture<ReportReconcileBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReconcileBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportReconcileBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
