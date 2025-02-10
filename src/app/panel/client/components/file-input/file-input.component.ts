import { Component, computed, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'panel-file-input',
  templateUrl: './file-input.component.html',
  styles: ``
})
export class FileInputComponent {
  @Output()
  public fileSelected = new EventEmitter<File>();

  private _selectedFileName = signal<string>('');

  public selectedFileName = computed(() => this._selectedFileName());

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this._selectedFileName.set(file.name);
      this.fileSelected.emit(file);
    } else {
      alert('Por favor seleccione un archivo PDF');
      event.target.value = '';
    }
  }
}
