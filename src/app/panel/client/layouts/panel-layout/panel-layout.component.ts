import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './panel-layout.component.html',
  styleUrl: './panel-layout.component.css',
})
export default class PanelLayoutComponent {
  private authService = inject(AuthService);

  public get isCompleted(): boolean | null {
    return this.authService.currentUser()!.has_completed_the_table;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
