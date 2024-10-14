import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BaseUtil } from '@shared/utils/base.util';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: BehaviorSubject<any | null>;
  private currentUser: any = null;

  get accessToken() {
    return localStorage.getItem(environment.auth.ACCESS_TOKEN_KEY);
  }

  get accessTokenExpire() {
    return localStorage.getItem(environment.auth.ACCESS_TOKEN_EXPIRE_KEY);
  }

  get loggedInUser() {
    return this.currentUser;
  }

  get userPermissions() {
    return this.currentUser?.permissons || [];
  }

  url = environment.api + 'api/';

  constructor(
    private http: HttpClient,
    public baseUtil: BaseUtil,
    private router: Router
  ) {
    this.currentUser$ = new BehaviorSubject<any | null>(this.currentUser);
  }

  checkValidAccessToken() {
    //ตรวจสอบว่ามี Token หรือไม่
    if (!this.accessToken) {
      return false;
    }
    // ตรวจสอบว่า Token หมดอายุ
    if (
      this.accessTokenExpire &&
      dayjs().isAfter(dayjs(this.accessTokenExpire))
    ) {
      return false;
    }
    return true;
  }

  login(username: string, password: string) {
    return this.http.get(this.url + 'login', {
      params: {
        UserName: username,
        Password: password,
      },
    });
  }

  logout() {
    localStorage.removeItem(environment.auth.ACCESS_TOKEN_KEY);
    localStorage.removeItem(environment.auth.ACCESS_TOKEN_EXPIRE_KEY);
    this.router.navigate(['/auth/login']);
  }

  getUserProfile() {
    return this.http.get(this.url + 'user/get-profile');
  }

  setUserProfile(userProfile: any) {
    this.currentUser = userProfile;
    this.currentUser$.next(this.currentUser);
  }
}
