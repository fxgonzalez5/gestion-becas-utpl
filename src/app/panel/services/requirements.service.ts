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

    return this.http.get<RequirementsResponse>(url, { headers })
      .pipe(
        map(response => response.requirements),
        catchError(e => throwError(() => e.error.message))
      );
  }
}
