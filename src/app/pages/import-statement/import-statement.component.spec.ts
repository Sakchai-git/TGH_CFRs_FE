import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStatementComponent } from './import-statement.component';

describe('ImportStatementComponent', () => {
  let component: ImportStatementComponent;
  let fixture: ComponentFixture<ImportStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
