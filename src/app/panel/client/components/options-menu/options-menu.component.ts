import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'panel-options-menu',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './options-menu.component.html',
  styles: `
    mat-select, mat-option {
      @apply md:text-lg sm:text-sm sm:h-5
    }
  `,
})
export class OptionsMenuComponent {
  @Input()
  public width: string = '';

  @Input()
  public label: string = '';

  private _options: string[] = [];

  @Input()
  set options(value: string[]) {
    this._options = value;

    if (value.length === 0) {
      switch (this.label) {
        case 'Modalidad':
          this.options = ['NINGUNA'];
          break;
        default:
          this.options = ['NINGUNO'];
          break;
      }
    }

    // Establecer el primer valor como
    if (this.label === 'Período'){
      this.selectedValue.set(this._options[1]);
      return;
    }
    this.selectedValue.set(this._options[0]);
  }

  get options(): string[] {
    return this._options;
  }

  // Señal para el valor seleccionado
  public selectedValue = signal<string | null>(null);

  // Evento para emitir el cambio de selección
  @Output()
  public selectionChange = new EventEmitter<any>();

  // Método para manejar el cambio de selección
  onSelectionChange(value: string): void {
    this.selectedValue.set(value);
    this.selectionChange.emit(value);
  }
}
