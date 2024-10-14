import { MenuService } from './../../../../shared/service/menu.service';
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
  DxTreeListComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { BaseUtil } from '@shared/utils/base.util';
import { UserGroupService } from './../../user-group/user-group.service';
import { UserService } from '../../user/user.service';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'user-group-info-popup',
  templateUrl: './user-group-info-popup.component.html',
  styleUrls: ['./user-group-info-popup.component.scss'],
})
export class UserGroupInfoPopupComponent {
  @ViewChild('dxPopupInfo', { static: true }) dxPopupInfo:
    | DxPopupComponent
    | undefined;
  @ViewChild('formValidator', { static: false }) formValidator:
    | DxValidationGroupComponent
    | undefined;
  @ViewChild('dxTreeList', { static: false }) dxTreeList:
    | DxTreeListComponent
    | undefined;

  @Input() isCanEdit = false;
  @Output() afterSaved: EventEmitter<any> = new EventEmitter<any>();

  infoID: number;
  selectedInfo: any = {};
  dataUser: any = [];
  dataPermission: any = [];
  dataMenu: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private userGroupService: UserGroupService,
    private userService: UserService,
    private menuService: MenuService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setDefaultData();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  setDefaultData() {
    this.selectedInfo.id = 0;
    this.selectedInfo.users = [];
    this.generatePermissionData();
  }

  generatePermissionData(userPermissions?: any) {
    if (this.dataMenu && this.dataMenu.length > 0) {
      const permissions = _.cloneDeep(this.dataMenu);
      if (userPermissions) {
        // กรณี Edit
        permissions.map((item: any) => {
          const currentPermission = userPermissions.find(
            (row: any) => row.menuId === item.menuId
          );
          item.isView = currentPermission ? currentPermission.isView : true;
          item.isEdit = currentPermission ? currentPermission.isEdit : true;
        });
      } else {
        // กรณี New
        permissions.map((item: any) => {
          item.isView = true;
          item.isEdit = true;
        });
      }

      this.dataPermission = _.cloneDeep(permissions);
    }
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
    forkJoin({
      user: this.userService.getData(),
      menu: this.menuService.getData(),
    }).subscribe({
      next: (response: any) => {
        // กำหนดข้อมูลแก้ไขกรณีที่ API ยังไม่ return มา
        response.user.map((item: any) => {
          if (!item.fullName) {
            item.fullName = `${item.firstName} ${item.lastName}`;
          }
        });
        this.dataUser = response.user;

        // กำหนดข้อมูล menuId และ menuName
        response.menu.map((item: any) => {
          item.menuId = item.id;
          item.menuName = item.name;
        });
        this.dataMenu = response.menu;

        if (callback) {
          callback();
        }
      },
    });
  }

  doLoadData() {
    this.userGroupService
      .getDataById({
        id: this.infoID,
      })
      .subscribe({
        next: (response: any) => {
          this.selectedInfo = response || {};
          this.generatePermissionData(response.permissons);
        },
        error: (error) => {},
      });
  }

  doSave() {
    this.baseUtil.showLoader();
    const data = {
      ...this.selectedInfo,
      permissons: this.dataPermission,
    };
    this.userGroupService.save(data).subscribe({
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
    this.infoID = (data && data.id) || null;
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
    this.dataUser = [];
    this.dataMenu = [];
    this.dataPermission = [];
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

  permissionSwitchChanged(event: any, option: any) {
    console.log('permissionSwitchChanged', event, option);
    this.dataPermission[option.rowIndex][option.column.name] = event.value;
  }
}
