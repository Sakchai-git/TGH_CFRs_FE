import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseUtil } from '@shared/utils/base.util';

@Injectable({
  providedIn: 'root',
})
export class ImportStatementService {
  url = environment.api + 'api/bank-statement/';

  constructor(private http: HttpClient, public baseUtil: BaseUtil) {}

  getData(dataFilter: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .get(this.url + 'get', { params: dataFilter })
      .pipe(catchError(this.baseUtil.errorMethod));
  }

  importData(data: any, params: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .post(this.url + 'import', data, { params: params })
      .pipe(catchError(this.baseUtil.errorMethod));
  }
  
  delete(dataFilter: any) {
    return this.http.post(this.url + 'delete', dataFilter);
  }

}
