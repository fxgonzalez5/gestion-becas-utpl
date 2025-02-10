import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [],
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
})

export default class FormPageComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
