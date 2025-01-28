import { Component, computed, inject, Input, OnInit, signal} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { Requirement } from '../../interfaces';

@Component({
  imports: [MatCardModule, MatButtonModule],
  selector: 'panel-requirement-card',
  templateUrl: './requirement-card.component.html',
  styleUrls: ['./requirement-card.component.css']
})
export class RequirementCardComponent implements OnInit{
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Input()
  public requirement!: Requirement;


  private _textButton = signal<string>('Abrir');

  public textButton = computed(() => this._textButton());

  ngOnInit(): void {
    if (!this.requirement) {
      throw Error('Se requiere la propiedad del requerimiento para mostrar la tarjeta');
    }

    if (!['form', 'map'].includes(this.requirement.route) && !this.requirement.route.includes('http')) this._textButton.set('Validar')
  }

  onClick(): void {
    if (this.requirement.route.includes('http')) {
      window.open(this.requirement.route, '_blank');
    } else {
      this.router.navigate([this.requirement.route], { relativeTo: this.activatedRoute },);
    }
  }
}
