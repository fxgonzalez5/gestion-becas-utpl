import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { ApplicationScholarshipsService } from '@shared/services/application-scholarships.service';
import { ApplicationScholarship } from '@shared/interfaces/application-scholarship.interface';
import { ScholarshipTableComponent } from '../../components/scholarship-table/scholarship-table.component';

@Component({
  imports: [ScholarshipTableComponent],
  templateUrl: './scholarships-page.component.html',
  styleUrl: './scholarships-page.component.css',
})
export default class ScholarshipsPageComponent implements OnInit {
  private applicationScholarshipsService = inject(ApplicationScholarshipsService);

  private _applicationScholarships = signal<ApplicationScholarship[]>([]);

  public applicationScholarships = computed(() => this._applicationScholarships());

  ngOnInit(): void {
    this.loadScholarships();
  }

  private loadScholarships(): void {
    this.applicationScholarshipsService.getApplicationScholarships().subscribe((scholarships) => {
      this._applicationScholarships.set(scholarships);
    });
  }

  public saveScholarships(updatedScholarships: ApplicationScholarship[]): void {
    this.applicationScholarshipsService.updateApplicationScholarships(updatedScholarships).subscribe();
  }
}
