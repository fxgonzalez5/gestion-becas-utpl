import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums/auth-status.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  public finishedAuthCheck = computed<boolean>(() => this.authService.authStatus() !== AuthStatus.checking);

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/panel');
        return;
      case AuthStatus.unauthenticated:
        this.router.navigateByUrl('/auth');
        return;
    }
  });
}
