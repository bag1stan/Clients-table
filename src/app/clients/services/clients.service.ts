import {inject, Injectable, Injector} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Client} from '../interfaces/client.interface';
import {LocalStorageService} from '../../shared/utils/local-storage.service';
import {StorageKey} from '../../shared/enums/storage-key.enum';
import {ClientsApiService} from './clients-api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogData} from '../../shared/components/confirm-dialog/confirm-dialog-data.interface';
import {injectMatDialog} from '../../shared/utils/inject-mat-dialog.util';

@Injectable({providedIn: 'root'})
export class ClientsService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly clientsApiService = inject(ClientsApiService);

  get(): Observable<Client[]> {
    const clientsFromStorage = this.localStorageService.get<Client[]>(StorageKey.Clients);

    if (clientsFromStorage?.length) {
      return of(clientsFromStorage);
    }

    return this.clientsApiService.get().pipe(
      map(({users}) => users.map(
        (client, id): Client => ({...client, id}))
      )
    );
  }

  openClientDeleteConfirmDialog(clients: Client[], injector: Injector): MatDialogRef<unknown, boolean> {
    return injectMatDialog(injector)
      .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
        data: {
          title: 'Удаление строк',
          content: `<h3 style="font-weight: 500;font-size: 24px">Удалить выбранные строки (${clients.length})?</h3>`,
          submitButtonText: 'Удалить'
        }
      })
  }
}
