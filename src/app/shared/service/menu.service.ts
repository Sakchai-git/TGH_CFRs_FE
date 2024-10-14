import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseUtil } from '@shared/utils/base.util';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  url = environment.api + 'api/menu/';

  constructor(private http: HttpClient, public baseUtil: BaseUtil) {}

  getData(dataFilter?: any) {
    return this.http.get(this.url + 'get', { params: dataFilter });
  }
}
