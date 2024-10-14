import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoReconcileComponent } from './auto-reconcile.component';
import { RouterModule } from '@angular/router';
import {
  DxFileUploaderModule,
  DxSelectBoxModule,
  DxDataGridModule,
  DxPopupModule,
  DxTemplateModule,
  DxPopoverModule,
} from 'devextreme-angular';
import { SharedModule } from '@shared/shared.module';
import { AutoReconcileHistoryPopupComponent } from './components/auto-reconcile-history-popup/auto-reconcile-history-popup.component';
import { PermissionGuard } from '@shared/guards/permission.guard';

@NgModule({
  declarations: [AutoReconcileComponent, AutoReconcileHistoryPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AutoReconcileComponent,
        data: {
          menuCode: 'AUTO-RECONCILE',
        },
        canActivate: [PermissionGuard],
      },
    ]),
    SharedModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule,
    DxPopoverModule,
  ],
})
export class AutoReconcileModule {}
