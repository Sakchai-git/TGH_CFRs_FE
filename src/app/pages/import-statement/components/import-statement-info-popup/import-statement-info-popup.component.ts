import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { DxFileUploaderComponent, DxPopupComponent } from 'devextreme-angular';
import * as moment from 'moment';
import { ImportStatementService } from 'src/app/pages/import-statement/import-statement.service';

@Component({
  selector: 'import-statement-info-popup',
  templateUrl: './import-statement-info-popup.component.html',
  styleUrls: ['./import-statement-info-popup.component.scss'],
})
export class ImportStatementInfoPopupComponent {
  @ViewChild('dxPopupInfo', { static: true }) dxPopupInfo:
    | DxPopupComponent
    | undefined;

  @ViewChild('dxFileUploader', { static: false }) dxFileUploader:
    | DxFileUploaderComponent
    | undefined;

  @Input() dataMonth: any = [];
  @Input() dataYear: any = [];
  @Input() dataBank: any = [];
  @Input() selectedInfo: any = {};
  @Output() importClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public baseUtil: BaseUtil,
    private dataService: ImportStatementService
  ) {
    this.selectedInfo.year = moment().year();
    // let dates = moment().add(-10, 'y');
    // this.dataYear = [''];
    // for (let index = 0; index < 20; index++) {
    //   this.dataYear.push(dates.year() + 543 + index);
    //   dates = moment(dates).add(1, 'M');
    // }
  }

  show(data: any = {}) {
    // this.infoID = (data && data.ID) || null;
    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.show();
      if (this.dxFileUploader) {
        this.dxFileUploader!.value = [];
      }
    }
  }

  hide() {
    // this.clearValue();
    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.hide();
    }
  }

  uploadClick() {
    this.baseUtil.showLoader();
    if (this.dxFileUploader?.value && this.dxFileUploader?.value.length > 0) {
      var formData = new FormData();
      formData.append('fileUpload', this.dxFileUploader?.value[0]);

      console.log('formData', formData);
      this.selectedInfo.BankShortName = this.selectedInfo.bank.bankShortName;
      this.dataService.importData(formData, this.selectedInfo).subscribe({
        next: (res) => {
          console.log(res);
          this.importClick.emit(this.selectedInfo);
          this.baseUtil.alertSaveSuccess();
          this.hide();
        },
        error: (error) => {
          // this.baseUtil.alertSaveError(error);
        },
      });
    }
  }

  cancelClick() {
    this.hide();
  }
}
