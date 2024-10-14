import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BaseUtil } from '@shared/utils/base.util';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RunBatchManualService {
  url = environment.api + 'api/run-batch/';

  constructor(private http: HttpClient, public baseUtil: BaseUtil) {}

  getData(dataFilter: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .get(this.url + 'get', { params: dataFilter })
      .pipe(catchError(this.baseUtil.errorMethod));
  }
  getDataDetail(dataFilter: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .get(this.url + 'get-detail', { params: dataFilter })
      .pipe(catchError(this.baseUtil.errorMethod));
  }

  save(data: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .post(this.url + 'save', data)
      .pipe(catchError(this.baseUtil.errorMethod));
  }
  run(data: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http.post(this.url + 'run', data);
    // .pipe(catchError(this.baseUtil.errorMethod));
  }
}
