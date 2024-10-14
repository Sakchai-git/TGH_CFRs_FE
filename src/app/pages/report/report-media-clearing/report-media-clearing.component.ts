import { Component } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { ReportService } from '../report.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MasterService } from '@shared/service/master.service';

@Component({
  selector: 'app-report-media-clearing',
  templateUrl: './report-media-clearing.component.html',
  styleUrls: ['./report-media-clearing.component.scss']
})
export class ReportMediaClearingComponent {
  menuCode = 'REPORT-MEDIA-CLEARING';
  dataMonth: any = [];
  dataYear: any = [];
  dataReportType: any = [];
  dataBank: any = [];
  dataFilter: any = {};

  constructor(public baseUtil: BaseUtil, private dataService: ReportService,
    private masterService: MasterService) {
    this.dataMonth = this.baseUtil.getMonth();
    this.dataYear = this.baseUtil.getYear();
    this.dataReportType = this.baseUtil.getReportType();
    this.dataFilter.year = moment().year();
  }

  ngOnInit(): void {
    this.masterService.getBank().subscribe((resBank: any) => {
      this.dataBank = resBank;
      this.dataFilter.bankShortName = "KBANK";
    });
  }

  downloadReportFile() {
    this.baseUtil.showLoader();
    this.dataService
      .downloadReportFile(this.dataFilter, 'media-clearing')
      .subscribe({
        next: (response: any) => {
          this.baseUtil.hideLoader();
          const fileName = `ค่าธรรมเนียมเงินโอน ${this.dataFilter.bankShortName} ${this.dataFilter?.month?.name} ${this.dataFilter.year}.${this.dataFilter.reportType}`;
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
    if (!this.dataFilter.bankShortName) {
      this.baseUtil.alertWarning('กรุณาเลือกธนาคาร', 'Validation');
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
