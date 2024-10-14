import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UserComponent } from './user/user.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInfoPopupComponent } from './components/user-info-popup/user-info-popup.component';
import { UserGroupInfoPopupComponent } from './components/user-group-info-popup/user-group-info-popup.component';

@NgModule({
  declarations: [
    UserComponent,
    UserGroupComponent,
    UserInfoPopupComponent,
    UserGroupInfoPopupComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ],
})
export class AccountModule {}
