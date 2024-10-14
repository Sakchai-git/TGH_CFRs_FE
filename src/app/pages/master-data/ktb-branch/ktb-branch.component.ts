import { Component, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { KtbBranchInfoPopupComponent } from '../components/ktb-branch-info-popup/ktb-branch-info-popup.component';
import { KtbBranchService } from './ktb-branch.service';

@Component({
  selector: 'app-ktb-branch',
  templateUrl: './ktb-branch.component.html',
  styleUrls: ['./ktb-branch.component.scss'],
})
export class KtbBranchComponent {
  @ViewChild('ktbBranchInfoPopup', { static: true }) infoPopup:
    | KtbBranchInfoPopupComponent
    | undefined;

  menuCode = 'KTB-BRANCH';
  gridPaging: any = {
    page: 1,
    pageSize: 10,
  };
  dataList: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private ktbBranchService: KtbBranchService
  ) {}

  ngOnInit(): void {
    this.doLoadData();
  }

  doLoadData() {
    const filters = {
      skip: this.gridPaging.page - 1,
      take: this.gridPaging.pageSize,
    };
    this.ktbBranchService.getData(filters).subscribe({
      next: (response) => {
        this.dataList = response || [];
        // this.gridPaging.total = response.total;
        this.gridPaging.total = this.dataList.length;
      },
      error: (error) => {
        this.baseUtil.alertError(error?.error?.message, 'Error');
      },
    });
  }

  doDelete(data: any) {
    this.ktbBranchService
      .delete({
        branchKtbId: data.branchKtbId,
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

  gridPageChange(paging: number) {
    this.gridPaging = paging;
    this.doLoadData();
  }
}
