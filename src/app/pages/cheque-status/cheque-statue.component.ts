import { Component, ViewChild } from '@angular/core';
import { ChequeStatueService } from './cheque-statue.service';
import { DxTextBoxComponent } from 'devextreme-angular';
import { cloneDeep } from 'lodash';
import { BaseUtil } from '@shared/utils/base.util';

@Component({
  selector: 'app-cheque-statue',
  templateUrl: './cheque-statue.component.html',
  styleUrls: ['./cheque-statue.component.scss']
})
export class ChequeStatueComponent {

  selectedInfo: any = {};
  dataFilter: any = {};
  @ViewChild('txtBankCode') txtBankCode: DxTextBoxComponent;
  constructor(private dataService: ChequeStatueService,public baseUtil: BaseUtil) {
  }

  getData() {
    this.dataService.getData(this.dataFilter).subscribe((res: any) => {
      this.selectedInfo = {};
      this.selectedInfo = res ? res : {};
      this.baseUtil.hideLoader();
      console.log('res',res)
      if(!res){
        this.baseUtil.alertWarning("ไม่พบข้อมูล");
      }
      
    });
  }
  searchClick(event: any) {
    this.baseUtil.showLoader();
    this.getData();
  }
}
