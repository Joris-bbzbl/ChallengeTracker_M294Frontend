import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppAuthService } from '../services/app-auth.service';
import { Role } from '../app.roles';

export const roleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const authService = inject(AppAuthService);
  const router = inject(Router);

  await authService.ready();

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const requiredRole = route.data['role'] as Role;

  if (requiredRole && !authService.hasRole(requiredRole)) {
    return router.createUrlTree(['/no-access']);
  }

  return true;
};
