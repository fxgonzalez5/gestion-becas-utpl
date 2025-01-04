import { Component, Input, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Scholarship } from '../../interfaces';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'panel-scholarship-card',
    imports: [RouterModule, MatCardModule, MatButtonModule],
    templateUrl: './scholarship-card.component.html',
    styleUrls: ['./scholarship-card.component.css']
})
export class ScholarshipCardComponent implements OnInit {
  @Input()
  public scholarship!: Scholarship;

  ngOnInit(): void {
    if (!this.scholarship) {
        throw Error('Se requiere la propiedad de beca para mostrar la tarjeta');
    }
  }
}
