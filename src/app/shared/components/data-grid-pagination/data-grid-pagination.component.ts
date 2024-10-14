import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'data-grid-pagination',
  templateUrl: './data-grid-pagination.component.html',
  styleUrls: ['./data-grid-pagination.component.scss'],
})
export class DataGridPaginationComponent implements OnInit {
  @Input() pageOptions: any = {};
  @Input() paging: any = {};
  @Output() pageChange: any = new EventEmitter<{}>();

  options: any = {};
  defaultOptions: any = {
    boundaryLinks: false,
    page: 1,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
  };
  constructor() {}

  ngOnInit(): void {
    this.options = {
      ...this.defaultOptions,
      ...this.pageOptions,
    };
  }

  selectPageChange(selectedPage: number) {
    this.paging.page = selectedPage;
    this.pageChange.emit({
      page: this.paging.page,
      pageSize: parseInt(this.paging.pageSize),
      total: this.paging.total,
    });
  }

  getTotalPage() {
    return Math.ceil(this.paging.total / this.paging.pageSize);
  }
}
