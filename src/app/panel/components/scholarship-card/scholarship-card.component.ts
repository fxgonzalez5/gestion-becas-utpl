import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Scholarship } from '../../interfaces';

@Component({
    selector: 'panel-scholarship-card',
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
    templateUrl: './scholarship-card.component.html',
    styleUrls: ['./scholarship-card.component.css']
})
export class ScholarshipCardComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Input()
  public scholarship!: Scholarship;

  ngOnInit(): void {
    if (!this.scholarship) {
      throw Error('Se requiere la propiedad de beca para mostrar la tarjeta');
    }
  }

  onClick(): void {
    // TODO: Implementar lógica para postular a la beca
    this.router.navigate([this.scholarship.id, 'requirements'], { relativeTo: this.activatedRoute });
  }
}
