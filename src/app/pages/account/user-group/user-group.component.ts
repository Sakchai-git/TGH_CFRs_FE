import { Component, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { UserGroupInfoPopupComponent } from '../components/user-group-info-popup/user-group-info-popup.component';
import { UserGroupService } from './user-group.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent {
  @ViewChild('userGroupInfoPopup', { static: true }) infoPopup:
    | UserGroupInfoPopupComponent
    | undefined;

  menuCode = 'USER-GROUP-PERMISSION';
  dataList: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private userGroupService: UserGroupService
  ) {}

  ngOnInit(): void {
    this.doLoadData();
  }

  doLoadData() {
    this.userGroupService.getData().subscribe({
      next: (response) => {
        this.dataList = response || [];
      },
      error: (error) => {
        this.baseUtil.alertError(error?.error?.message, 'Error');
      },
    });
  }

  doDelete(data: any) {
    this.userGroupService
      .delete({
        id: data.id,
      })
      .subscribe({
        next: () => {
          this.baseUtil.alertSaveSuccess();
          this.doLoadData();
        },
        error: (error) => {
          this.baseUtil.alertSaveError(error);
          this.baseUtil.hideLoader();
        },
      });
  }

  checkCanEdit() {
    return this.baseUtil.checkPermissionEdit(
      this.authService.userPermissions,
      this.menuCode
    );
  }

  editClick(event: any) {
    this.infoPopup?.show(event.data);
  }

  deleteClick(event: any) {
    this.baseUtil.alertConfirm('ยืนยันการลบข้อมูล', 'Delete !', () => {
      this.doDelete(event.data);
    });
  }

  newClick() {
    this.infoPopup?.show({});
  }

  searchClick() {
    this.doLoadData();
  }
}
