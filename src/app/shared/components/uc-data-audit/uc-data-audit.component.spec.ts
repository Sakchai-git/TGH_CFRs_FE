import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcDataAuditComponent } from './uc-data-audit.component';

describe('UcDataAuditComponent', () => {
  let component: UcDataAuditComponent;
  let fixture: ComponentFixture<UcDataAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcDataAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcDataAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
