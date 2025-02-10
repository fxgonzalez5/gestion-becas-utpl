import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { ValidationService } from '@shared/services/validation.service';
import { ScholarshipsService } from '../../services/scholarships.service';
import { RequirementsService } from '../../services/requirements.service';

@Component({
  imports: [RouterModule],
  templateUrl: './validation-layout.component.html',
  styleUrl: './validation-layout.component.css',
})
export default class ValidationLayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private validationService = inject(ValidationService);
  private requirementsService = inject(RequirementsService);

  private applicationId = inject(ScholarshipsService).appliedScholarshipId();
  private requirementId: number | null = null;

  ngOnInit(): void {
    const idRequirement = sessionStorage.getItem('requirementId');
    if (idRequirement) {
      this.requirementId = Number(idRequirement);
    }
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

      // Validar el requerimiento
      this.validateRequirement(status, load_documentation);
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

  private validateRequirement(status: boolean, load_documentation: boolean | null): void {
    if (this.applicationId === 0 || this.requirementId === null) return;

    this.requirementsService.updateRequirementStatus(this.applicationId, this.requirementId, status, load_documentation)
    .subscribe( {
      next: () => { if (status) this.goBack(); },
      error: () => alert('Hubo un error al validar el requerimiento. Por favor, inténtalo de nuevo más tarde.')
    });
  }
}
