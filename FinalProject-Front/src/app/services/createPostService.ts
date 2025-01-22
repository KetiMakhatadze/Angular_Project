
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/dev';

@Injectable({ providedIn: 'root' })
export class CreatePostService {

  constructor(private http: HttpClient) { }

  createPost(data: {title: string, description: string}): Observable<any> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if(token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.post(`${environment.API_URL}/posts/create`, data, {headers});
      }
    }
    return of(null);
  }
}
