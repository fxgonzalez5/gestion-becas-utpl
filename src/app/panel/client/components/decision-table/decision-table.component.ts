import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';

import { AuthService } from '../../../../auth/services/auth.service';
import { ScholarshipsService } from '../../services/scholarships.service';

@Component({
  selector: 'panel-decision-table',
  imports: [CommonModule, MatTableModule, MatRadioModule],
  templateUrl: './decision-table.component.html',
  styleUrl: './decision-table.component.css',
})
export class DecisionTableComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private scholarshipsService = inject(ScholarshipsService);

  // Columnas de la tabla
  public columns = signal<string[]>(['condición', '1', '2', '3', '4', '5']).asReadonly();

  // Filas de la tabla
  public rows = signal<string[]>([
    'Estatus económico',
    'Estado laboral',
    'Tamaño del grupo familiar',
    'Cuenta con servicios',
    'Estado de salud',
    'Integración en la sociedad',
    'Relación familiar dentro de la universidad',
    'Afiliación religiosa',
    'Sustento de movilidad',
    'Promedio académico de estudios secundarios',
    'Reconocimientos académicos',
    'Logros deportivos'
  ]);

  // Mapeo de selecciones (clave: condición, valor: número seleccionado)
  public selectedValues = signal<Record<string, number>>({});

  // Método para seleccionar un valor en una fila
  onSelect(condition: string, value: number): void {
    this.selectedValues.update((prev) => ({ ...prev, [condition]: value }));
  }

  private recommendScholarship(): number {
    const selections = this.selectedValues();

    if (selections['Estado de salud'] === 1 &&
        selections['Estado laboral'] === 1 &&
        selections['Estatus económico'] < 3) {
      return 4;
    }

    if (selections['Estatus económico'] <= 3) {
      const familySize = selections['Tamaño del grupo familiar'];
      const familyMembers = familySize >= 4 ? 5 : familySize === 3 ? 4 : 2;

      if (familyMembers >= 4 || selections['Estado laboral'] <= 2) {
        return 1;
      }
    }

    if (selections['Logros deportivos'] >= 4 &&
        selections['Promedio académico de estudios secundarios'] >= 3) {
      return 17;
    }

    if (selections['Promedio académico de estudios secundarios'] >= 4 &&
        selections['Reconocimientos académicos'] >= 4) {
      return 14;
    }

    if (selections['Relación familiar dentro de la universidad'] === 5) {
      return 9;
    }

    if ((selections['Promedio académico de estudios secundarios'] === 3 &&
        selections['Reconocimientos académicos'] === 3) ||
        selections['Integración en la sociedad'] >= 4) {
      return 15;
    }

    // Beca por defecto (La mayor solicitada)
    return 1;
  }

  onConfirm(): void {
    // Verificar que todas las condiciones tengan un valor seleccionado
    if (this.rows().every(condition => this.selectedValues()[condition] !== undefined)) {
      const user = this.authService.currentUser()!;

      this.authService.updateCompletedTable(user?.id, true)
      .subscribe( {
        next: () => {
            const recommendedScholarshipId: number = this.recommendScholarship();
            this.scholarshipsService.recommendedScholarships.set([recommendedScholarshipId]);
            sessionStorage.setItem('recommendedScholarships', JSON.stringify(this.scholarshipsService.recommendedScholarships()));

            user.has_completed_the_table = true;
            this.router.navigateByUrl('/panel/scholarships');
          },
          error: () => alert('Hubo un error al validar la tabla. Inténtalo de nuevo.')
        });
    } else {
      alert('¡Por favor completa todas las condiciones!');
    }
  }

  onNext(): void {
    const user = this.authService.currentUser()!;

    this.authService.updateCompletedTable(user?.id, false)
      .subscribe( {
        next: () => { user.has_completed_the_table = false; },
        error: () => alert('Hubo un error al cerrar la tabla de decisión. Inténtalo de nuevo.')
      });
  }
}
