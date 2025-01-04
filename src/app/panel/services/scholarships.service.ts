import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Scholarship, ScholarshipsResponse } from '../interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipsService {
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  private _scholarshipsList = signal<Scholarship[]>([]);

  public scholarshipsList = computed(() => this._scholarshipsList());

  constructor() {}

  loadScholarships(): Observable<void> {
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

          this._scholarshipsList.set(transformedScholarships);
        }),
        catchError(e => throwError(() => e.error.message))
      );
  }
}
