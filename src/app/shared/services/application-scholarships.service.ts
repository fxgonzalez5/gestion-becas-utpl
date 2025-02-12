import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { ApplicationScholarship } from '../interfaces/application-scholarship.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationScholarshipsService {
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  // Método para obtener las becas de postulación
  getApplicationScholarships(): Observable<ApplicationScholarship[]> {
    const url = `${this.baseUrl}/scholarships/application`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{status: boolean, scholarships: ApplicationScholarship[]}>(url, { headers }).pipe(
      map((response) => response.scholarships),
      catchError((e) => throwError(() => e.error.message))
    );
  }

  // Método para actualizar las becas de postulación
  updateApplicationScholarships(scholarships: ApplicationScholarship[]): Observable<boolean> {
    const url = `${this.baseUrl}/scholarships/application`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      scholarships
    };

    return this.http.put(url, body, { headers }).pipe(
      map(() => true),
      catchError((e) => throwError(() => e.error.message))
    );
  }
}
