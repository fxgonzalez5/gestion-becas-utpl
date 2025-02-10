import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { Location, LocationResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public userLocation?: [number, number];
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  get isUserLocationReady(): boolean {
    return !!this.userLocation
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

  getUserAddress(coords: [number, number]): Observable<Location> {
    const [longitude, latitude] = coords;
    const url = `${this.baseUrl}/mapbox/geocode/reverse/${longitude}/${latitude}`;

    return this.http.get<LocationResponse>(url).pipe(
      map(response => response.data),
      catchError(e => throwError(() => e.error.message))
    );
  }

  saveUserLocation(userId: string, location: Location): Observable<boolean> {
    const url = `${this.baseUrl}/requirements/user/location`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      userId: userId,
      address: location.address,
      city: location.city,
      country: location.country,
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    };

    return this.http.post(url, body, { headers }).pipe(
      map(() => true),
      catchError((e) => throwError(() => e.error.message))
    );
  }
}
