
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/dev';

@Injectable({ providedIn: 'root' })
export class InfoService {

  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${environment.API_URL}/info`, { headers });
      }
    }
    return of(null);
  }
}
