import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { ValidationService } from '@shared/services/validation.service';

@Component({
  imports: [RouterModule],
  templateUrl: './validation-layout.component.html',
  styleUrl: './validation-layout.component.css',
})
export default class ValidationLayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private validationService = inject(ValidationService);

  ngOnInit(): void {
    const idRequirement = sessionStorage.getItem('requirementId');
    console.log('ID del requerimiento:', idRequirement);
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('requirementId');
  }

  async onConfirm(): Promise<void> {
    try {
      // Obtener la función de validación registrada dinámicamente
      const validateFn = await firstValueFrom(this.validationService.validateFn$);

      // Ejecutar la función de validación
      const [status, load_documentation] = await validateFn();

      // TODO: Enviar el resultado de la validación al backend
      console.log('Resultado de la validación:', status, load_documentation);
    } catch (error) {
      console.error('Error durante la validación:', error);
    }
  }


  goBack(): void {
    const afterUrl = this.activatedRoute.snapshot.pathFromRoot
      .flatMap(route => route.url)
      .map(segment => segment.path)
      .slice(0, -1)
      .join('/');

    this.router.navigateByUrl(afterUrl, { replaceUrl: true });
  }
}
