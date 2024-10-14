import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBalanceSheetComponent } from './report-balance-sheet.component';

describe('ReportBalanceSheetComponent', () => {
  let component: ReportBalanceSheetComponent;
  let fixture: ComponentFixture<ReportBalanceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBalanceSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
