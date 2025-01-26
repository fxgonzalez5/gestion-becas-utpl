import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { Scholarship, ScholarshipsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipsService {
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  // Método para obtener las becas
  getScholarships(): Observable<Scholarship[]> {
    const url = `${this.baseUrl}/scholarship/all`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ScholarshipsResponse>(url, { headers })
      .pipe(
        map(response => {
          // Transformación de los datos de la respuesta
          const transformedScholarships = response.scholarships.map(scholarship => ({
            ...scholarship,
            is_with_application: Boolean(scholarship.is_with_application)
          }));

          return transformedScholarships
        }),
        catchError(e => throwError(() => e.error.message))
      );
  }
}
