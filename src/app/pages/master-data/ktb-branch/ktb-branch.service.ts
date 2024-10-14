import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseUtil } from '@shared/utils/base.util';

@Injectable({
  providedIn: 'root',
})
export class KtbBranchService {
  url = environment.api + 'api/branch-ktb/';

  constructor(private http: HttpClient, public baseUtil: BaseUtil) {}

  getData(dataFilter?: any) {
    return this.http.get(this.url + 'get', { params: dataFilter });
  }

  getDataById(dataFilter?: any) {
    return this.http.get(this.url + 'get-id', { params: dataFilter });
  }

  save(data: any) {
    return this.http.post(this.url + 'save', data);
  }

  delete(data: any) {
    return this.http.post(this.url + 'delete', data);
  }
}
