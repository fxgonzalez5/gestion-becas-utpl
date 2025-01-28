import { Routes } from '@angular/router';

export const panelRoutes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home-page/home-page.component') },
  {
    path: 'scholarships',
    title: 'Solicitud',
    loadComponent: () => import('./pages/scholarship-list-page/scholarship-list-page.component'),
  },
  { path: 'scholarships/:id/requirements', loadComponent: () => import('./pages/requirements-list-page/requirements-list-page.component') },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
