import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { ReportService } from '../report.service';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import * as moment from 'moment';

@Component({
  selector: 'app-report-balance-sheet',
  templateUrl: './report-balance-sheet.component.html',
  styleUrls: ['./report-balance-sheet.component.scss'],
})
export class ReportBalanceSheetComponent {
  menuCode = 'REPORT-BALANCE-SHEET';
  dataMonth: any = [];
  dataYear: any = [];
  dataReportType: any = [];
  dataFilter: any = {};

  constructor(public baseUtil: BaseUtil, private dataService: ReportService) {
    this.dataMonth = this.baseUtil.getMonth();
    this.dataYear = this.baseUtil.getYear();
    this.dataReportType = this.baseUtil.getReportType();
    this.dataFilter.year = moment().year();
  }

  ngOnInit(): void {}

  downloadReportFile() {
    this.baseUtil.showLoader();
    this.dataService.downloadReportFile(this.dataFilter, 'balance').subscribe({
      next: (response: any) => {
        console.log('dd',response)
        this.baseUtil.hideLoader();
        const fileName = `รายงานงบกระทบยอด ${this.dataFilter?.month?.name} ${this.dataFilter.year}.${this.dataFilter.reportType}`;
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
    if (!this.dataFilter.reportType) {
      this.baseUtil.alertWarning('กรุณาเลือกรูปแบบไฟล์', 'Validation');
      return false;
    }
    return true;
  }

  downloadClick(event: any) {
    if (this.validateDownload()) {
      this.downloadReportFile();
    }
  }
}
