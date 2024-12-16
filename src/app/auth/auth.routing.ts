import { Routes } from '@angular/router';
import LoginPageComponent from './pages/login-page/login-page.component';
import HomePageComponent from './pages/home-page/home-page.component';
import ApplicationPageComponent from './pages/grant-pages/application-page/application-page.component';
import FollowUpPageComponent from './pages/grant-pages/followup-page/followup-page.component';
import GrantRequirementsPageComponent from './pages/grant-pages/grant-requirements/grant-requirements.component';

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'application', component: ApplicationPageComponent},
  { path: 'followup', component: FollowUpPageComponent},
  { path: 'grantrequirements', component: GrantRequirementsPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
