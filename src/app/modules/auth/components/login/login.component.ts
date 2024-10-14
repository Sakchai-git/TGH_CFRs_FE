import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    userName: 'ossakchaip',
    password: 'osk@837422',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  isLoading: boolean = false;
  fieldTextType: boolean;
  errorMessage: string;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.isLoading$ = this.authService.isLoading$;
    // // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
  
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  initForm() {
    this.loginForm = this.fb.group({
      userName: [
        this.defaultAuth.userName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [this.defaultAuth.password],
    });
  }

  submit() {
    // this.hasError = false;
    // const loginSubscr = this.authService
    //   .login(this.f.userName.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe((user: UserModel | undefined) => {
    //     if (user) {
    //       console.log('user', user);
    //       // this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.hasError = true;
    //     }
    //   });
    // this.unsubscribe.push(loginSubscr);

    if (!this.isLoading) {
      this.isLoading = true;
      this.hasError = false;
      this.errorMessage = '';
      this.authService
        .login(this.f.userName.value, this.f.password.value)
        .subscribe({
          next: (response: any) => {
            if (response.token) {
              localStorage.setItem('accessToken', response.token);
              localStorage.setItem('accessTokenExpire', response.expires);
              // this.router.navigate(['/']);

              this.authService.getUserProfile().subscribe({
                next: (res) => {
                  console.log('getUserProfile', res);
                  this.authService.setUserProfile(res);
                  this.router.navigate(['/']);
                },
              });
            }
            this.isLoading = false;
          },
          error: (error) => {
            this.hasError = true;
            this.errorMessage = error.message;
            this.isLoading = false;
          },
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
