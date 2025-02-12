import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LocalScholarship } from '../../interfaces/loca-scholarship.interface';

@Component({
  selector: 'panel-admin-local-scholarship-table',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './local-scholarship-table.component.html',
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
export class LocalScholarshipTableComponent {
  @Input()
  public scholarships?: LocalScholarship[] = [
    { id: 1, type: 'Nivel de Ingresos', category: 'Apoyo Económico', percentage: 60, priority: 4 },
  ];

  // Copia de seguridad para restaurar valores en caso de cancelar edición
  private backupScholarships = signal(JSON.parse(JSON.stringify(this.scholarships || [])));

  // Definir columnas de la tabla
  private columns = signal(['type', 'category', 'percentage', 'priority', 'edit', 'confirm', 'cancel']);

  public displayedColumns = computed(() => this.columns());

  // Definir las prioridades de las becas
  private _priorities = [
    { value: 1, label: 'Baja' },
    { value: 2, label: 'Media - Baja' },
    { value: 3, label: 'Media' },
    { value: 4, label: 'Media - Alta' },
    { value: 5, label: 'Alta' }
  ];

  public get priorities() { return this._priorities; }

  getPriorityLabel( priority: number ): string {
    return this._priorities.find( p => p.value === priority )!.label;
  }

  // Habilitar edición de una fila específica
  enableEdit(index: number) {
    const updatedBecas = [...this.scholarships!];
    updatedBecas[index].isEditing = true;
    this.scholarships = updatedBecas;
  }

  // Confirmar edición y guardar cambios
  confirmEdit(index: number) {
    const updatedBecas = [...this.scholarships!];
    updatedBecas[index].isEditing = false;
    this.scholarships = updatedBecas;
    this.backupScholarships.set(JSON.parse(JSON.stringify(this.scholarships)));

  }

  // Cancelar edición
  cancelEdit(index: number) {
    const updatedBecas = [...this.scholarships!];
    updatedBecas[index] = { ...this.backupScholarships()[index] };
    updatedBecas[index].isEditing = false;
    this.scholarships = updatedBecas;
  }
}
