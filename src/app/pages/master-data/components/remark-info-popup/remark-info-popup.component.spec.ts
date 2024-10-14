import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkInfoPopupComponent } from './remark-info-popup.component';

describe('RemarkInfoPopupComponent', () => {
  let component: RemarkInfoPopupComponent;
  let fixture: ComponentFixture<RemarkInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkInfoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
