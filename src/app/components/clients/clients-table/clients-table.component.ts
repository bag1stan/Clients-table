import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../services/users-api.service';
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  imports: [
    ClientsInfoComponent,
    NgFor,
    CommonModule,
    MatButtonModule, // Ensure MatButtonModule is imported
    MatRippleModule,
  ],
})
export class ClientsTableComponent {
  @Input() clients: User[] | null = [];
  @Input() allSelected: boolean = false;
  @Input() anySelected: boolean = false;
  @Input() currentSort!: { column: string; direction: 'asc' | 'desc' };

  @Output() toggleAll = new EventEmitter<void>();
  @Output() deleteSelected = new EventEmitter<void>();
  @Output() addClient = new EventEmitter<void>();
  @Output() editClient = new EventEmitter<User>();
  @Output() sort = new EventEmitter<string>();

  public onSort(column: string): void {
    this.sort.emit(column); // Уведомляем родительский компонент
  }

  public onToggleAll(): void {
    this.toggleAll.emit();
  }

  public onDeleteClient(): void {
    this.deleteSelected.emit();
  }

  public onAddClient(): void {
    this.addClient.emit();
  }

  public onEditClient(client: User): void {
    this.editClient.emit(client);
  }
}
