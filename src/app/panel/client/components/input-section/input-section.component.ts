import { Component, computed, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';

import { CustomInputComponent } from '../custom-input/custom-input.component';
import { InputModel } from '../../interfaces';

@Component({
  selector: 'panel-input-section',
  imports: [CustomInputComponent],
  templateUrl: './input-section.component.html',
})
export class InputSectionComponent implements OnChanges {
  @Input()
  public inputsList: InputModel[] = [];

  @Output()
  public inputsChange = new EventEmitter<InputModel[]>();

  private _dynamicInputs = signal<InputModel[]>(this.inputsList);

  public dynamicInputs = computed(() => this._dynamicInputs());

  ngOnChanges(): void {
    this._dynamicInputs.set(this.inputsList);
  }

  addInput(): void {
    const newInput = {
      ...this.inputsList[0],
      id: this.dynamicInputs().length + 1,
      value: '',
    };
    this._dynamicInputs.update(inputs => [...inputs, newInput]);
    this.inputsChange.emit(this._dynamicInputs());
  }

  removeInput(id: number): void {
    this._dynamicInputs.update(inputs =>
      inputs.filter(input => input.id !== id)
    );
    this.inputsChange.emit(this._dynamicInputs());
  }

  updateInputValue(id: number, value: string): void {
    this._dynamicInputs.update(inputs =>
      inputs.map(input => {
        if (input.id === id) return { ...input, value };
        return input;
      })
    );
    this.inputsChange.emit(this._dynamicInputs());
  }
}
