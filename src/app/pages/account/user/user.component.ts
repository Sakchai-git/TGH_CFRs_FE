import { Component, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { UserInfoPopupComponent } from '../components/user-info-popup/user-info-popup.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @ViewChild('userInfoPopup', { static: true }) infoPopup:
    | UserInfoPopupComponent
    | undefined;

  menuCode = 'USER';
  dataList: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.doLoadData();
  }

  doLoadData() {
    this.userService.getData().subscribe({
      next: (response) => {
        this.dataList = response || [];
      },
      error: (error) => {
        this.baseUtil.alertError(error?.error?.message, 'Error');
      },
    });
  }

  doDelete(data: any) {
    this.userService
      .delete({
        userId: data.userId,
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
