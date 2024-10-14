import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { GlComponent } from './gl/gl.component';
import { RunBatchManualComponent } from './run-batch-manual/run-batch-manual.component';
import {
  DxFileUploaderModule,
  DxSelectBoxModule,
  DxDataGridModule,
  DxPopupModule,
  DxTemplateModule,
  DxPopoverModule,
  DxTextBoxModule,
  DxScrollViewModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxButtonModule,
} from 'devextreme-angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RunBatchManualHistoryPopupComponent } from './run-batch-manual/components/run-batch-manual-history-popup/run-batch-manual-history-popup.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [GlComponent, RunBatchManualComponent, RunBatchManualHistoryPopupComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule,
    DxPopoverModule,
    DxTextBoxModule,
    NgbDropdownModule,
    DxScrollViewModule,
    DxValidationGroupModule,
    DxValidatorModule,
    SharedModule,
    DxButtonModule
  ],
})
export class BatchModule {}
