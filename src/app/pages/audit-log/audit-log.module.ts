import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { PermissionGuard } from '@shared/guards/permission.guard';
import { AuditLogComponent } from './audit-log.component';

@NgModule({
  declarations: [AuditLogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuditLogComponent,
        data: {
          menuCode: 'AUDIT-LOG',
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
export class AuditLogModule {}
