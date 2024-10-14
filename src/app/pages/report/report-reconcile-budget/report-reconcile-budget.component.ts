import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DxPopupComponent } from 'devextreme-angular';
import { each, find, split } from 'lodash';
import { MasterService } from '@shared/service/master.service';
import * as _ from 'lodash';
import { AutoReconcileService } from '../../auto-reconcile/auto-reconcile.service';
import { AutoReconcileHistoryPopupComponent } from '../../auto-reconcile/components/auto-reconcile-history-popup/auto-reconcile-history-popup.component';
import { ImportStatementService } from '../../import-statement/import-statement.service';

@Component({
  selector: 'app-report-reconcile-budget',
  templateUrl: './report-reconcile-budget.component.html',
  styleUrls: ['./report-reconcile-budget.component.scss']
})
export class ReportReconcileBudgetComponent {
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
    private dataImportService: ImportStatementService,
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
    this.masterService.getBank().subscribe((resBank: any) => {
      this.dataBank = resBank;
      // this.infoPopup!.dataBank = this.dataBank;
      this.getData();
    });
  }

  getData() {
    this.dataRunningPrevious = _.cloneDeep(this.dataRunning);
    this.dataService.getData(this.dataFilter).subscribe((res: any) => {
      this.dataList = res;
      each(this.dataList, (item, index) => {

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
    const worksheet = workbook.addWorksheet('หน้างบกระทบยอด');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'รายงานหน้างบกระทบยอด.xlsx'
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
      () => {}
    );
  }
  viewHistoryClick(data: any) {
    this.autoReconcileHistoryPopup?.show(data);
  }
}
