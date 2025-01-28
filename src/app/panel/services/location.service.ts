import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return  !!this.userLocation
  };

  constructor() {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (error) => {
          alert('No se pudo obtener la ubicación del usuario');
          console.error(error);
          reject();
        }
      );
  });
  }
}
