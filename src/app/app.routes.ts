import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routing').then(r => r.AuthRoutes),
  },
  { path: '**', redirectTo: 'auth' }
];
