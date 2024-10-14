import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeStatueComponent } from './cheque-statue.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DxDataGridModule,
  DxFileUploaderModule,
  DxPopoverModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { UserControlModule } from 'src/app/share/user-control/user-control.module';
import { PermissionGuard } from '@shared/guards/permission.guard';

@NgModule({
  declarations: [ChequeStatueComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChequeStatueComponent,
        data: {
          menuCode: 'CHEQUE-STATUS',
        },
        canActivate: [PermissionGuard],
      },
    ]),
    UserControlModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule,
    DxPopoverModule,
  ],
})
export class ChequeStatusModule {}
