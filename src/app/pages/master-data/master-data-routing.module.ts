import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { KtbBranchComponent } from './ktb-branch/ktb-branch.component';
import { RemarkComponent } from './remark/remark.component';
import { PermissionGuard } from '@shared/guards/permission.guard';

const routes: Routes = [
  {
    path: 'bank',
    component: BankComponent,
    data: {
      menuCode: 'BANK',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'ktb-branch',
    component: KtbBranchComponent,
    data: {
      menuCode: 'KTB-BRANCH',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'remark',
    component: RemarkComponent,
    data: {
      menuCode: 'REMARK',
    },
    canActivate: [PermissionGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
