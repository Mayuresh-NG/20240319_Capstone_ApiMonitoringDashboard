import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: any;
  private apiUrl = 'http://localhost:3000/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  addApi(data: any): Observable<any> {
    // Get the token from local storage
    this.token = localStorage.getItem('apitoken');

    // Set the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', this.token);

    // Send the request with headers
    return this.http.post<any>(`${this.apiUrl}/config`, data, { headers });
  }

  getApiConfigs(): Observable<any[]> {
    // Get the token from local storage
    this.token = localStorage.getItem('apitoken');

    // Set the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', this.token);

    // Send the request with headers
    return this.http.get<any[]>(`${this.apiUrl}/loadapi`, { headers });
  }

  updateApi(apiId: string, updateData: any): Observable<any> {
    // Get the token from local storage
    this.token = localStorage.getItem('apitoken');

    // Set the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', this.token);

    // Send the request with headers
    return this.http.put<any>(`${this.apiUrl}/update/${apiId}`, updateData, { headers });
  }

  deleteApi(apiId: string): Observable<any> {
    // Get the token from local storage
    this.token = localStorage.getItem('apitoken');

    // Set the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', this.token);

    // Send the request with headers
    return this.http.delete<any>(`${this.apiUrl}/delete/${apiId}`, { headers });
  }
}
