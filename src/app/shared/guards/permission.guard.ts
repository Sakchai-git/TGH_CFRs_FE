import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { BaseUtil } from '@shared/utils/base.util';
import { AuthService } from '@shared/service/auth.service';

export const PermissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const baseUtil = inject(BaseUtil);
  const authService = inject(AuthService);
  return baseUtil.checkPermissionView(
    authService.userPermissions,
    route.data.menuCode
  );
};
