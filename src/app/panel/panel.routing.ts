import { Routes } from '@angular/router';

export const panelRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/panel-layout/panel-layout.component'),
    children: [
      { path: 'home', loadComponent: () => import('./pages/home-page/home-page.component') },
      {
        path: 'scholarship-list',
        title: 'Solicitud',
        loadComponent: () => import('./pages/scholarship-list-page/scholarship-list-page.component'),
        children: [
          { path: 'requirements-list', loadComponent: () => import('./pages/requirements-list-page/requirements-list-page.component') },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];
