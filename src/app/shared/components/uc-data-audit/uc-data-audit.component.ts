import { BaseUtil } from '@shared/utils/base.util';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'uc-data-audit',
  templateUrl: './uc-data-audit.component.html',
  styleUrls: ['./uc-data-audit.component.scss'],
})
export class UcDataAuditComponent {
  @Input() selectedInfo: any = {};

  constructor(public baseUtil: BaseUtil) {}
}
