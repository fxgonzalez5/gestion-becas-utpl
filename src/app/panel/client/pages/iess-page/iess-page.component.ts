import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ValidationService } from '@shared/services/validation.service';
import { ShortFormSectionComponent } from '../../components/short-form-section/short-form-section.component';
import { IessService } from '../../services/iess.service';
import { InputModel } from '../../interfaces';

@Component({
  imports: [ReactiveFormsModule, ShortFormSectionComponent],
  templateUrl: './iess-page.component.html',
  styleUrl: './iess-page.component.css',
})
export default class IessPageComponent {
  private iessService = inject(IessService);
  private validationService = inject(ValidationService);

  // Controles reactivos para los inputs
  public affiliations = new FormControl(1);
  public noAffiliations = new FormControl(1);

  // Base de inputs
  private baseInputsAffiliation: InputModel[] = [
    { id: 1, icon: 'badge', placeholder: 'Número de cédula', type: 'text', value: '', iconStatus: '' },
    { id: 2, icon: 'lock', placeholder: 'Contraseña', type: 'password', value: '', iconStatus: '' },
  ];

  private baseInputsNoAffiliation: InputModel[] = [
    { id: 1, icon: 'badge', placeholder: 'Número de cédula', type: 'text', value: '', iconStatus: '' },
    { id: 2, icon: 'today', placeholder: '', type: 'date', value: '', iconStatus: '' },
  ];

  // Listas de inputs dinámicos
  public inputsAffiliationList: InputModel[] = [...this.baseInputsAffiliation];
  public inputsNoAffiliationList: InputModel[] = [...this.baseInputsNoAffiliation];

  ngOnInit(): void {
    this.validationService.setValidateFn(() => this.onConfirm());

    // Suscribirse a los cambios en los valores de los controles
    this.affiliations.valueChanges.subscribe((value) => {
      this.updateInputsList(value ?? 0, this.baseInputsAffiliation, this.inputsAffiliationList);
    });

    this.noAffiliations.valueChanges.subscribe((value) => {
      this.updateInputsList(value ?? 0, this.baseInputsNoAffiliation, this.inputsNoAffiliationList);
    });
  }

  private updateInputsList(value: number, baseInputs: InputModel[], targetList: InputModel[]): void {
    targetList.length = 0;
    for (let i = 0; i < value; i++) {
      const clonedInputs = baseInputs.map((input) => ({
        ...input,
        id: input.id + i * baseInputs.length,
      }));
      targetList.push(...clonedInputs);
    }
  }

  onInputsAffiliationChange(inputs: InputModel[]): void {
    this.inputsAffiliationList = inputs;
  }

  onInputsNoAffiliationChange(inputs: InputModel[]): void {
    this.inputsNoAffiliationList = inputs;
  }

  private async validateCredentials(): Promise<boolean> {
    let allValid = true;

    //* Validar lista de afiliados
    if (this.inputsAffiliationList.length > 0) {
      for (let index = 0; index < this.inputsAffiliationList.length; index += 2) {
        const id = this.inputsAffiliationList[index].value;
        const key = this.inputsAffiliationList[index + 1].value;

        try {
          const isValid = await this.iessService.validateAffiliatedUser(id, key);
          if (!isValid) allValid = false;

          this.inputsAffiliationList = this.inputsAffiliationList.map((item, i) => {
            if (i === index || i === index + 1) {
              return {
                ...item,
                iconStatus: isValid ? 'check' : 'warning_amber'
              };
            }
            return item;
          });
        } catch (error) {
          console.error('Error al validar al usuario que es afiliado', error);
          allValid = false;
        }
      }
    }

    //* Validar lista de no afiliados
    if (this.inputsNoAffiliationList.length > 0) {
      for (let index = 0; index < this.inputsNoAffiliationList.length; index += 2) {
        const id = this.inputsNoAffiliationList[index].value;
        const date = this.inputsNoAffiliationList[index + 1].value;

        try {
          const isValid = await this.iessService.validateUnaffiliatedUser(id, date);
          if (!isValid) allValid = false;

          this.inputsNoAffiliationList = this.inputsNoAffiliationList.map((item, i) => {
            if (i === index || i === index + 1) {
              return {
                ...item,
                iconStatus: isValid ? 'check' : 'warning_amber'
              };
            }
            return item;
          });
        } catch (error) {
          console.error('Error al validar usuario no afiliado', error);
          allValid = false;
        }
      }
    }

    return allValid;
  }

  private async onConfirm(): Promise<[boolean, boolean | null]> {
    // Ejecutar la validación de los inputs
    const isValid = await this.validateCredentials();

    // Definir que no se guardaran archivos
    let savedFiles = null;

    // Retornar el resultado de la validación y si se guardaron los archivos
    return [isValid, savedFiles];
  }
}
