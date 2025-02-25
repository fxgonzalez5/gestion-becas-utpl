import { Component, inject } from '@angular/core';

import { AuthService } from '../../../../auth/services/auth.service';
import { IntroductionFormComponent } from '../../components/introduction-form/introduction-form.component';

@Component({
  imports: [IntroductionFormComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export default class HomePageComponent {
  private authService = inject(AuthService);

  public get isNotCompleted(): boolean | null {
    return this.authService.currentUser()!.has_completed_the_table;
  }
}
