import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthStatus } from '../enums/auth-status.enum';
import { CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private _authStatus = signal<AuthStatus>(AuthStatus.unauthenticated);
  private _currentUser = signal<User | null>(null);

  public authStatus = computed(() => this._authStatus());
  public currentUser = computed(() => this._currentUser());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({user, token }) => this.setAuthentication(user, token)),
        catchError(e => throwError(() => e.error.message))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;

    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._currentUser.set(null);
          this._authStatus.set(AuthStatus.unauthenticated);

          return of(false);
        })
      )
  }

  logout(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
    this.router.navigateByUrl('auth');
  }

}
