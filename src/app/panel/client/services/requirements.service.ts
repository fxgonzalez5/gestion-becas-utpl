import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { Requirement, RequirementsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequirementsService {
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  getRequirementsByScholarship(scholarshipId: number): Observable<Requirement[]> {
    const url = `${this.baseUrl}/scholarship/${scholarshipId}/requirements`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RequirementsResponse<'scholarship_id'>>(url, { headers })
      .pipe(
        map(response => response.requirements),
        catchError(e => throwError(() => e.error.message))
      );
  }

  getRequirementsByApplication(applicationId: number, userId: string): Observable<Requirement[]> {
    const url = `${this.baseUrl}/application/${applicationId}/requirements/${userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RequirementsResponse<'application_id'>>(url, { headers })
      .pipe(
        map(response => response.requirements),
        catchError(e => throwError(() => e.error.message))
      );
  }

  updateRequirementStatus(applicationId: number, requirementId: number, status: boolean, load_documentation: boolean | null): Observable<boolean> {
    const url = `${this.baseUrl}/application/${applicationId}/requirements/${requirementId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, {status, load_documentation}, { headers }).pipe(
      map(() => true),
      catchError(e => throwError(() => e.error.message))
    );
  }
}
