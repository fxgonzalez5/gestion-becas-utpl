import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if (!navigator.geolocation) {
  alert('Navegador no soporta la geolocalización');
  throw new Error('Navegador no soporta la geolocalización');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
