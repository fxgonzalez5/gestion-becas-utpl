import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MapViewComponent } from '../../components/map-view/map-view.component';
import { LocationService } from '../../services/location.service';

@Component({
  imports: [MapViewComponent],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export default class MapPageComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private locationService = inject(LocationService);

  get isUserLocationReady(): boolean {
    return this.locationService.isUserLocationReady;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
