import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { BankComponent } from './bank/bank.component';
import { KtbBranchComponent } from './ktb-branch/ktb-branch.component';
import { BankInfoPopupComponent } from './components/bank-info-popup/bank-info-popup.component';
import { SharedModule } from '@shared/shared.module';
import { KtbBranchInfoPopupComponent } from './components/ktb-branch-info-popup/ktb-branch-info-popup.component';
import { RemarkComponent } from './remark/remark.component';
import { RemarkInfoPopupComponent } from './components/remark-info-popup/remark-info-popup.component';

@NgModule({
  declarations: [BankComponent, KtbBranchComponent, BankInfoPopupComponent, KtbBranchInfoPopupComponent, RemarkComponent, RemarkInfoPopupComponent],
  imports: [CommonModule, MasterDataRoutingModule, SharedModule],
})
export class MasterDataModule {}
