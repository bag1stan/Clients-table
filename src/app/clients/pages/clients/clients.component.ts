import {ChangeDetectionStrategy, Component, DestroyRef, inject, Injector,} from '@angular/core';
import {ClientsFacade} from '../../clients.facade';
import {AsyncPipe} from '@angular/common';
import {ClientsTableComponent} from '../../components/clients-table/clients-table.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, tap} from 'rxjs';
import {TableColumnSort} from '../../components/clients-table/table-column-sort.interface';

@Component({
  selector: 'app-clients',
  imports: [AsyncPipe, ClientsTableComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly clientsFacade = inject(ClientsFacade);

  readonly clients$ = this.clientsFacade.clients$;

  readonly isAllSelected$ = this.clientsFacade.isAllSelected$;
  readonly isAnySelected$ = this.clientsFacade.isAnySelected$;

  readonly currentSort: TableColumnSort = {column: '', direction: 'asc'};

  constructor() {
    this.initClients();
  }

  onAllToggle(isAllSelected: boolean): void {
    this.clientsFacade.toggleAll(!isAllSelected);
  }

  onClientDelete(): void {
    this.clientsFacade.openClientDeleteConfirmDialog(this.injector)
      .pipe(
        filter(Boolean),
        tap(() => this.clientsFacade.deleteClients()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  private initClients(): void {
    this.clientsFacade.getClients().pipe(takeUntilDestroyed()).subscribe();
  }

  // todo
  // onSort(column: string): void {
  //   const direction =
  //     this.currentSort.column === column && this.currentSort.direction === 'asc'
  //       ? 'desc'
  //       : 'asc';
  //   this.currentSort = {column, direction};
  //
  //   const clients = [...this.clientsFacade.clientsSubject$.value];
  // todo перенести в утилиты:
  //   this.clientsFacade.clientsSubject$.next(
  //     clients.sort((a, b) => {
  //       const valueA = a[column as keyof Client] || '';
  //       const valueB = b[column as keyof Client] || '';
  //       const comparison = valueA
  //         .toString()
  //         .localeCompare(valueB.toString(), undefined, {
  //           numeric: true,
  //           sensitivity: 'base',
  //         });
  //       return direction === 'asc' ? comparison : -comparison;
  //     })
  //   );
  // }

  // todo
  // onAddClient(): void {
  //   this.dialog
  //     .open(ClientAddFormComponent, {data: {client: null}})
  //     .afterClosed()
  //     .pipe(
  //       tap((client) => this.clientsFacade.addClient(client))
  //     )
  //     .subscribe((clientData) => {
  //       if (clientData === undefined) return;
  //       this.clientsFacade.addClient(clientData);
  //     });
  // }
  // todo
  // onEditClient(client: Client): void {
  //   this.dialog
  //     .open(ClientEditFormComponent, {
  //       data: {client: client},
  //     })
  //     .afterClosed()
  //     .subscribe((client) => {
  //       if (client === undefined) return;
  //       this.clientsFacade.editClient(client);
  //     });
  // }
}
