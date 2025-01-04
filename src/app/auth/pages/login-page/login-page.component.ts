import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'

import { ValidatorsService } from '@shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [ CommonModule, MatButtonModule, ReactiveFormsModule ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export default class LoginPageComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Formulario reactivo
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  // Variables para almacenar errores
  public emailError: string | null = null;
  public passwordError: string | null = null;

  // Error general
  private errorMessage: string = 'Contraseña o identificador de usuario incorrectos. Escriba la contraseña y el identificador de usuario correctos e inténtelo de nuevo.';

  // Método para validar el email
  private validateEmail(): void {
    const email = this.myForm.get('email')?.value;

    if (!email) {
      this.emailError = 'Escriba el identificador de usuario con el formato "dominio\\usuario" o "usuario@dominio".';
    } else if (!this.validatorsService.emailPattern.test(email)) {
      this.emailError = this.errorMessage;
    }
  }

  // Método para validar la contraseña
  private validatePassword(): void {
    const password = this.myForm.get('password')?.value;

    if (!password || password.length < 8) {
      this.passwordError = this.errorMessage;
    }
  }

  // Método para limpiar errores
  private resetErrors(): void {
    this.emailError = null;
    this.passwordError = null;
  }

  onSubmit():void {
    this.resetErrors();

    // Ejecutar validaciones
    this.validateEmail();
    this.validatePassword();

    if (!this.emailError && !this.passwordError) {
      const { email, password } = this.myForm.value;

      this.authService.login(email, password)
        .subscribe({
          next: () => this.router.navigateByUrl('/panel'),
          error: (message) => Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
          })
        });
    }
  }
}
