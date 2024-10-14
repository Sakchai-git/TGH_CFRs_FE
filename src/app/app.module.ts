import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BaseUtil } from '@shared/utils/base.util';
import { LoaderUtil } from '@shared/utils/loader.util';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { Router } from '@angular/router';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    // environment.isMockEnabled
    //   ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
    //       passThruUnknownUrl: true,
    //       dataEncapsulation: false,
    //     })
    //   : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   multi: true,
    //   deps: [AuthService],
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: LOCALE_ID, useValue: "th-th" },
    BaseUtil,
    LoaderUtil,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
