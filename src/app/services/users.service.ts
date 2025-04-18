import { inject, Injectable } from '@angular/core';
import { User, UsersApiService } from './users-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public clientsSubject$ = new BehaviorSubject<User[]>([]);
  public clients$ = this.clientsSubject$.asObservable();
  public apiService = inject(UsersApiService);
  public anySelectedSubject$ = new BehaviorSubject<boolean>(false);

  public get allSelected(): boolean {
    const clients = this.clientsSubject$.value;
    return clients.length > 0 && clients.every((client) => client.selected);
  }

  public get anySelected(): boolean {
    return this.clientsSubject$.value.some((client) => client.selected);
  }

  public get selectedCount(): number {
    return this.clientsSubject$.value.filter((client) => client.selected)
      .length;
  }

  public toggleAll(selected: boolean): void {
    const updatedClients = this.clientsSubject$.value.map((client) => ({
      ...client,
      selected,
    }));
    this.updateClients(updatedClients);
  }

  public addClient(clientData: User): void {
    const updatedClients = [...this.clientsSubject$.value, clientData];
    this.updateClients(updatedClients);
  }

  public editClient(clientEditData: User): void {
    const updatedClients = this.clientsSubject$.value.map((client) =>
      client.id === clientEditData.id ? clientEditData : client
    );
    this.updateClients(updatedClients);
  }

  public deleteClients(): void {
    const updatedClients = this.clientsSubject$.value.filter(
      (client) => !client.selected
    );
    this.updateClients(updatedClients);
  }

  public updateLocalStorage(user: User[]): void {
    localStorage.setItem('clients', JSON.stringify(user));
  }

  private updateClients(clients: User[]): void {
    this.clientsSubject$.next(clients);
    this.updateLocalStorage(clients);
  }
}
