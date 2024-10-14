import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcReportInformationComponent } from './uc-report-information.component';

describe('UcReportInformationComponent', () => {
  let component: UcReportInformationComponent;
  let fixture: ComponentFixture<UcReportInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcReportInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcReportInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
