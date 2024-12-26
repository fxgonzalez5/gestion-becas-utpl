import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './auth/guards/index.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadChildren: () => import('./auth/auth.routing').then(r => r.authRoutes),
  },
  {
    path: 'panel',
    canActivate: [privateGuard],
    loadChildren: () => import('./panel/panel.routing').then(r => r.panelRoutes),
  },
  { path: '**', redirectTo: 'auth' }
];
