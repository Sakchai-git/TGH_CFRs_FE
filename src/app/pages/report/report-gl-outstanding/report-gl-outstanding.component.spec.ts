import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGlOutstandingComponent } from './report-gl-outstanding.component';

describe('ReportGlOutstandingComponent', () => {
  let component: ReportGlOutstandingComponent;
  let fixture: ComponentFixture<ReportGlOutstandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGlOutstandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGlOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
