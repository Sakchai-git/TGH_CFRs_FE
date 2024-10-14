import { Component, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { RemarkService } from './remark.service';
import { RemarkInfoPopupComponent } from '../components/remark-info-popup/remark-info-popup.component';

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss'],
})
export class RemarkComponent {
  @ViewChild('remarkInfoPopup', { static: true }) infoPopup:
    | RemarkInfoPopupComponent
    | undefined;

  menuCode = 'REMARK';
  dataList: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private remarkService: RemarkService
  ) {}

  ngOnInit(): void {
    this.doLoadData();
  }

  doLoadData() {
    this.remarkService.getData().subscribe({
      next: (response) => {
        this.dataList = response || [];
      },
      error: (error) => {
        this.baseUtil.alertError(error?.error?.message, 'Error');
      },
    });
  }

  doDelete(data: any) {
    this.remarkService
      .delete({
        bankId: data.bankId,
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
