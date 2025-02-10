import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';


import { AuthService } from '../../../../auth/services/auth.service';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Application } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  templateUrl: './scholarship-applications-page.component.html',
  styleUrl: './scholarship-applications-page.component.css',
})
export default class ScholarshipApplicationsPageComponent implements OnInit {
  private router = inject(Router);
  private userId = inject(AuthService).currentUser()!.id;
  private scholarshipsService = inject(ScholarshipsService);

  private _applicationsList = signal<Application[]>([]);

  public applicationsList = computed(() => this._applicationsList());

  ngOnInit(): void {
    this.loadApplications();
  }

  private loadApplications(): void {
    this.scholarshipsService.getApplications(this.userId)
      .subscribe({
        next: applications => this._applicationsList.set(applications),
        error: error => console.error(error),
      });
  }

  onClick(scholarshipId: number): void {
    this.scholarshipsService.activeRequirements.set(true);
    this.router.navigateByUrl(`/panel/scholarships/${scholarshipId}/requirements`);
  }

  onDelete(applicationId: number): void {
    this.scholarshipsService.deleteApplication(applicationId)
      .subscribe({
        next: (success) => {
          if (!success) return;
          this._applicationsList.update((prev) => prev.filter(element => element.application_id !== applicationId));
        },
        error: error => console.error(error),
      });
  }

  onGeneratePDF(): void {
    // TODO: Implementar la generación de PDF
  }
}
