import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportStatementComponent } from './import-statement.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DxDataGridModule,
  DxFileUploaderModule,
  DxPopoverModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { UserControlModule } from 'src/app/share/user-control/user-control.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ImportStatementInfoPopupComponent } from './components/import-statement-info-popup/import-statement-info-popup.component';
import { PermissionGuard } from '@shared/guards/permission.guard';

@NgModule({
  declarations: [ImportStatementComponent, ImportStatementInfoPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ImportStatementComponent,
        data: {
          menuCode: 'IMPORT-STATEMENT',
        },
        canActivate: [PermissionGuard],
      },
    ]),
    SharedModule,
  ],
  exports: [ImportStatementInfoPopupComponent],
})
export class ImportStatementModule {}
