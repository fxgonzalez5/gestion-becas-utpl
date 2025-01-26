import { Component, inject, OnInit} from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { ValidationService } from '@shared/services/validation.service';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { AuthService } from '../../../auth/services/auth.service';
import { CivilRegistryService } from '../../services/civil-registry.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Citizen, InputModel } from '../../interfaces';

@Component({
  imports: [InputSectionComponent, FileInputComponent],
  templateUrl: './civil-registry-page.component.html',
  styleUrls: ['./civil-registry-page.component.css'],
})
export default class CivilRegistryPageComponent implements OnInit {
  private userId = inject(AuthService).currentUser()!.id;
  private civilRegistryService = inject(CivilRegistryService);
  private fileUploadService = inject(FileUploadService);
  private validationService = inject(ValidationService);

  public inputsList: InputModel[] = [
    { id: 1, icon: 'badge', placeholder: 'Número de cédula', type: 'text', value: '', iconStatus: '' }
  ];

  private _selectedFile?: File;

  ngOnInit(): void {
    this.validationService.setValidateFn(() => this.onConfirm());
  }

  onInputsChange(inputs: InputModel[]): void {
    this.inputsList = inputs;
  }

  onFileSelected(file: File): void {
    this._selectedFile = file;
  }

  private async validateInputs(): Promise<boolean> {
    let allValid = true;
    const citizens: Citizen[] = [];

    for (const input of this.inputsList) {
      if (!input.value.trim()) {
        allValid = false;
        continue;
      };

      try {
        const citizen = await firstValueFrom(this.civilRegistryService.getCitizen(input.value));
        if (citizen !== null) citizens.push(citizen);

        this.inputsList = this.inputsList.map(item => {
          if (item.id === input.id) {
            const isValid = citizen !== null;
            if (!isValid) allValid = false;

            return {
              ...item,
              iconStatus: isValid ? 'check' : 'warning_amber'
            };
          }
          return item;
        });
      } catch (error) {
        console.error('Error al obtener el ciudadano', error);
        allValid = false;
      }
    }

    if (allValid) allValid = this.validateFamilyRelationships(citizens);

    return allValid;
  }

  private validateFamilyRelationships(citizens: Citizen[]): boolean {
    if (citizens.length < 2) return true;

    const firstCitizen = citizens[0];
    const firstSurnames = this.extractSurnames(firstCitizen);

    for (let i = 1; i < citizens.length; i++) {
      const citizen = citizens[i];
      const surnames = this.extractSurnames(citizen);
      const hasCommonSurname = surnames.some((surname, index) => firstSurnames[index] === surname);

      if (!hasCommonSurname) {
        this.inputsList = this.inputsList.map(item => {
          if (item.id === i + 1) {
            return {
              ...item,
              iconStatus: 'warning_amber'
            };
          }
          return item;
        });
        return false;
      }
    }

    return true;
  }

  private extractSurnames(citizen: Citizen): string[] {
    const surnames = citizen.Apellidos.split(' ');
    return surnames;
  }

  private async uploadFile(file: File): Promise<boolean> {
    try {
      return await this.fileUploadService.uploadCivilRegistryFile(file, this.userId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async onConfirm(): Promise<[boolean, boolean | null]> {
    // Ejecutar la validación de los inputs
    const isValid = await this.validateInputs();
    let savedFile = false;

    // Si la validación de los inputs es correcta, guardar el archivo si fue cargado
    if (isValid && this._selectedFile) {
      savedFile = await this.uploadFile(this._selectedFile);
    }

    // Retornar el resultado de la validación y si se guardó algún archivo
    return [isValid, savedFile];
  }
}
