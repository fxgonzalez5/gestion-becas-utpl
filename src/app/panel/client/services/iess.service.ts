import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Affiliation } from '../interfaces/affiliation.interface';

@Injectable({
  providedIn: 'root'
})
export class IessService {
  private readonly baseUrl:string = 'https://magicloops.dev/api/loop/95b2e2bc-a1d3-4a69-aeed-d6110976f5c3/run';
  private http = inject(HttpClient);

  getAffiliation(nroIdentification: string): Observable<Affiliation> {
      const url = `${this.baseUrl}`;
      const queryParameters = {
        "numero_identificacion": nroIdentification
      };

      return this.http.get<Affiliation>(url, { params: queryParameters });
    }
}
