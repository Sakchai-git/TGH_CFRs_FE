import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatementOutstandingComponent } from './report-statement-outstanding.component';

describe('ReportStatementOutstandingComponent', () => {
  let component: ReportStatementOutstandingComponent;
  let fixture: ComponentFixture<ReportStatementOutstandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStatementOutstandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStatementOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
