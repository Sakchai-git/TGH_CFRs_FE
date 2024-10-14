import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeStatueComponent } from './cheque-statue.component';

describe('ChequeStatueComponent', () => {
  let component: ChequeStatueComponent;
  let fixture: ComponentFixture<ChequeStatueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeStatueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequeStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
