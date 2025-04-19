import {inject, Injectable, INJECTOR} from '@angular/core';
import {ClientsState} from './state/clients.state';
import {Client} from './interfaces/client.interface';
import {ClientsService} from './services/clients.service';
import {Observable, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientsFacade {
  private readonly injector = inject(INJECTOR);
  private readonly clientsState = inject(ClientsState);
  private readonly clientsService = inject(ClientsService);

  readonly clients$ = this.clientsState.clients$;

  readonly isAllSelected$ = this.clientsState.isAllSelected$;
  readonly isAnySelected$ = this.clientsState.isAnySelected$;

  openClientDeleteConfirmDialog(injector = this.injector): Observable<boolean | undefined> {
    return this.clientsService.openClientDeleteConfirmDialog(this.clientsState.clients, injector).afterClosed();
  }

  getClients(): Observable<Client[]> {
    return this.clientsService.get().pipe(
      tap((clients) => this.clientsState.clients = clients)
    );
  }

  addClient(client: Client): void {
    this.clientsState.clients = [...this.clientsState.clients, client];
  }

  editClient(editedClient: Client): void {
    this.clientsState.clients = this.clientsState.clients.map((client) =>
      client.id === editedClient.id ? editedClient : client
    );
  }

  deleteClients(): void {
    this.clientsState.clients = this.clientsState.clients.filter(({selected}) => !selected);
  }

  toggleAll(selected: boolean): void {
    this.clientsState.clients = this.clientsState.clients.map((client) => ({
      ...client,
      selected,
    }));
  }
}
