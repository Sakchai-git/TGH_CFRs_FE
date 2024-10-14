import { Component, ViewChild } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';
import { BankInfoPopupComponent } from '../components/bank-info-popup/bank-info-popup.component';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent {
  @ViewChild('bankInfoPopup', { static: true }) infoPopup:
    | BankInfoPopupComponent
    | undefined;

  menuCode = 'BANK';
  dataList: any = [];

  constructor(
    public baseUtil: BaseUtil,
    private authService: AuthService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.doLoadData();
  }

  doLoadData() {
    this.bankService.getData().subscribe({
      next: (response) => {
        this.dataList = response || [];
      },
      error: (error) => {
        this.baseUtil.alertError(error?.error?.message, 'Error');
      },
    });
  }

  doDelete(data: any) {
    this.bankService
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
