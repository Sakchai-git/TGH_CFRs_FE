import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcLoaderComponent } from './uc-loader.component';

describe('UcLoaderComponent', () => {
  let component: UcLoaderComponent;
  let fixture: ComponentFixture<UcLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
