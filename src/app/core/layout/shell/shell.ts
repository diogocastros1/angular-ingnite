import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  private readonly authService = inject(AuthService);
  private readonly loadingService = inject(LoadingService);

  readonly isDarkTheme = signal(false);
  readonly isLoading = this.loadingService.isLoading;
  readonly isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.isDarkTheme() ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this.isDarkTheme.update((current) => !current);
  }

  toggleAuthentication(): void {
    if (this.isAuthenticated()) {
      this.authService.logout();
      return;
    }

    this.authService.loginWithDemoToken();
  }
}
