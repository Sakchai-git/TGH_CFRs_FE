import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BaseUtil } from '@shared/utils/base.util';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  url = environment.api + 'api/report/';

  constructor(private http: HttpClient, public baseUtil: BaseUtil) {}

  downloadReportFile(dataFilter: any, apiPath: string) {
    return this.http.get(this.url + apiPath, {
      params: dataFilter,
      responseType: 'blob',
    });

    // return this.http.post(this.url + apiPath, dataFilter, {
    //   observe: 'response',
    //   responseType: 'blob',
    // });
  }
}
