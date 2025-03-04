import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputModel } from '../../interfaces/input-model.interface';

@Component({
  selector: 'panel-custom-input',
  templateUrl: './custom-input.component.html',
  styles: `
    /* Ocultar el icono del calendario en navegadores compatibles */
    input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }

    /* Para Firefox */
    input[type="date"]::-moz-calendar-picker-indicator {
      display: none;
    }
  `
})
export class CustomInputComponent implements OnInit {
  @Input()
  public inputModel!: InputModel;

  @Input()
  public isNumber: boolean = false;

  @Output()
  public valueChange = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.inputModel) {
      throw Error('Se requiere la propiedad del input para mostrar el componente');
    }
  }

  onInputChange(event: any): void {
    const input = event.target;
    if (!this.isNumber) {
      this.valueChange.emit(input.value);
      return;
    }

    const value = input.value.replace(/\D/g, '');
    input.value = value;
    this.valueChange.emit(value);
  }
}
