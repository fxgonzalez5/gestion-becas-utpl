import { Routes } from '@angular/router';
import { privateGuard } from './../auth/guards/private.guard';

export const panelRoutes: Routes = [
  {
    path: 'panel',
    loadComponent: () => import('./client/layouts/panel-layout/panel-layout.component'),
    loadChildren: () => import('./client/client.routing').then(r => r.clientRoutes),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./admin/layouts/dashboard-layout/dashboard-layout.component'),
    loadChildren: () => import('./admin/admin.routing').then(r => r.adminRoutes),
  },
];
