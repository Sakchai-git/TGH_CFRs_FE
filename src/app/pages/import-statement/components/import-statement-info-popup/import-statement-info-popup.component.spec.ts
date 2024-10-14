import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStatementInfoPopupComponent } from './import-statement-info-popup.component';

describe('ImportStatementInfoPopupComponent', () => {
  let component: ImportStatementInfoPopupComponent;
  let fixture: ComponentFixture<ImportStatementInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportStatementInfoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportStatementInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
