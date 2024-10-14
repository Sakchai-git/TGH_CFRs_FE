import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@shared/guards/permission.guard';
import { ReportBalanceSheetComponent } from './report-balance-sheet/report-balance-sheet.component';
import { ReportKtbTransferComponent } from './report-ktb-transfer/report-ktb-transfer.component';
import { ReportReconcileBudgetComponent } from './report-reconcile-budget/report-reconcile-budget.component';
import { ReportGlOutstandingComponent } from './report-gl-outstanding/report-gl-outstanding.component';
import { ReportStatementOutstandingComponent } from './report-statement-outstanding/report-statement-outstanding.component';
import { ReportMediaClearingComponent } from './report-media-clearing/report-media-clearing.component';

const routes: Routes = [
  {
    path: 'report-balance-sheet',
    component: ReportBalanceSheetComponent,
    data: {
      menuCode: 'REPORT-BALANCE-SHEET',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'report-ktb-transfer',
    component: ReportKtbTransferComponent,
    data: {
      menuCode: 'REPORT-KTB-TRANSFER',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'report-media-clearing',
    component: ReportMediaClearingComponent,
    data: {
      menuCode: 'REPORT-MEDIA-CLEARING',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'report-reconcile-budget',
    component: ReportReconcileBudgetComponent,
    data: {
      menuCode: 'REPORT-RECONCILE-BUDGET',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'report-statement-outstanding',
    component: ReportStatementOutstandingComponent,
    data: {
      menuCode: 'REPORT-STATEMENT-OUTSTANDING',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'report-gl-outstanding',
    component: ReportGlOutstandingComponent,
    data: {
      menuCode: 'REPORT-GL-OUTSTANDING',
    },
    canActivate: [PermissionGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
