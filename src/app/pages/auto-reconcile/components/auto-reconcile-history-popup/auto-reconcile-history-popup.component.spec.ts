import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoReconcileHistoryPopupComponent } from './auto-reconcile-history-popup.component';

describe('AutoReconcileHistoryPopupComponent', () => {
  let component: AutoReconcileHistoryPopupComponent;
  let fixture: ComponentFixture<AutoReconcileHistoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoReconcileHistoryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoReconcileHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
