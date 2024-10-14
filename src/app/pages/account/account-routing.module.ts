import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { PermissionGuard } from '@shared/guards/permission.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: {
      menuCode: 'USER',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'user-group',
    component: UserGroupComponent,
    data: {
      menuCode: 'USER-GROUP-PERMISSION',
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
