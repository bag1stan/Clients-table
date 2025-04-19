import {Routes} from '@angular/router';
import {MainPath} from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.Clients,
    loadChildren: () =>
      import('./clients/clients.routes').then((c) => c.clientsRoutes),
  },
  {
    path: '**',
    redirectTo: MainPath.Clients,
  },
];
