import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../services/users-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-add-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './client-add-form.component.html',
  styleUrl: './client-add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddFormComponent implements OnInit {
  @Output() createUser = new EventEmitter();

  private readonly dialogRef = inject(MatDialogRef<ClientAddFormComponent>);
  public readonly data: { client: User } = inject(MAT_DIALOG_DATA);

  public get messageTooltip(): string {
    return this.data.client
      ? 'Редактировать данные пользователя'
      : 'Добавить пользователя';
  }

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^(\+7|8)\d{10}$/)]),
    id: new FormControl(Date.now()),
    selected: new FormControl(false),
  });

  public ngOnInit(): void {
    if (this.data.client) {
      this.form.patchValue(this.data.client);
    }
  }

  public applayChangesForm(): void {
    this.dialogRef.close(this.form.value);
    this.form.reset();
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
