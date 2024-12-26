import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'shared-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styles: ``,
})
export class MenuComponent {
  @Input()
  public routes: Route[] = [];

  @Output()
  public optionSelected = new EventEmitter<void>();

  onOptionSelected(): void {
    this.optionSelected.emit();
  }
}
