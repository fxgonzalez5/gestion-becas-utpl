import { Component, inject } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { ValidationService } from '@shared/services/validation.service';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { IessService } from '../../services/iess.service';
import { InputModel } from '../../interfaces';

@Component({
  imports: [InputSectionComponent],
  templateUrl: './iess-page.component.html',
  styleUrl: './iess-page.component.css',
})
export default class IessPageComponent {
  private iessService = inject(IessService);
  private validationService = inject(ValidationService);

  public inputsList: InputModel[] = [
    { id: 1, icon: 'badge', placeholder: 'Número de cédula', type: 'text', value: '', iconStatus: '' }
  ];

  ngOnInit(): void {
    this.validationService.setValidateFn(() => this.onConfirm());
  }

  onInputsChange(inputs: InputModel[]): void {
    this.inputsList = inputs;
  }

  private async validateInputs(): Promise<boolean> {
    let allValid = true;

    for (const input of this.inputsList) {
      if (!input.value.trim()) {
        allValid = false;
        continue;
      };

      try {
        const affiliation = await firstValueFrom(this.iessService.getAffiliation(input.value));

        this.inputsList = this.inputsList.map(item => {
          if (item.id === input.id) {
            let isValid = affiliation.estado !== 'Inactive';
            if (!isValid) allValid = false;

            return {
              ...item,
              iconStatus: isValid ? 'check' : 'warning_amber'
            };
          }
          return item;
        });
      } catch (error) {
        console.error('Error al validar si es afiliado al IESS', error);
        allValid = false;
      }
    }

    return allValid;
  }

  private async onConfirm(): Promise<[boolean, boolean | null]> {
    // Ejecutar la validación de los inputs
    const isValid = await this.validateInputs();

    // Definir que no se guardaran archivos
    let savedFiles = null;

    // Retornar el resultado de la validación y si se guardaron los archivos
    return [isValid, savedFiles];
  }
}
