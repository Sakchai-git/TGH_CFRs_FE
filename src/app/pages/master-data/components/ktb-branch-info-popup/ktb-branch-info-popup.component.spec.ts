import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtbBranchInfoPopupComponent } from './ktb-branch-info-popup.component';

describe('KtbBranchInfoPopupComponent', () => {
  let component: KtbBranchInfoPopupComponent;
  let fixture: ComponentFixture<KtbBranchInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KtbBranchInfoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtbBranchInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
