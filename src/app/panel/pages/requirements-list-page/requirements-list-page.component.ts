import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { RequirementCardComponent } from '../../components/requirement-card/requirement-card.component';
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
  private requirementsService = inject(RequirementsService);

  private _requirementsList = signal<Requirement[]>([]);

  public requirementsList = computed(() => this._requirementsList());

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      ({ id }) => this.loadRequirements(Number(id) ?? 0)
    );
  }

  private loadRequirements(scholarshipId: number): void {
    this.requirementsService.getRequirementsByScholarship(scholarshipId)
      .subscribe({
        next: requirements => this._requirementsList.set(requirements),
        error: error => console.error(error),
      });
  }
}
