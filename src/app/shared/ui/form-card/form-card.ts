import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-card',
  imports: [MatCardModule],
  templateUrl: './form-card.html',
  styleUrl: './form-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCard {
  @Input({ required: true }) title = '';
  @Input() description = '';
}
