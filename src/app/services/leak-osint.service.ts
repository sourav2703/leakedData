import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeakOsintService {

  private apiUrl = 'https://leakdatabackend.onrender.com/api/search';
  // private token = '6516013858:SxqsmEjZ';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      query: query,
      limit: 100,
      lang: 'en'
    });
  }
}