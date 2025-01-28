import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModel } from '../../interfaces/input-model.interface';

@Component({
  imports: [CommonModule],
  selector: 'panel-custom-input',
  templateUrl: './custom-input.component.html',
  styles: ``
})
export class CustomInputComponent implements OnInit {
  @Input()
  public inputModel!: InputModel;

  @Output()
  public valueChange = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.inputModel) {
      throw Error('Se requiere la propiedad del input para mostrar el componente');
    }
  }

  onInputChange(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    input.value = value;
    this.valueChange.emit(value);
  }
}
