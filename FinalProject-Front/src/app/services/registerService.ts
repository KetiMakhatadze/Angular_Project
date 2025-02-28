
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/dev';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${environment.API_URL}/register`, userData);
  }
}
