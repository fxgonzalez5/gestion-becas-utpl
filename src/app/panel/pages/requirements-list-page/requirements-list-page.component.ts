import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { RequirementCardComponent } from '../../components/requirement-card/requirement-card.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ScholarshipsService } from '../../services/scholarships.service';
import { RequirementsService } from '../../services/requirements.service';
import { Requirement } from '../../interfaces';


@Component({
  selector: 'panel-requirements-list-page',
  imports: [RequirementCardComponent, RouterModule],
  templateUrl: './requirements-list-page.component.html',
  styleUrl: './requirements-list-page.component.css',
})
export default class RequirementsListPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private scholarshipsService = inject(ScholarshipsService);
  private requirementsService = inject(RequirementsService);

  private _requirementsList = signal<Requirement[]>([]);

  public requirementsList = computed(() => this._requirementsList());

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      const lastSegment = url[url.length - 1].path;

      if (lastSegment === 'requirements') {
        const userId = this.authService.currentUser()!.id;
        const applicationId = this.scholarshipsService.appliedScholarshipId();
        if (applicationId) {
          this.loadRequirements(0, applicationId, userId);
        } else {
          this.activatedRoute.params.subscribe(
            ({ id }) => this.loadRequirements(Number(id) ?? 0)
          );
        }
      }
    });
  }

  private loadRequirements(scholarshipId: number, applicationId?: number, userId?: string): void {
    if (applicationId && applicationId > 0 && userId) {
      this.requirementsService.getRequirementsByApplication(Number(applicationId), userId)
      .subscribe({
        next: requirements => this._requirementsList.set(requirements),
        error: error => console.error(error),
      });
      return;
    }

    this.requirementsService.getRequirementsByScholarship(scholarshipId!)
      .subscribe({
        next: requirements => this._requirementsList.set(requirements),
        error: error => console.error(error),
      });
  }
}
