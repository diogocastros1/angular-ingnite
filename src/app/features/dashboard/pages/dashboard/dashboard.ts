import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { interval, map, take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly destroyRef = inject(DestroyRef);

  readonly metrics = signal({ uptime: '0m', usersOnline: 0, errorRate: 0.0 });

  constructor() {
    interval(1500)
      .pipe(
        take(4),
        map((tick) => ({
          uptime: `${tick + 1}m`,
          usersOnline: 120 + tick * 3,
          errorRate: Number((0.2 + tick * 0.05).toFixed(2)),
        })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((next) => this.metrics.set(next));
  }
}
