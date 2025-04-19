import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ClientsInfoComponent} from '../clients-info/clients-info.component';
import {KeyValuePipe, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {Client} from '../../interfaces/client.interface';
import {TableColumnSort} from './table-column-sort.interface';

const columns: Record<string, string> = {
  name: 'Имя',
  surname: 'Фамилия',
  email: 'E-mail',
  phone: 'Телефон'
}

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  imports: [
    NgIf,
    KeyValuePipe,
    MatRippleModule,
    MatButtonModule,
    ClientsInfoComponent,
  ],
})
export class ClientsTableComponent {
  @Input({required: true}) sort!: TableColumnSort;

  @Input() clients: Client[] = [];
  @Input() allSelected = false;
  @Input() anySelected = false;

  @Output() clientAdd = new EventEmitter<void>();
  @Output() clientEdit = new EventEmitter<Client>();
  @Output() clientDelete = new EventEmitter<void>();

  @Output() sortClick = new EventEmitter<string>();
  @Output() allToggle = new EventEmitter<void>();

  readonly columns = columns;

  onSortClick(column: keyof typeof this.columns): void {
    this.sortClick.emit(column);
  }

  onAllToggle(): void {
    this.allToggle.emit();
  }

  onClientDelete(): void {
    this.clientDelete.emit();
  }

  onClientAdd(): void {
    this.clientAdd.emit();
  }

  onClientEdit(client: Client): void {
    this.clientEdit.emit(client);
  }
}
