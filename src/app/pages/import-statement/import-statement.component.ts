import { Component, OnInit, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import * as moment from 'moment';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import {
  DxDataGridComponent,
  DxPopupComponent,
  DxSelectBoxComponent,
} from 'devextreme-angular';
import { ImportStatementInfoPopupComponent } from './components/import-statement-info-popup/import-statement-info-popup.component';
import { ImportStatementService } from './import-statement.service';
import { cloneDeep, each, find, findIndex, replace, split } from 'lodash';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { MasterService } from '@shared/service/master.service';
@Component({
  selector: 'app-import-statement',
  templateUrl: './import-statement.component.html',
  styleUrls: ['./import-statement.component.scss'],
})
export class ImportStatementComponent implements OnInit {
  @ViewChild('importStatementInfoPopup', { static: true }) infoPopup:
    | ImportStatementInfoPopupComponent
    | undefined;

  menuCode = 'IMPORT-STATEMENT';
  dataMonth: any = [];
  dataYear: any = [];
  dataBank: any = [];
  dataFilter: any = {};

  data: any = [];
  popupVisible: boolean = true;
  emailButtonOptions: any;

  closeButtonOptions: any;
  dataAddEdit: any = {};
  @ViewChild('popupAdd') popupAdd: DxPopupComponent;
  @ViewChild('dxDataGridList', { static: false })
  dxDataGridList: DxDataGridComponent;
  @ViewChild('dxSelectBoxYear', { static: false })
  dxSelectBoxYear: DxSelectBoxComponent;
  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private dataService: ImportStatementService,
    private masterService: MasterService
  ) {
    this.dataMonth = this.baseUtil.getMonth();
    this.dataYear = this.baseUtil.getYear();
    this.dataFilter.year = moment().year();

    this.dataFilter.monthId = moment().month() + 1;
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.baseUtil.showLoader();

    this.infoPopup!.dataMonth = this.dataMonth;
    this.infoPopup!.dataYear = this.dataYear;
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
      kbank2.bankShortName = replace(kbank2.bankShortName, 'ขารับ', 'ขาจ่าย');
      this.dataBank.splice(kbankIndex + 1, 0, kbank2);
      this.infoPopup!.dataBank = this.dataBank;
      this.getData();
    });
  }

  getData() {
    this.dataService.getData(this.dataFilter).subscribe(
      (res: any) => {
        this.data = res;
        each(this.data, (item, index) => {
          item.year = item.year;

          item.monthName = this.baseUtil.getMonthName(
            item.monthId,
            this.dataMonth
          );
          item.bankShortName = this.baseUtil.getBankShortName(
            item.bankId,
            this.dataBank
          );

          const dataPath = split(item.pathLocal, '\\');
          if (dataPath.length) {
            item.fileName = dataPath[dataPath.length - 1];
          }
        });

        this.baseUtil.hideLoader();
      },
      (error: any) => {
        this.baseUtil.hideLoader();
      }
    );
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
  checkCanEdit() {
    return this.baseUtil.checkPermissionEdit(
      this.authService.userPermissions,
      this.menuCode
    );
  }
  onExporting(e: any) {
    console.log('aaaa')
    const workbook = new Workbook();
      const worksheet = workbook.addWorksheet(`${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`);
      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            `Import Statement เดือน ${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`
          );
        });
      });
  }
  editClick(event: any) {
    console.log('this.popupVisible', this.popupVisible);
    if (this.popupAdd) {
      this.popupAdd.visible = true;
    }
  }

  newClick() {
    this.infoPopup?.show({});
  }

  searchClick(event: any) {
    this.baseUtil.showLoader();
    this.getData();
  }
  importClick(data: any) {
    if (data) {
      this.dataFilter.year = data.year;
      this.dataFilter.monthId = data.monthId;
      const dataO = find(this.dataBank, { bankShortName: data.bankShortName });
      if (dataO) {
        this.dataFilter.bankId = dataO.bankId;
      }
    }
    this.getData();
  }

  deleteClick() {
    if (this.validateDownload()) {
      this.baseUtil.alertConfirm(`ยืนยันการลบข้อมูล Statement ${this.dataFilter?.bank?.bankShortName} ${this.dataFilter?.month?.name} ${this.dataFilter.year}`, 'Delete !', () => {
        this.doDelete();
      });
    }

  }

  doDelete() {
    this.dataService
      .delete(this.dataFilter)
      .subscribe({
        next: () => {
          this.baseUtil.alertSaveSuccess();
          this.getData();
        },
        error: (error: any) => {
          this.baseUtil.alertSaveError(error);
          this.baseUtil.hideLoader();
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
  // onExporting() {
  //   if (this.dataFilter.systemCode) {

  //     // const workbook = new Workbook();
  //     // const worksheet = workbook.addWorksheet(`${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`);
  //     // exportDataGrid({
  //     //   component: e.component,
  //     //   worksheet,
  //     //   autoFilterEnabled: true,
  //     // }).then(() => {
  //     //   workbook.xlsx.writeBuffer().then((buffer) => {
  //     //     saveAs(
  //     //       new Blob([buffer], { type: 'application/octet-stream' }),
  //     //       `${this.dataFilter.systemCode} เดือน ${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`
  //     //     );
  //     //   });
  //     // });
  //     this.baseUtil.showLoader();

  //     this.dataFilter.isExport = 1;
  //     // this.dataService.downloadReportFile(this.dataFilter, 'excel').subscribe({
  //     //   next: (response: any) => {
  //     //     this.baseUtil.hideLoader();
  //     //     const fileName = `${this.dataFilter.systemCode} เดือน ${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`;
  //     //     this.baseUtil.downloadFile(response, fileName);
  //     //   },
  //     //   error: (error: any) => {
  //     //     this.baseUtil.hideLoader();
  //     //     this.baseUtil.alertDownloadError();
  //     //   },
  //     // });
  //   }

  // }
}
