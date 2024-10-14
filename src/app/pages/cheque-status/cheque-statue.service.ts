import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUtil } from '@shared/utils/base.util';
import { throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChequeStatueService {
  url = environment.api + 'api/paychqms/';

  constructor(private http: HttpClient,public baseUtil: BaseUtil) { }

  getData(dataFilter: any) {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .get(this.url + 'get', { params: dataFilter })
      .pipe(catchError(this.baseUtil.errorMethod));
  }

}
