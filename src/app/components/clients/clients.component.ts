import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { ClientAddFormComponent } from '../../forms/client-add-form/client-add-form.component';
import { ClientEditFormComponent } from '../../forms/client-edit-form/client-edit-form.component';
import { ConfirmDeleteComponent } from '../../notifications/confirm-delete/confirm-delete.component';
import { AsyncPipe } from '@angular/common';
import { ClientsTableComponent } from './clients-table/clients-table.component';

@Component({
  selector: 'app-clients',
  imports: [AsyncPipe, ClientsTableComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  private readonly usersService: UsersService = inject(UsersService);
  private readonly dialog: MatDialog = inject(MatDialog);

  public clients$ = this.usersService.clients$;

  public get allSelected(): boolean {
    return this.usersService.allSelected;
  }

  public get anySelected(): boolean {
    return this.usersService.anySelected;
  }

  public ngOnInit() {
    const localStorageUsers = localStorage.getItem('clients');

    if (localStorageUsers && localStorageUsers !== '[]') {
      const clients = JSON.parse(localStorageUsers);
      this.usersService.clientsSubject$.next(clients);
    } else {
      this.usersService.apiService.getUsers().subscribe((usersApiResponse) => {
        const clients = usersApiResponse.users.map((client, id) => ({
          ...client,
          id,
        }));
        this.usersService.clientsSubject$.next(clients);
        localStorage.setItem('clients', JSON.stringify(clients));
      });
    }
  }

  public currentSort: { column: string; direction: 'asc' | 'desc' } = {
    column: '',
    direction: 'asc',
  };

  public onSort(column: string): void {
    const direction =
      this.currentSort.column === column && this.currentSort.direction === 'asc'
        ? 'desc'
        : 'asc';
    this.currentSort = { column, direction };

    const clients = [...this.usersService.clientsSubject$.value];
    this.usersService.clientsSubject$.next(
      clients.sort((a, b) => {
        const valueA = a[column as keyof User] || '';
        const valueB = b[column as keyof User] || '';
        const comparison = valueA
          .toString()
          .localeCompare(valueB.toString(), undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        return direction === 'asc' ? comparison : -comparison;
      })
    );
  }

  public toggleAll(): void {
    this.usersService.toggleAll(!this.allSelected);
  }

  public onDeleteClient(): void {
    if (!this.anySelected) {
      return;
    }

    const selectedCount = this.usersService.selectedCount;

    this.dialog
      .open(ConfirmDeleteComponent, {
        data: { selectedCounter: selectedCount },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.usersService.deleteClients();
        }
      });
  }

  public onAddClient(): void {
    this.dialog
      .open(ClientAddFormComponent, { data: { client: null } })
      .afterClosed()
      .subscribe((clientData) => {
        if (clientData === undefined) return;
        this.usersService.addClient(clientData);
      });
  }

  public onEditClient(client: User): void {
    this.dialog
      .open(ClientEditFormComponent, {
        data: { client: client },
      })
      .afterClosed()
      .subscribe((client) => {
        if (client === undefined) return;
        this.usersService.editClient(client);
      });
  }
}
