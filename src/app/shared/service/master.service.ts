import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BaseUtil } from '@shared/utils/base.util';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  url = environment.api + 'api/';

  constructor(private http: HttpClient,public baseUtil: BaseUtil) { }


  getBank() {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .get(this.url + 'bank/get', { params: { isActive: 1 }  })
      .pipe(catchError(this.baseUtil.errorMethod));
  }

  getSystem() {
    // tslint:disable-next-line: arrow-return-shorthand

    return this.http
      .get(this.url + 'system/get', { params: { isActive: 1 } })
      .pipe(catchError(this.baseUtil.errorMethod));
  }

}
