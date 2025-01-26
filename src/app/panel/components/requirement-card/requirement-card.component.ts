import { Component, Input, OnInit} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Requirement } from '../../interfaces';

@Component({
  imports: [MatCardModule, MatButtonModule],
  selector: 'panel-requirement-card',
  templateUrl: './requirement-card.component.html',
  styleUrls: ['./requirement-card.component.css']
})
export class RequirementCardComponent implements OnInit{
  @Input()
  public requirement!: Requirement;

  ngOnInit(): void {
    if (!this.requirement) {
      throw Error('Se requiere la propiedad del requerimiento para mostrar la tarjeta');
    }
  }

  onClick(): void {
    // TODO: Implementar lógica para abrir el requerimiento
  }
}
