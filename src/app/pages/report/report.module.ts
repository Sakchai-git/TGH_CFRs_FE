import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportReconcileBudgetComponent } from './report-reconcile-budget/report-reconcile-budget.component';
import { SharedModule } from '@shared/shared.module';
import { DxFileUploaderModule, DxSelectBoxModule, DxDataGridModule, DxPopupModule, DxTemplateModule, DxPopoverModule, DxTabsModule } from 'devextreme-angular';
import { ReportStatementOutstandingComponent } from './report-statement-outstanding/report-statement-outstanding.component';
import { ReportGlOutstandingComponent } from './report-gl-outstanding/report-gl-outstanding.component';
import { ReportBalanceSheetComponent } from './report-balance-sheet/report-balance-sheet.component';
import { ReportKtbTransferComponent } from './report-ktb-transfer/report-ktb-transfer.component';
import { ReportMediaClearingComponent } from './report-media-clearing/report-media-clearing.component';


@NgModule({
  declarations: [
    ReportReconcileBudgetComponent,
    ReportStatementOutstandingComponent,
    ReportGlOutstandingComponent,
    ReportBalanceSheetComponent,
    ReportKtbTransferComponent,
    ReportMediaClearingComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule,
    DxPopoverModule,
    DxTabsModule
  ]
})
export class ReportModule { }
