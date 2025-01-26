import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { Ruc } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SriServiceService {
  private readonly baseUrl:string = environment.externalUrl;
  private http = inject(HttpClient);

  getRuc(ruc: string): Observable<boolean> {
    const url = `${this.baseUrl}/sri/${ruc}`;

    return this.http.get<Ruc>(url).pipe(
      map(response => response !== null),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(false);
        }
        return throwError(() => error);
      })
    );
  }

}
