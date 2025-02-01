import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LngLat, Map, Marker } from 'mapbox-gl';
import { firstValueFrom } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { LocationService } from '../../services/location.service';
import { ScholarshipsService } from '../../services/scholarships.service';
import { RequirementsService } from '../../services/requirements.service';
import { Location } from '../../interfaces';

@Component({
  imports: [],
  selector: 'panel-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly accessToken:string = environment.mapboxKey;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private user = inject(AuthService).currentUser()!;
  private locationService = inject(LocationService);
  private requirementsService = inject(RequirementsService);
  private scholarshipsService = inject(ScholarshipsService);

  private requirementId: number | null = null;

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public marker?: Marker;

  ngOnInit(): void {
    const idRequirement = sessionStorage.getItem('requirementId');
    if (idRequirement) {
      this.requirementId = Number(idRequirement);
    }
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    if (!this.locationService.userLocation) throw 'Ubicación del usuario no disponible';

    this.map = new Map({
      accessToken: this.accessToken,
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.locationService.userLocation, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    this.mapListeners();
    this.readFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('click', (event) => {
      const lngLat = event.lngLat;
      this.createMarker(lngLat);
    });

    this.map?.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  flyTo(): void {
    if (!this.map) return;
    if (!this.locationService.userLocation) return;

    this.map.flyTo({
      center: this.locationService.userLocation,
      zoom: 18,
      essential: true,
    });

    const [lng, lat] = this.locationService.userLocation;
    this.createMarker(new LngLat(lng, lat));
  }

  createMarker(lngLat: LngLat): void {
    if (!this.map) return;

    if (this.marker) {
      this.marker.remove();
    }

    // Crear un elemento HTML para el marcador
    const markerElement = document.createElement('div');

    // Agregar el SVG como una imagen dentro del marcador
    const img = document.createElement('img');
    img.src = 'assets/icons/home_marker.svg';
    img.alt = 'Home Marker';

    markerElement.appendChild(img);

    const marker = new Marker({
      element: markerElement,
      anchor: 'bottom',
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.marker = marker;

    marker.on('dragend', () => this.saveToLocalStorage());

    this.saveToLocalStorage();
  }


  saveToLocalStorage(): void {
    if (!this.marker) return;

    const plainMarker: number[] = this.marker.getLngLat().toArray();
    localStorage.setItem('marker', JSON.stringify(plainMarker));
  }

  readFromLocalStorage(): void {
    const plainMarkerString = localStorage.getItem('marker') ?? '[]';
    const plainMarker: number[] = JSON.parse(plainMarkerString);;

    const [lng, lat] = plainMarker;
    this.map!.setCenter(new LngLat(lng, lat));
    this.createMarker(new LngLat(lng, lat));
  }

  async onConfirm(): Promise<void> {
    if (!this.marker) return;

    const location = await this.fetchAddress(this.marker.getLngLat());
    if (!location) return;

    this.locationService.saveUserLocation(this.user.id, location)
      .subscribe( {
        next: (success) => this.validateRequirement(success),
        error: () => alert('Hubo un error al guardar la ubicación. Por favor, inténtalo de nuevo más tarde.')
      });
  }

  async fetchAddress(lngLat: LngLat): Promise<Location | null> {
    const coords = lngLat.toArray();

    try {
      const userAddress = await firstValueFrom(this.locationService.getUserAddress(coords));
      return userAddress;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private validateRequirement(status: boolean): void {
    if (this.scholarshipsService.appliedScholarshipId() === 0 || this.requirementId === null) return;

    this.requirementsService.updateRequirementStatus(this.scholarshipsService.appliedScholarshipId(), this.requirementId, status, null)
    .subscribe( {
      next: () => {
        const afterUrl = this.activatedRoute.snapshot.pathFromRoot
            .flatMap(route => route.url)
            .map(segment => segment.path)
            .slice(0, -1)
            .join('/');

        this.router.navigateByUrl(afterUrl);
      },
      error: () => alert('Hubo un error al validar el requerimiento. Intente de nuevo.')
    });
  }
}
