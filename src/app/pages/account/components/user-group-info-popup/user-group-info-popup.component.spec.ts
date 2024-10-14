import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupInfoPopupComponent } from './user-group-info-popup.component';

describe('UserGroupInfoPopupComponent', () => {
  let component: UserGroupInfoPopupComponent;
  let fixture: ComponentFixture<UserGroupInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupInfoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
