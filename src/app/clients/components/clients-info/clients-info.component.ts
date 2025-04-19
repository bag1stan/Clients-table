import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output,} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {Client} from '../../interfaces/client.interface';

@Component({
  selector: 'app-clients-info',
  imports: [FormsModule],
  templateUrl: './clients-info.component.html',
  styleUrl: './clients-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsInfoComponent {
  @Input({required: true}) client!: Client;

  @Output() clientEdit = new EventEmitter<Client>();

  public onClientEdit(clientData: Client) {
    this.clientEdit.emit(clientData);
  }
}
