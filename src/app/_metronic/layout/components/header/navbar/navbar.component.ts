import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
// import { AuthService, UserType } from 'src/app/modules/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'svg-icon-1';

  // user$: Observable<any>;
  loggedInUser: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.user$ = this.authService.currentUser$.asObservable();
    this.authService.currentUser$.subscribe({
      next: (res) => {
        this.loggedInUser = res;
      },
    });
  }

  signOutClick() {
    this.authService.logout();
  }
}