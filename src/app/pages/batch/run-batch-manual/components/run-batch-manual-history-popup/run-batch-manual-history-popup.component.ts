import { Component, Input, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { DxPopupComponent } from 'devextreme-angular';
import { each } from 'lodash';
import * as moment from 'moment';
import { RunBatchManualService } from '../../run-batch-manual.service';

@Component({
  selector: 'app-run-batch-manual-history-popup',
  templateUrl: './run-batch-manual-history-popup.component.html',
  styleUrls: ['./run-batch-manual-history-popup.component.scss']
})
export class RunBatchManualHistoryPopupComponent {
  @ViewChild('dxPopupInfo', { static: true }) dxPopupInfo:
    | DxPopupComponent
    | undefined;

  data: any = [];
  @Input() autoReconcileId: number = 0;
  constructor(public baseUtil: BaseUtil, private dataService: RunBatchManualService) {

  }
  show(data: any = {}) {
    // this.infoID = (data && data.ID) || null;
    // this.doloadData()
    console.log(data);
    // this.autoReconcileId = data.id;
    this.dataService.getDataDetail({ runBatchId: data.id }).subscribe((res: any) => {
      this.data = res;
      each(this.data, (item) => {
        item.year = data.year;
        item.monthName = data.monthName;
        item.systemName = data.systemName;
      })
      if (this.dxPopupInfo) {
        this.dxPopupInfo.instance.show();
      }
    })

  }

  hide() {
    // this.clearValue();
    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.hide();
    }
  }

  okClick() {
    this.hide();
  }

  cancelClick() { }
}
