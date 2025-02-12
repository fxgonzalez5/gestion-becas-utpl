import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ApplicationScholarship } from '@shared/interfaces/application-scholarship.interface';

@Component({
  selector: 'panel-admin-scholarship-table',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './scholarship-table.component.html',
  styles: `
    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
    }
    th, td, input {
      text-align: center;
    }
    th {
      background-color: #004270 !important;
      color: white;
      font-size: 1rem;
    }
    td {
      background-color: #E6E6E6 !important;
    }
  `
})
export class ScholarshipTableComponent {
  @Input()
  public set assignmentScholarships(value: ApplicationScholarship[]) {
    this.scholarships = value;
    this.backupScholarships.set([...value]);
  };

  @Input()
  public updatedScholarships?: (updatedScholarships: ApplicationScholarship[]) => void;

  // Lista de becas
  public scholarships!: ApplicationScholarship[];

  // Copia de seguridad para restaurar valores en caso de cancelar edición
  private backupScholarships = signal<ApplicationScholarship[]>([]);

  // Definir columnas de la tabla
  private columns = signal(['name', 'economic', 'health', 'academic', 'sports', 'percentage', 'score', 'edit', 'confirm', 'cancel']);

  public displayedColumns = computed(() => this.columns());

  // Habilitar edición de una fila específica
  enableEdit(index: number) {
    const updatedScholarships: ApplicationScholarship[] = [...this.scholarships];
    updatedScholarships[index].isEditing = true;
    this.scholarships = updatedScholarships;
  }

  // Confirmar edición y guardar cambios
  confirmEdit(index: number) {
    const updatedScholarships: ApplicationScholarship[] = [...this.scholarships];
    const total = this.getTotal(updatedScholarships[index]);

    if (total !== 100) {
      alert('La suma de los valores debe ser exactamente 100%. Actualmente es ' + total + '%.');
      return;
    }

    updatedScholarships[index].isEditing = false;
    this.scholarships = updatedScholarships;
    this.backupScholarships.set([...updatedScholarships]);

    // Guardar los valores sin la propiedad `isEditing`
    const scholarshipsToSave = updatedScholarships.map(({ isEditing, ...scholarship }) => scholarship);
    if (this.updatedScholarships) {
      this.updatedScholarships(scholarshipsToSave);
    }
  }

  // Cancelar edición
  cancelEdit(index: number) {
    const updatedScholarships: ApplicationScholarship[] = [...this.scholarships];
    updatedScholarships[index] = { ...this.backupScholarships()[index] };
    updatedScholarships[index].isEditing = false;
    this.scholarships = updatedScholarships;
  }

  // Calcular el total de los valores en una fila
  getTotal(scholarship: ApplicationScholarship): number {
    const scholarshipObj = { ...scholarship };
    const { id, name, percentage, score, isEditing, ...rest } = scholarshipObj;

    return Object.values(rest).reduce((total, value) => total + value, 0);
  }
}
