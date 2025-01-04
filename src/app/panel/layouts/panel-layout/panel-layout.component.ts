import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ScholarshipsService } from '../../services/scholarships.service';

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
  private scholarshipsService = inject(ScholarshipsService);

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.scholarshipsService.loadScholarships()
      .subscribe({
        error: (error) => {
          console.error('Error al cargar la información de becas:', error);
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }

}
