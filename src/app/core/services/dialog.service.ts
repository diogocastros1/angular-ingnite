import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Modal } from '@shared/ui/modal/modal';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly dialog = inject(MatDialog);

  confirm(title: string, message: string): Observable<boolean> {
    return this.dialog
      .open(Modal, {
        data: { title, message },
        width: '28rem',
      })
      .afterClosed()
      .pipe(map((result) => Boolean(result)));
  }
}
