import {Route} from '@angular/router';

export const clientsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/clients/clients.component').then(
        (c) => c.ClientsComponent
      ),
  },
]
