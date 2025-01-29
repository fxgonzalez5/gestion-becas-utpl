import { Component, computed, inject, OnInit, signal} from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { ValidationService } from '@shared/services/validation.service';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { AuthService } from '../../../auth/services/auth.service';
import { SriService } from '../../services/sri.service';
import { FileUploadService } from '../../services/file-upload.service';
import { InputModel } from '../../interfaces';

@Component({
  imports: [InputSectionComponent, FileInputComponent],
  templateUrl: './sri-page.component.html',
  styleUrls: ['./sri-page.component.css']
})
export default class SriPageComponent implements OnInit {
  private userId = inject(AuthService).currentUser()!.id;
  private sriService = inject(SriService);
  private fileUploadService = inject(FileUploadService);
  private validationService = inject(ValidationService);

  public inputsList: InputModel[] = [
    { id: 1, icon: 'assignment_ind', placeholder: 'Cédula o RUC', type: 'text', value: '', iconStatus: '' }
  ];
  private _isFileRequired = signal<boolean>(false);

  private _selectedFiles: File[] = [];
  public isFileRequired = computed(() => this._isFileRequired());

  ngOnInit(): void {
    this.validationService.setValidateFn(() => this.onConfirm());
  }

  onInputsChange(inputs: InputModel[]): void {
    this.inputsList = inputs;
  }

  onFileSelected(file: File, index: number): void {
    this._selectedFiles[index] = file;
  }

  private async validateInputs(): Promise<boolean> {
    let allValid = true;

    for (const input of this.inputsList) {
      if (!input.value.trim()) {
        allValid = false;
        continue;
      };

      try {
        const doesNotHaveRuc = await firstValueFrom(this.sriService.getRuc(input.value));

        this.inputsList = this.inputsList.map(item => {
          if (item.id === input.id) {
            let isValid = !doesNotHaveRuc;
            if (!isValid && this._selectedFiles.length === 0) {
              this._isFileRequired.set(true);
              allValid = false;
            } else {
              this._isFileRequired.set(false);
              isValid = true;
              allValid = true;
            };

            return {
              ...item,
              iconStatus: isValid ? 'check' : 'warning_amber'
            };
          }
          return item;
        });
      } catch (error) {
        console.error('Error al validar el ruc', error);
        allValid = false;
      }
    }

    return allValid;
  }

  private async uploadFile(file: File, type: string): Promise<boolean> {
    try {
      return await this.fileUploadService.uploadSriFile(file, this.userId, type);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async onConfirm(): Promise<[boolean, boolean | null]> {
    // Ejecutar la validación de los inputs
    const isValid = await this.validateInputs();
    let savedFiles = null;

    // Si la validación de los inputs es correcta, se guarda los archivos cargados
    if (isValid && this._selectedFiles.length > 0) {
      for (const [index, file] of this._selectedFiles.entries()) {
        const type = index === 0 ? 'RENTA' : 'IVA';
        savedFiles = await this.uploadFile(file, type);
      }
    }

    // Retornar el resultado de la validación y si se guardaron los archivos
    return [isValid, savedFiles];
  }
}
