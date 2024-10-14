import { BaseUtil } from './../utils/base.util';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@shared/service/auth.service';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private baseUtil: BaseUtil) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let token = this.authService.accessToken;
    // if (!token) {
    //   this.authService.logout();
    // }

    if (this.authService.checkValidAccessToken()) {
      let token = this.authService.accessToken;
      if (token) {
        const requestWithToken = this.addTokenHeader(request, token);
        return next
          .handle(requestWithToken)
          .pipe(catchError((x) => this.handleAuthError(x)));
      } else {
        return next
          .handle(request)
          .pipe(catchError((x) => this.handleAuthError(x)));
      }
    } else {
      this.authService.logout();
      return next
        .handle(request)
        .pipe(catchError((x) => this.handleAuthError(x)));
    }
  }

  private handleAuthError(
    httpErrorResponse: HttpErrorResponse
  ): Observable<any> {
    //handle your auth error or rethrow
    console.log('handleAuthError');

    // if (httpErrorResponse.status === 401 || httpErrorResponse.status === 403) {
    if (
      httpErrorResponse.status === 401 ||
      httpErrorResponse.status === 403 ||
      httpErrorResponse.status === 0
    ) {
      // this.authService.doLogout();
      // this.loaderService.hide();
      // this.authService.logout();
      return of(httpErrorResponse.error.message);
    }
    return throwError(() => httpErrorResponse.error);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        rejectUnauthorized: 'false',
      },
    });
  }
}
