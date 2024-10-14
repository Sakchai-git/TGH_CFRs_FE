import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UcLoaderComponent } from './components/uc-loader/uc-loader.component';
import {
  DxLoadPanelModule,
  DxFileUploaderModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxDataGridModule,
  DxTextBoxModule,
  DxPopoverModule,
  DxSwitchModule,
  DxTreeListModule,
  DxTagBoxModule,
  DxFormModule,
  DxDateRangeBoxModule,
} from 'devextreme-angular';
import { UcDataAuditComponent } from './components/uc-data-audit/uc-data-audit.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DataGridPaginationComponent } from './components/data-grid-pagination/data-grid-pagination.component';
import { FormsModule } from '@angular/forms';
import { UcReportInformationComponent } from './components/uc-report-information/uc-report-information.component';

@NgModule({
  declarations: [
    UcLoaderComponent,
    UcDataAuditComponent,
    DataGridPaginationComponent,
    UcReportInformationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxFileUploaderModule,
    DxDataGridModule,
    DxPopupModule,
    DxPopoverModule,
    DxTreeListModule,
    DxSwitchModule,
    DxFormModule,
    DxDateRangeBoxModule,
    NgbPaginationModule,
  ],
  exports: [
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxFileUploaderModule,
    DxDataGridModule,
    DxPopupModule,
    DxPopoverModule,
    DxTreeListModule,
    DxSwitchModule,
    DxFormModule,
    DxDateRangeBoxModule,
    UcLoaderComponent,
    UcDataAuditComponent,
    UcReportInformationComponent,
    DataGridPaginationComponent,
    NgbPaginationModule,
  ],
})
export class SharedModule {}
