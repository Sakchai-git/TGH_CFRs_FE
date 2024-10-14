import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoReconcileComponent } from './auto-reconcile.component';

describe('AutoReconcileComponent', () => {
  let component: AutoReconcileComponent;
  let fixture: ComponentFixture<AutoReconcileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoReconcileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoReconcileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
