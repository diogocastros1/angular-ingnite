import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly pendingCount = signal(0);

  readonly isLoading = computed(() => this.pendingCount() > 0);

  start(): void {
    this.pendingCount.update((current) => current + 1);
  }

  stop(): void {
    this.pendingCount.update((current) => Math.max(0, current - 1));
  }
}
