import { Component, Input, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { DxPopupComponent } from 'devextreme-angular';
import { AutoReconcileService } from '../../auto-reconcile.service';
import { each } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'auto-reconcile-history-popup',
  templateUrl: './auto-reconcile-history-popup.component.html',
  styleUrls: ['./auto-reconcile-history-popup.component.scss'],
})
export class AutoReconcileHistoryPopupComponent {
  @ViewChild('dxPopupInfo', { static: true }) dxPopupInfo:
    | DxPopupComponent
    | undefined;

  data: any = [];
  @Input() autoReconcileId: number = 0;
  constructor(
    public baseUtil: BaseUtil,
    private dataService: AutoReconcileService
  ) {}
  show(data: any = {}) {
    // this.infoID = (data && data.ID) || null;
    // this.doloadData()
    console.log(data);
    // this.autoReconcileId = data.id;
    this.dataService
      .getDataDetail({ autoReconcileId: data.id })
      .subscribe((res: any) => {
        this.data = res;
        each(this.data, (item) => {
          item.year = data.year;
          item.monthName = data.monthName;
        });
        if (this.dxPopupInfo) {
          this.dxPopupInfo.instance.show();
        }
      });
  }

  hide() {
    // this.clearValue();
    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.hide();
    }
  }

  exportClick(data: any) {
    console.log('export', data);
  }

  okClick() {
    this.hide();
  }

  cancelClick() {}
}
