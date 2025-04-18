import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../../services/users-api.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-info',
  imports: [FormsModule],
  templateUrl: './clients-info.component.html',
  styleUrl: './clients-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsInfoComponent {
  @Input() client!: User;

  @Output() editClient = new EventEmitter();

  public onEditClient(clientData: User) {
    this.editClient.emit(clientData);
  }
}
