
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/dev';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userData: {email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.API_URL}/login`, userData);
  }
}
