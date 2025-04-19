import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {Client} from '../interfaces/client.interface';
import {StorageKey} from '../../shared/enums/storage-key.enum';
import {LocalStorageService} from '../../shared/utils/local-storage.service';

@Injectable({providedIn: 'root'})
export class ClientsState {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly clients$$ = new BehaviorSubject<Client[]>([]);

  readonly clients$ = this.clients$$.asObservable();

  get clients(): Client[] {
    return this.clients$$.getValue();
  }

  set clients(clients: Client[]) {
    this.clients$$.next(clients);
    this.localStorageService.set(StorageKey.Clients, clients);
  }

  readonly isAllSelected$ = this.clients$$.pipe(
    map((clients) => clients.length > 0 && clients.every(({selected}) => selected))
  )

  readonly isAnySelected$ = this.clients$$.pipe(
    map((clients) => clients.some(({selected}) => selected))
  )
}
