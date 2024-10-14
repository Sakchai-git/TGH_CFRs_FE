import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtbBranchComponent } from './ktb-branch.component';

describe('KtbBranchComponent', () => {
  let component: KtbBranchComponent;
  let fixture: ComponentFixture<KtbBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KtbBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtbBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
