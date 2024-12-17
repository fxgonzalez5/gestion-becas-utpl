import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import NavPageComponent from "../../nav-page/nav-page.component";
import FooterPageComponent from "../../footer-page/footer-page.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
    imports: [NavPageComponent, FooterPageComponent, RouterLink, RouterLinkActive],
    templateUrl: './location.component.html',
    styleUrl: './location.component.css'
})
export class LocationPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;
  public zoom: number = 15;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-79.1993772877827, -3.986573355586756);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      accessToken: 'pk.eyJ1IjoiZnJhbnRnb2QiLCJhIjoiY2x4dmJ5Y3YxMG1kdjJpb2ZsMTZxdTJiZyJ9.aLseyNkjfYbLpP8uZkL6Cw',
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map?.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    });

    this.map?.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map?.on('move', (event) => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value: string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
    this.saveToLocalStorage();
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    marker.getElement().addEventListener('click', () => this.flyTo(marker)); // Agregado adicionalmente (es mejorable)
    marker.on('dragend', () => this.saveToLocalStorage());

    this.markers.push({
      color,
      marker,
    });
  }

  deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 17,
      center: marker.getLngLat(),
      essential: true,
    })
  }

  saveToLocalStorage(): void {
    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }

  readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}