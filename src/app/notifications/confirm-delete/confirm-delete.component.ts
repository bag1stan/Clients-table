import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDeleteComponent>);
  public readonly data: {
    selectedCounter: number;
  } = inject(MAT_DIALOG_DATA);

  public confirmDelete(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}
