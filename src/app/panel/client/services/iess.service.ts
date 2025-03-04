import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IessService {
  private readonly baseUrl:string = 'https://cloud.uipath.com/utplirwlknj/DefaultTenant/orchestrator_/t/77759630-0ace-4e21-b735-01a22801654a/api';
  private http = inject(HttpClient);

  private async getCertified(body: {}): Promise<boolean> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer rt_53D415CCA04D1581896DDDCAC964A2CECD0E3A7F3A4EEA6E081A2E6106EA385D-1`);

    return await firstValueFrom(
      this.http.post(url, body, { headers }).pipe(
        map(() => true),
        catchError((e) => throwError(() => false))
      )
    );
  }

  async validateAffiliatedUser(id: string, key: string): Promise<boolean> {
    const body = {
      'cedula_input': id,
      'clave_input': key,
      'fecha_input': ''
    };

    return await this.getCertified(body);
  }

  validateUnaffiliatedUser(id: string, date: string): Promise<boolean> {
    const body = {
      'cedula_input': id,
      'clave_input': '',
      'fecha_input': date
    };

    return this.getCertified(body);
  }
}
