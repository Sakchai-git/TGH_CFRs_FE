import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMediaClearingComponent } from './report-media-clearing.component';

describe('ReportMediaClearingComponent', () => {
  let component: ReportMediaClearingComponent;
  let fixture: ComponentFixture<ReportMediaClearingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMediaClearingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMediaClearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
