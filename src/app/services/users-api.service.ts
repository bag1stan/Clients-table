import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  surname: string;
  email: string;
  phone: string;
  id: number;
  selected: boolean;
}

interface UsersResponse {
  users: User[];
}

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private http = inject(HttpClient);

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(
      'https://test-data.directorix.cloud/task1'
    );
  }
}
