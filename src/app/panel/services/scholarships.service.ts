import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { Application, ApplicationsResponse, PostulationResponse, Scholarship, ScholarshipsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipsService {
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  private _appliedScholarshipId = signal<number>(0);

  public activeRequirements = signal<boolean>(true);

  public appliedScholarshipId = computed(() => this._appliedScholarshipId());

  constructor() {
    const appliedScholarshipId = sessionStorage.getItem('appliedScholarshipId');
    if (appliedScholarshipId) {
      this._appliedScholarshipId.set(Number(appliedScholarshipId));
    }
  }

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

  // Método para verificar si el usuario ha postulado
  hasUserApplied(userId: string, year: number, period: string): Observable<void> {
    const url = `${this.baseUrl}/application/${userId}/${year}/${period}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<PostulationResponse>(url, { headers })
      .pipe(
        map(response => {
          this._appliedScholarshipId.set(response.scholarshipId);
          sessionStorage.setItem('appliedScholarshipId', response.scholarshipId.toString());
        }),
        catchError(e => throwError(() => e.error.message))
      );
  }

  // Método para postular a una beca
  applyScholarship(userId: string, scholarshipId: number, year: number, period: string, modality: string): Observable<boolean> {
    const url = `${this.baseUrl}/application`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    const body = {
      user_id: userId,
      scholarship_id: scholarshipId,
      year: year,
      period: period,
      modality: modality
    };

    return this.http.post(url, body, { headers }).pipe(
      map(() => true),
      catchError((e) => throwError(() => e.error.message))
    );
  }

  // Método para obtener las postulaciones de un usuario
  getApplications(userId: string): Observable<Application[]> {
    const url = `${this.baseUrl}/application/user/${userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ApplicationsResponse>(url, { headers })
      .pipe(
        map(response => {
          // Transformación de los datos de la respuesta
          const transformedApplications = response.applications.map(application => ({
            ...application,
            status: application.status === null ? 'En Revisión' : application.status ? 'Beca Asignada' : 'Beca Rechazada',
          }));

          return transformedApplications;
        }),
        catchError(e => throwError(() => e.error.message))
      );
  }

  deleteApplication(applicationId: number): Observable<boolean> {
    const url = `${this.baseUrl}/application/remove/${applicationId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(url, { headers }).pipe(
      map(() => true),
      catchError(e => throwError(() => e.error.message))
    );
  }
}
