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
import { UserService } from './../../user/user.service';
import { UserGroupService } from './../../user-group/user-group.service';

@Component({
  selector: 'user-info-popup',
  templateUrl: './user-info-popup.component.html',
  styleUrls: ['./user-info-popup.component.scss'],
})
export class UserInfoPopupComponent {
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
  dataUserGroup: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private userService: UserService,
    private userGroupService: UserGroupService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setDefaultData();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  setDefaultData() {
    this.selectedInfo.userId = 0;
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
    this.userGroupService.getData().subscribe({
      next: (response) => {
        this.dataUserGroup = response;
        if (callback) {
          callback();
        }
      },
      error: (error) => {},
    });
  }

  doLoadData() {
    this.userService
      .getDataById({
        userId: this.infoID,
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
    this.userService.save(this.selectedInfo).subscribe({
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
    this.infoID = (data && data.userId) || null;
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
    this.dataUserGroup = [];
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
