import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, firstValueFrom, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { UploadResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  // Método genérico para subir archivos
  async uploadFile(file: File, service: string, name: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('document', file);

    return await firstValueFrom(
      this.http.post<UploadResponse>(`${this.baseUrl}/upload/${service}/${name}`, formData)
        .pipe(
          catchError(e => throwError(() => e.error.message))
        )
    );
  }

  // Subir archivo de registro civil
  async uploadCivilRegistryFile(file: File, userId: string): Promise<boolean> {
    const response = await this.uploadFile(file, 'registro_civil', userId);
    return response.status;
  }

  // Subir archivo de SRI
  async uploadSriFile(file: File, userId: string, type: string): Promise<boolean> {
    const response = await this.uploadFile(file, 'sri', `${userId}_${type}` );
    return response.status;
  }
}
