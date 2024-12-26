import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums/auth-status.enum';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() !== AuthStatus.authenticated) {
    router.navigateByUrl('/auth');
    return false;
  }

  return true;
};
