import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { environment } from '@environments/environment';
import { LocationService } from '../../services/location.service';

@Component({
  imports: [],
  selector: 'panel-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements AfterViewInit, OnDestroy {
  private readonly accessToken:string = environment.mapboxKey;

  private locationService = inject(LocationService);

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public marker?: Marker;

  get isUserLocationReady(): boolean {
    return this.locationService.isUserLocationReady;
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
}
