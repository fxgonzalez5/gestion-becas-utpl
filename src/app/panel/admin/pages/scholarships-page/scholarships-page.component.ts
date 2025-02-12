import { Component, OnInit } from '@angular/core';

import { LocalScholarshipTableComponent } from '../../components/local-scholarship-table/local-scholarship-table.component';

@Component({
  imports: [LocalScholarshipTableComponent],
  templateUrl: './scholarships-page.component.html',
  styleUrl: './scholarships-page.component.css',
})
export default class ScholarshipsPageComponent implements OnInit {
  ngOnInit(): void {}
}
