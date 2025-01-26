import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { Citizen } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CivilRegistryService {
  private readonly baseUrl:string = environment.externalUrl;
  private http = inject(HttpClient);

  getCitizen(citizenId: string): Observable<Citizen | null> {
    const url = `${this.baseUrl}/citizens/${citizenId}`;

    return this.http.get<Citizen>(url).pipe(
      map(response => response || null),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }
}
