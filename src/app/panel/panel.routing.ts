import { Routes } from '@angular/router';

export const panelRoutes: Routes = [
  {
    path: 'panel',
    loadComponent: () => import('./client/layouts/panel-layout/panel-layout.component'),
    loadChildren: () => import('./client/client.routing').then(r => r.clientRoutes),
  },
];
