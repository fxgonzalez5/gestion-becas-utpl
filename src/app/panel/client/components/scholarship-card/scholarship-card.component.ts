import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'

import { AuthService } from '../../../../auth/services/auth.service';
import { ScholarshipsService } from '../../services/scholarships.service';
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
  private userId = inject(AuthService).currentUser()!.id;
  private scholarshipsService = inject(ScholarshipsService);

  private appliedScholarshipId = this.scholarshipsService.appliedScholarshipId();

  @Input()
  public scholarship!: Scholarship;
  @Input()
  public currentYear!: string;
  @Input()
  public currentPeriod!: string;
  @Input()
  public currentModality!: string;

  ngOnInit(): void {
    if (!this.scholarship) {
      throw Error('Se requiere la propiedad de beca para mostrar la tarjeta');
    }
  }

  getButtonText(): string {
    return this.appliedScholarshipId === this.scholarship.id ? 'Revisar' : 'Postular';
  }

  getButtonClass(): string {
    return this.appliedScholarshipId === this.scholarship.id ? 'btn-applied' : 'btn-card';
  }

  onClick(): void {
    if (this.appliedScholarshipId === this.scholarship.id) {
      this.scholarshipsService.activeRequirements.set(false);
      this.router.navigate([this.scholarship.id, 'requirements'], { relativeTo: this.activatedRoute });
    } else if (this.appliedScholarshipId) {
      this.showAlert('Ya has postulado por una beca', 'Para poder postular por esta beca, debes eliminar la postulación actual.', 'info');
    } else {
      this.showConfirmationAlert();
    }
  }

  private showAlert(title: string, text: string, icon: 'warning' | 'error' | 'success' | 'info' | 'question'): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    });
  }

  private showConfirmationAlert(): void {
    Swal.fire({
      title: `¿Estás seguro de postular por la beca de ${this.scholarship.type}?`,
      text: "Una vez que se realices la postulación, no podrás postular por otra beca.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.applyForScholarship();
      }
    });
  }

  private applyForScholarship(): void {
    this.scholarshipsService.applyScholarship(this.userId, this.scholarship.id, Number(this.currentYear), this.currentPeriod, this.currentModality)
      .subscribe( {
        next: () => this.router.navigate([this.scholarship.id, 'requirements'], { relativeTo: this.activatedRoute }),
        error: () => alert('Hubo un error al postular por la beca. Por favor, inténtalo de nuevo más tarde.')
      });
  }
}
