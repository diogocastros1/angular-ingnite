import { computed, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly token = signal(localStorage.getItem(environment.authStorageKey));

  readonly isAuthenticated = computed(() => Boolean(this.token()));

  getToken(): string | null {
    return this.token();
  }

  loginWithDemoToken(): void {
    const demoToken = 'demo-jwt-token-for-starter-template';
    localStorage.setItem(environment.authStorageKey, demoToken);
    this.token.set(demoToken);
  }

  logout(): void {
    localStorage.removeItem(environment.authStorageKey);
    this.token.set(null);
  }
}
