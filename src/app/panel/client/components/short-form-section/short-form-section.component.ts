import { Component, computed, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';

import { CustomInputComponent } from '../custom-input/custom-input.component';
import { InputModel } from '../../interfaces';

@Component({
  selector: 'panel-client-short-form-section',
  imports: [CustomInputComponent],
  templateUrl: './short-form-section.component.html',
})
export class ShortFormSectionComponent implements OnChanges {
  @Input()
  public inputsList: InputModel[] = [];

  @Output()
  public inputsChange = new EventEmitter<InputModel[]>();

  private _dynamicInputs = signal<InputModel[]>(this.inputsList);

  public dynamicInputs = computed(() => this._dynamicInputs());

  ngOnChanges(): void {
    this._dynamicInputs.set(this.inputsList);
  }

  getSequentialNumber(oddNumber: number): number {
    return (oddNumber + 1) / 2;
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
