import { Component, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import * as moment from 'moment';
import { GlService } from './gl.service';
import { cloneDeep, each } from 'lodash';
import { DxDataGridComponent, DxSelectBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { BaseUtil } from '@shared/utils/base.util';
import { MasterService } from '@shared/service/master.service';
@Component({
  selector: 'app-gl',
  templateUrl: './gl.component.html',
  styleUrls: ['./gl.component.scss'],
})
export class GlComponent {
  data: any = [];
  dataMonth: any = [];
  dataYear: any = [];
  dataSystem: any = [];

  popupFilterVisible = false;
  dataFilter: any = {};
  gridPaging: any = {
    page: 1,
    pageSize: 10,
  };
  validateResult: any = { isValid: true };
  @ViewChild('dxDataGridList', { static: false })
  dxDataGridList: DxDataGridComponent;
  @ViewChild('dxSelectBoxYear', { static: false })
  dxSelectBoxYear: DxSelectBoxComponent;
  @ViewChild('targetGroup', { static: true }) validationGroup: DxValidationGroupComponent;
  constructor(public baseUtil: BaseUtil, private dataService: GlService,
    private masterService: MasterService) {
    this.dataMonth = this.baseUtil.getMonth();
    this.dataYear = this.baseUtil.getYear();
    this.dataFilter.year = moment().year()// + 543;

    // console.log('this.dataFilter.year', this.dataFilter.year);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataFilter.monthId = moment().month() + 1;
    }, 50);
    
  }
  ngAfterViewInit(): void {
    // this.popupAdd!.dataMonth = this.dataMonth;
    // this.popupAdd!.dataYear = this.dataYear;
    this.baseUtil.showLoader();
    this.masterService.getSystem().subscribe((resSystem: any) => {
      this.dataSystem = resSystem;
      this.baseUtil.hideLoader();
    });
  }
  onExporting() {
    if (this.dataFilter.systemCode) {

      // const workbook = new Workbook();
      // const worksheet = workbook.addWorksheet(`${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`);
      // exportDataGrid({
      //   component: e.component,
      //   worksheet,
      //   autoFilterEnabled: true,
      // }).then(() => {
      //   workbook.xlsx.writeBuffer().then((buffer) => {
      //     saveAs(
      //       new Blob([buffer], { type: 'application/octet-stream' }),
      //       `${this.dataFilter.systemCode} เดือน ${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`
      //     );
      //   });
      // });
      this.baseUtil.showLoader();

      this.dataFilter.isExport = 1;
      this.dataService.downloadReportFile(this.dataFilter, 'excel').subscribe({
        next: (response: any) => {
          this.baseUtil.hideLoader();
          const fileName = `${this.dataFilter.systemCode} เดือน ${this.dataFilter.monthSelect?.name} ${this.dataFilter.year}.xlsx`;
          this.baseUtil.downloadFile(response, fileName);
        },
        error: (error: any) => {
          this.baseUtil.hideLoader();
          this.baseUtil.alertDownloadError();
        },
      });
    }

  }

  closeClick() {
    
    this.popupFilterVisible = false;
  }
  getData() {
    this.baseUtil.showLoader();

    this.dataFilter.skip = this.gridPaging.page - 1;
    this.dataFilter.take = this.gridPaging.pageSize;
    this.dataFilter.isExport = 0;
    this.dataService.getData(this.dataFilter).subscribe({
      next: (res: any) => {
        this.data = res.vWTSourceImports || [];
        this.gridPaging.total = res.total;
        // console.log('data', this.data);

        this.baseUtil.hideLoader();
      },
      error: (error) => {
        // console.log('error', error)
        // this.baseUtil.alertError(error?.error
        //   , "Error ระบบ")
        this.baseUtil.hideLoader();
      },
    });
  }
  searchClick(event: any) {
    if (this.validationGroup && this.validationGroup.instance) {
      this.validateResult = this.validationGroup.instance.validate();
      if (this.validateResult.isValid) {

        this.gridPaging.page = 1;
        this.dataFilter.total = 0;
        this.getData();
      } else {
        this.validateResult.brokenRules[0].validator.focus();
      }
    }
  }
  gridPageChange(paging: number) {
    this.gridPaging = paging;
    this.getData();
  }

}
