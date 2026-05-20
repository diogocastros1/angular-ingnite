import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`);
  }

  post<T, TBody>(path: string, body: TBody): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body);
  }

  put<T, TBody>(path: string, body: TBody): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`);
  }
}
