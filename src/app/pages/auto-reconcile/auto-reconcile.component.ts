import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DxPopupComponent } from 'devextreme-angular';
import { AutoReconcileHistoryPopupComponent } from './components/auto-reconcile-history-popup/auto-reconcile-history-popup.component';
import { AutoReconcileService } from './auto-reconcile.service';
import { cloneDeep, each, find, findIndex, orderBy, replace, split } from 'lodash';
import { ImportStatementService } from '../import-statement/import-statement.service';
import { MasterService } from '@shared/service/master.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-auto-reconcile',
  templateUrl: './auto-reconcile.component.html',
  styleUrls: ['./auto-reconcile.component.scss'],
})
export class AutoReconcileComponent implements OnInit {
  @ViewChild('autoReconcileHistoryPopup', { static: true })
  autoReconcileHistoryPopup: AutoReconcileHistoryPopupComponent | undefined;

  menuCode = 'AUTO-RECONCILE';
  dataMonth: any = [];
  dataYear: any = [];
  dataBank: any = [];
  dataFilter: any = {};

  dataList: any = [];
  dataRunning: any = [];
  dataRunningPrevious: any = [];
  popupVisible: boolean = true;
  emailButtonOptions: any;

  closeButtonOptions: any;
  @ViewChild('popupAdd') popupAdd: DxPopupComponent;
  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private dataService: AutoReconcileService,
    private masterService: MasterService
  ) {
    this.dataMonth = this.baseUtil.getMonth();
    this.dataYear = this.baseUtil.getYear();
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    // this.popupAdd!.dataMonth = this.dataMonth;
    // this.popupAdd!.dataYear = this.dataYear;
    this.baseUtil.showLoader();
    this.masterService.getBank().subscribe((resBank: any) => {
      this.dataBank = resBank;
      let kbank = find(this.dataBank, { bankCode: "004" });
      let kbankIndex = findIndex(this.dataBank, { bankCode: "004" });
      if (kbank) {
        kbank.bankShortName = kbank.bankShortName + ' - ขารับ';
        kbank.kbankTypeId = 1;
      }
      let kbank2 = cloneDeep(kbank);
      kbank2.bankId = kbank2.bankId * 1000;
      kbank2.bankShortName = replace(kbank2.bankShortName,'ขารับ','ขาจ่าย');
      this.dataBank.splice(kbankIndex + 1, 0, kbank2);
      //this.dataBank = orderBy(this.dataBank,'bankShortName','asc');
      // this.infoPopup!.dataBank = this.dataBank;
      this.getData();
    });
  }

  getData() {
    this.dataRunningPrevious = _.cloneDeep(this.dataRunning);
    this.dataService.getData(this.dataFilter).subscribe((res: any) => {
      this.dataList = res;
      each(this.dataList, (item, index) => {
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
          item.bankId === dataItem.bankId
        );
      });
      if (matchDataRow) {
        if (dataItem.status !== 'In progress') {
          this.removeRunningData(matchDataRow);
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

  searchClick(event: any) {
    this.baseUtil.showLoader();
    this.getData();
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      // {
      //   location: "after",
      //   widget: "dxButton",
      //   options: {
      //     icon: "fas fa-arrows-alt-v",
      //     onClick: this.orderContractClick.bind(this),
      //     hint: 'จัดลำดับ'
      //   },
      // },
      // {
      //   location: "after",
      //   widget: "dxButton",
      //   options: {
      //     icon: "fas fa-sync-alt",
      //     onClick: this.retrieveListData.bind(this),
      //     hint: 'รีเฟรช'
      //   },
      // },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'fas fa-plus',
          onClick: this.editClick.bind(this),
          hint: 'เพิ่ม',
        },
      }
    );
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
  checkCanEdit() {
    return this.baseUtil.checkPermissionEdit(
      this.authService.userPermissions,
      this.menuCode
    );
  }
  editClick(event: any) {
    console.log('this.popupVisible', this.popupVisible);
    if (this.popupAdd) {
      this.popupAdd.visible = true;
    }
  }
  runAutoReconcileClick(data: any) {
    this.baseUtil.alertConfirm(
      `เดือน ${data.monthName} ${data.year} ใช่หรือไม่?`,
      `คุณต้องการ Auto Reconcile `,
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
              'ไม่สามารถทำการ Auto Reconcile ได้'
            );
          },
        });
      },
      () => { }
    );
  }
  viewHistoryClick(data: any) {
    this.autoReconcileHistoryPopup?.show(data);
  }

  downloadReportFile() {
    this.baseUtil.showLoader();
    this.dataService
      .downloadReportFile(this.dataFilter)
      .subscribe({
        next: (response: any) => {
          this.baseUtil.hideLoader();
          this.dataFilter.reportType = 'xlsx';
          const fileName = `Auto Reconcile ${this.dataFilter?.bank?.bankShortName} ${this.dataFilter?.month?.name} ${this.dataFilter.year}.${this.dataFilter.reportType}`;//reportType
        this.baseUtil.downloadFile(response, fileName);
        },
        error: (error: any) => {
          this.baseUtil.hideLoader();
          this.baseUtil.alertDownloadError();
        },
      });
  }

  validateDownload() {
    if (!this.dataFilter.year) {
      this.baseUtil.alertWarning('กรุณาเลือกปี', 'Validation');
      return false;
    }
    if (!this.dataFilter.monthId) {
      this.baseUtil.alertWarning('กรุณาเลือกเดือน', 'Validation');
      return false;
    }
    if (!this.dataFilter.bankId) {
      this.baseUtil.alertWarning('กรุณาเลือกธนาคาร', 'Validation');
      return false;
    }
    // if (!this.dataFilter.reportType) {
    //   this.baseUtil.alertWarning('กรุณาเลือกรูปแบบไฟล์', 'Validation');
    //   return false;
    // }
    return true;
  }

  downloadClick(event: any) {
    if (this.validateDownload()) {
      this.downloadReportFile();
    }
  }
  
}
