import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component') },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
