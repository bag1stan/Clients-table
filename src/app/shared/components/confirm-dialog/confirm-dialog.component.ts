import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent,} from '@angular/material/dialog';
import {ConfirmDialogData} from './confirm-dialog-data.interface';
import {SafeHtmlPipe} from '../../pipes/safe-html.pipe';


@Component({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    SafeHtmlPipe,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  private readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  readonly title = this.data.title;
  readonly content = this.data.content;
  readonly submitButtonText = this.data.submitButtonText;
}
