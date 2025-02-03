import { Routes } from '@angular/router';

export const panelRoutes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home-page/home-page.component') },
  {
    path: 'scholarships',
    title: 'Solicitud',
    loadComponent: () => import('./pages/scholarship-list-page/scholarship-list-page.component'),
  },
  {
    path: 'scholarships/:id/requirements',
    loadComponent: () => import('./pages/requirements-list-page/requirements-list-page.component'),
    children: [
      {
        path: 'validation',
        loadComponent: () => import('./layouts/validation-layout/validation-layout.component'),
        children: [
          { path: 'civil-registry', loadComponent: () => import('./pages/civil-registry-page/civil-registry-page.component') },
          { path: 'sri', loadComponent: () => import('./pages/sri-page/sri-page.component') },
          { path: 'iess', loadComponent: () => import('./pages/iess-page/iess-page.component') },
        ]
      },
    ]
  },
  { path: 'scholarships/:id/requirements/form', loadComponent: () => import('./pages/form-page/form-page.component') },
  { path: 'scholarships/:id/requirements/map', loadComponent: () => import('./pages/map-page/map-page.component') },
  {
    path: 'applications',
    title: 'Seguimiento',
    loadComponent: () => import('./pages/scholarship-applications-page/scholarship-applications-page.component'),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
