import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppAuthService } from '../services/app-auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AppAuthService);
  const router = inject(Router);

  await authService.ready();

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
