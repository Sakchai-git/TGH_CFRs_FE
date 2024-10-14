import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';
import { RunBatchManualHistoryPopupComponent } from './components/run-batch-manual-history-popup/run-batch-manual-history-popup.component';
import { each, find, filter } from 'lodash';
import { RunBatchManualService } from './run-batch-manual.service';
import { MasterService } from '@shared/service/master.service';
import * as _ from 'lodash';
import { Observable, ObservedValueOf, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-run-batch-manual',
  templateUrl: './run-batch-manual.component.html',
  styleUrls: ['./run-batch-manual.component.scss'],
})
export class RunBatchManualComponent implements OnInit {
  @ViewChild('runBatchHistoryPopup', { static: true })
  autoReconcileHistoryPopup: RunBatchManualHistoryPopupComponent | undefined;
  @ViewChild('dxDataGridList', { static: false })
  dxDataGridList: DxDataGridComponent;

  menuCode = 'RUN-BATCH-MANUAL';
  dataMonth: any = [];
  dataYear: any = [];
  dataSystem: any = [];
  dataFilter: any = {};

  dataList: any = [];
  dataRunning: any = [];
  dataRunningPrevious: any = [];
  popupVisible: boolean = true;
  emailButtonOptions: any;

  closeButtonOptions: any;

  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private dataService: RunBatchManualService,
    private masterService: MasterService
  ) {
    this.dataMonth = this.baseUtil.getMonth();
    this.dataYear = this.baseUtil.getYear();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // this.popupAdd!.dataMonth = this.dataMonth;
    // this.popupAdd!.dataYear = this.dataYear;
    this.baseUtil.showLoader();
    this.masterService.getSystem().subscribe((resSystem: any) => {
      this.dataSystem = resSystem;
      // this.infoPopup!.dataBank = this.dataBank;
      this.getData();
    });
  }

  getData() {
    this.dataRunningPrevious = _.cloneDeep(this.dataRunning);
    this.dataService.getData(this.dataFilter).subscribe((res: any) => {
      this.dataList = res;
      each(this.dataList, (item, index: number) => {
        // item.year = item.year + 543;
        // item.createDatetimeDisplay = this.baseUtil.getDatetimeDisplay(
        //   item.createDatetime
        // );
        // item.updateDatetimeDisplay = this.baseUtil.getDatetimeDisplay(
        //   item.updateDatetime
        // );
        item.monthName = this.baseUtil.getMonthName(
          item.monthId,
          this.dataMonth
        );

        item.isRunning = this.checkRunningStatus(item);
      });

      this.baseUtil.hideLoader();

      // แสดง message เมื่อทำการ run เสร็จ
      // กรณีกด Run มากกว่า 1 ระบบจะรอให้ run เสร็จทั้งหมดแล้วค่อยแสดง message)
      if (
        this.dataRunningPrevious.length > 0 &&
        this.dataRunning.length === 0
      ) {
        this.baseUtil.alertSaveSuccess();
      }
    });
  }

  checkRunningStatus(dataItem: any) {
    let isRunning = false;
    if (this.dataRunning.length > 0) {
      const matchDataRow = this.dataRunning.find((item: any) => {
        return (
          item.id === dataItem.id &&
          item.year === dataItem.year &&
          item.monthId === dataItem.monthId &&
          item.systemId === dataItem.systemId
        );
      });
      if (matchDataRow) {
        if (dataItem.status !== 'In progress') {
          _.remove(this.dataRunning, matchDataRow);
        } else {
          isRunning = true;
        }
      }
    }
    return isRunning;
  }

  setRunningData(selectedData: any) {
    var dataIndex = _.findIndex(this.dataList, selectedData);
    this.dataList[dataIndex]['isRunning'] = true;
    this.dataRunning.push(_.cloneDeep(this.dataList[dataIndex]));
  }

  removeRunningData(selectedData: any) {
    _.remove(this.dataRunning, selectedData);
  }

  checkCanEdit() {
    return this.baseUtil.checkPermissionEdit(
      this.authService.userPermissions,
      this.menuCode
    );
  }

  searchClick(event: any) {
    this.baseUtil.showLoader();
    this.getData();
  }

  onExporting(e: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx'
        );
      });
    });
  }

  runAutoReconcileClick(data: any) {
    this.baseUtil.alertConfirm(
      `ระบบ ${data.systemName} เดือน ${data.monthName} ${data.year} ใช่หรือไม่?`,
      `คุณต้องการ Run Batch `,
      () => {
        this.dataService.save(data).subscribe({
          next: (res: any) => {
            // this.dataService.run(res).subscribe();
            // this.getData();
            // this.baseUtil.alertSaveSuccess();

            this.dataService.run(res).subscribe({
              next: (res) => {
                this.getData();
              },
              error: (error) => {
                this.baseUtil.alertError(error?.message, 'Running Result!');
                this.removeRunningData(data);
                this.getData();
              },
            });

            this.setRunningData(data);
          },
          error: (error: any) => {
            this.baseUtil.alertError(
              error?.message,
              'ไม่สามารถทำการ Run Batch ได้'
            );
          },
        });
      },
      () => {}
    );
  }
  viewHistoryClick(data: any) {
    this.autoReconcileHistoryPopup?.show(data);
  }
}
