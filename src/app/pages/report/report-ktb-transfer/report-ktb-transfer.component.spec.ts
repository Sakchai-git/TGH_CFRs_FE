import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportKtbTransferComponent } from './report-ktb-transfer.component';

describe('ReportKtbTransferComponent', () => {
  let component: ReportKtbTransferComponent;
  let fixture: ComponentFixture<ReportKtbTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportKtbTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportKtbTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
