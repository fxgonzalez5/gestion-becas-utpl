import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../../auth/services/auth.service';
import { ApplicationScholarshipsService } from '@shared/services/application-scholarships.service';
import { ScholarshipsService } from '../../services/scholarships.service';
import { ApplicationScholarship } from '@shared/interfaces/application-scholarship.interface';

@Component({
  selector: 'panel-client-introduction-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './introduction-form.component.html',
  styleUrl: './introduction-form.component.css',
})
export class IntroductionFormComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private scholarshipsService = inject(ScholarshipsService);
  private applicationScholarshipsService = inject(ApplicationScholarshipsService);

  private applicationScholarships = signal<ApplicationScholarship[]>([]);

  public form: FormGroup = this.fb.group({
    economic: [5],
    health: [0],
    academic: [1],
    sports: [0]
  });

  ngOnInit(): void {
    this.loadScholarships();
  }

  private loadScholarships(): void {
    this.applicationScholarshipsService.getApplicationScholarships().subscribe((scholarships) => {
      this.applicationScholarships.set(scholarships);
    });
  }

  private recommendScholarship(selections: Record<string, number>): number[] {
    const results: { id: number; score: number; percentage: number }[] = [];

    for (const scholarship of this.applicationScholarships()) {
      let total = 0;
      for (const [criterio, value] of Object.entries(selections)) {
        const weight = Number(scholarship[criterio as keyof ApplicationScholarship]) / 100;
        total += value * weight;
      }

      if (total >= scholarship.score) {
        results.push({ id: scholarship.id, score: total, percentage: scholarship.percentage });
      }
    }

    results.sort((b, a) => {
      if (b.percentage > a.percentage && b.score >= a.score - 0.3) {
        return a.percentage - b.percentage;
      }
      return 1;
    });

    return results.length > 0 ? results.slice(0, 3).map(item => item.id) : [1];
  }

  onSubmit(): void {
    const formValues = this.form.value;
    const user = this.authService.currentUser()!;

    this.authService.updateCompletedTable(user?.id, true)
      .subscribe({
        next: () => {
          const recommendedScholarshipsId: number[] = this.recommendScholarship(formValues);
          this.scholarshipsService.recommendedScholarships.set(recommendedScholarshipsId);
          sessionStorage.setItem('recommendedScholarships', JSON.stringify(this.scholarshipsService.recommendedScholarships()));

          user.has_completed_the_table = true;
          this.router.navigateByUrl('/panel/scholarships');
        },
        error: () => alert('Hubo un error al validar la tabla. Inténtalo de nuevo.')
      });
  }

  onNext(): void {
    const user = this.authService.currentUser()!;

    this.authService.updateCompletedTable(user?.id, false)
      .subscribe( {
        next: () => { user.has_completed_the_table = false; },
        error: () => alert('Hubo un error al cerrar la tabla de decisión. Inténtalo de nuevo.')
      });
  }
}
