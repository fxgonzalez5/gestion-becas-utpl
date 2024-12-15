import { Routes } from '@angular/router';
import LoginPageComponent from './pages/login-page/login-page.component';
import HomePageComponent from './pages/home-page/home-page.component';
import ApplicationPageComponent from './pages/application-page/application-page.component';

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'application', component: ApplicationPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
