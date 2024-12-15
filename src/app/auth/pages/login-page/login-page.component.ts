import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})

export default class LoginPageComponent {
  constructor(private router: Router) {}

  onLogin() {
    this.router.navigate(['/auth/home'], { skipLocationChange: false });
  }
}
