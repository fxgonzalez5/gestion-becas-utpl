import { Component, inject } from '@angular/core';

import { AuthService } from '../../../../auth/services/auth.service';
import { DecisionTableComponent } from '../../components/decision-table/decision-table.component';

@Component({
  imports: [DecisionTableComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export default class HomePageComponent {
  private authService = inject(AuthService);

  public get isNotCompleted(): boolean | null {
    return this.authService.currentUser()!.has_completed_the_table;
  }
}
