import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface ModalData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  readonly data = inject<ModalData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<Modal>);

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
