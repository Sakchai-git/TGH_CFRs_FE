import { Component } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { AuditLogService } from './audit-log.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
})
export class AuditLogComponent {
  menuCode = 'AUDIT-LOG';
  dataUser: any = [];
  dataMenu: any = [];
  dataFilter: any = {};

  dataList: any = [];

  initialDataRangeValue: any = [null, null];

  constructor(
    public baseUtil: BaseUtil,
    private dataService: AuditLogService
  ) {}

  ngOnInit(): void {
    // const startDate = dayjs().toDate();
    // const endDate = dayjs().toDate();
    // this.initialDataRangeValue = [startDate, endDate];
    // this.dataFilter.startDate = dayjs(startDate).format('YYYY-DD-MM');
    // this.dataFilter.endDate = dayjs(endDate).format('YYYY-DD-MM');

    this.getData();
  }

  getData() {
    this.dataList = [
      {
        id: 1,
        timestamp: '2024-05-02T20:43:40.137',
        userFullName: 'sakchai P222',
        menuName: 'User',
        action: 'Create',
        description: 'Created User "John"',
        data: null,
        severity: 'Medium',
      },
      {
        id: 2,
        timestamp: '2024-05-01T13:54:40.137',
        userFullName: 'John Smith',
        menuName: 'User',
        action: 'Delete',
        description: 'Deleted User "Test123"',
        data: null,
        severity: 'High',
      },
      {
        id: 3,
        timestamp: '2024-05-01T08:30:40.137',
        userFullName: 'sakchai P222',
        menuName: 'Bank',
        action: 'Update',
        description: 'Updated Bank "ธนาคารกสิกรไทย"',
        data: null,
        severity: 'Low',
      },
      {
        id: 4,
        timestamp: '2024-04-30T12:30:40.137',
        userFullName: 'sakchai P222',
        menuName: 'Auto Reconcile',
        action: 'Run',
        description: 'Ran Auto Reconcile "2024 May BAAC"',
        data: null,
        severity: 'High',
      },
      {
        id: 5,
        timestamp: '2024-04-27T18:32:40.137',
        userFullName: 'John Smith',
        menuName: 'Import Statement',
        action: 'Import',
        description: 'Imported Statement "2024 March KBANK"',
        data: null,
        severity: 'High',
      },
      {
        id: 6,
        timestamp: '2024-04-26T09:12:40.137',
        userFullName: 'sakchai P222',
        menuName: 'User Login',
        action: 'Login',
        description: 'Logged In',
        data: null,
        severity: 'Low',
      },
    ];
  }

  dataRangeChanged(event: any) {
    this.dataFilter.startDate = event.value[0]
      ? dayjs(event.value[0]).format('YYYY-DD-MM')
      : null;
    this.dataFilter.endDate = event.value[1]
      ? dayjs(event.value[1]).format('YYYY-DD-MM')
      : null;
  }

  searchClick(event: any) {
    console.log('this.dataFilter', this.dataFilter);
  }
}
