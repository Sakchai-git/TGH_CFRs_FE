import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DxPopupComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { BaseUtil } from '@shared/utils/base.util';
import { BankService } from '../../bank/bank.service';

@Component({
  selector: 'bank-info-popup',
  templateUrl: './bank-info-popup.component.html',
  styleUrls: ['./bank-info-popup.component.scss'],
})
export class BankInfoPopupComponent {
  @ViewChild('dxPopupInfo', { static: true }) dxPopupInfo:
    | DxPopupComponent
    | undefined;
  @ViewChild('formValidator', { static: false }) formValidator:
    | DxValidationGroupComponent
    | undefined;

  @Input() isCanEdit = false;
  @Output() afterSaved: EventEmitter<any> = new EventEmitter<any>();

  infoID: number;
  selectedInfo: any = {};

  constructor(
    public baseUtil: BaseUtil,
    private bankService: BankService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setDefaultData();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  setDefaultData() {
    this.selectedInfo.bankId = 0;
  }

  onPopupShown(event: any) {
    this.doLoadMasterData(() => {
      if (this.infoID) {
        this.doLoadData();
      } else {
        this.setDefaultData();
      }
    });

    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.option('onHidden', () => {
        this.clearValue();
      });
    }
  }

  doLoadMasterData(callback: any) {
    if (callback) {
      callback();
    }
  }

  doLoadData() {
    this.bankService
      .getDataById({
        bankId: this.infoID,
      })
      .subscribe({
        next: (response) => {
          this.selectedInfo = response || {};
        },
        error: (error) => {},
      });
  }

  doSave() {
    this.baseUtil.showLoader();
    this.bankService.save(this.selectedInfo).subscribe({
      next: () => {
        this.hide();
        this.baseUtil.alertSaveSuccess();
        this.afterSaved.emit();
      },
      error: (error) => {
        this.baseUtil.alertSaveError(error);
      },
    });
  }

  show(data: any = {}) {
    this.infoID = (data && data.bankId) || null;
    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.show();
    }
  }

  hide() {
    if (this.dxPopupInfo) {
      this.dxPopupInfo.instance.hide();
    }
  }

  clearValue() {
    this.selectedInfo = {};
  }

  clearValidator() {
    if (this.formValidator) {
      this.formValidator.instance.reset();
    }
  }

  formValid() {
    const res: any = this.formValidator?.instance.validate();
    const isValid = res?.isValid;
    if (!res?.isValid) {
      res.brokenRules[0].validator.focus();
    }
    return isValid;
  }

  saveClick() {
    if (this.formValid()) {
      this.doSave();
    }
  }

  cancelClick() {
    this.hide();
  }
}
