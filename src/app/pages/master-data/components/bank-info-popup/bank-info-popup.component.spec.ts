import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoPopupComponent } from './bank-info-popup.component';

describe('BankInfoPopupComponent', () => {
  let component: BankInfoPopupComponent;
  let fixture: ComponentFixture<BankInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankInfoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
