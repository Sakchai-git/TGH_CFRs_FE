import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/service/auth.service';
import { MenuService } from '@shared/service/menu.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  dataMenu: any = [];
  loggedInUser: any = {};

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (res) => {
        this.loggedInUser = res;
        this.getMenus(this.loggedInUser?.permissons);
      },
    });
  }

  getMenus(userPermission: any) {
    this.menuService.getData().subscribe({
      next: (menus: any) => {
        const userMenus: any = [];

        // กรอง Menu ตาม Permission
        menus.map((menu: any) => {
          if (userPermission && userPermission.length > 0) {
            let permissionMenu = userPermission.find((item: any) => {
              return item.isView && item.menuCode === menu.code;
            });
            if (permissionMenu && permissionMenu.menuCode) {
              userMenus.push(menu);
            }
          }
        });
        this.dataMenu = userMenus;
      },
    });
  }

  menuGroupList() {
    return this.dataMenu.filter((item: any) => {
      return item.parentMenuId === 0;
    });
  }

  menuList(parentMenuId: number) {
    return this.dataMenu.filter((item: any) => {
      return item.parentMenuId === parentMenuId;
    });
  }
}
