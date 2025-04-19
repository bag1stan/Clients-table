import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../interfaces/client.interface';

interface UsersResponse {
  users: Client[];
}

@Injectable({providedIn: 'root'})
export class ClientsApiService {
  private readonly http = inject(HttpClient);

  get(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('/task1');
  }
}
