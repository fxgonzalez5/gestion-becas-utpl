import { Routes } from '@angular/router';
import LoginPageComponent from './pages/login-page/login-page.component';
import HomePageComponent from './pages/home-page/home-page.component';
import ApplicationPageComponent from './pages/grant-pages/application-page/application-page.component';
import FollowUpPageComponent from './pages/grant-pages/followup-page/followup-page.component';
import GrantRequirementsPageComponent from './pages/grant-pages/grant-requirements-page/grant-requirements.component';
import GrantApplicationPageComponent from './pages/grant-pages/grant-application-page/grant-application.component';
import { LocationPageComponent } from './pages/grant-pages/location-page/location.component';
import SocioEconomicDataPageComponent from './pages/grant-pages/socio-economic-data-page/socio-economic-data.component';

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'application', component: ApplicationPageComponent},
  { path: 'followup', component: FollowUpPageComponent},
  { path: 'grantrequirements', component: GrantRequirementsPageComponent},
  { path: 'grantapplication', component: GrantApplicationPageComponent},
  { path: 'location', component: LocationPageComponent},
  { path: 'socioeconomicdata', component: SocioEconomicDataPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
