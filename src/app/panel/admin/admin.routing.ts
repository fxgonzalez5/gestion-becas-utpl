import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'scholarships',
    title: 'Becas',
    data: { icon: 'school' },
    loadComponent: () => import('./pages/scholarships-page/scholarships-page.component'),
  },
  { path: '', redirectTo: 'scholarships', pathMatch: 'full' },
];
