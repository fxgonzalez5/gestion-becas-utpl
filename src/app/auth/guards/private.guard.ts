import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums/auth-status.enum';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario no está autenticado, redirigir a /auth
  if (authService.authStatus() !== AuthStatus.authenticated) {
    router.navigateByUrl('/auth');
    return false;
  }

  // Si el usuario intenta acceder a '/', lo redirigimos a su panel correspondiente
  if (state.url === '' || state.url === '/') {
    if (authService.isAdmin) {
      router.navigateByUrl('/dashboard');
    } else {
      router.navigateByUrl('/panel');
    }
    return false;
  }

  return true;
};
