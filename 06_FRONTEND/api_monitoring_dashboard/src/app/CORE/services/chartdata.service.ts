import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private baseUrl = 'http://localhost:3000/monitor-data/'; 

  constructor(private http: HttpClient) {}

  fetchChartData(apiConfigId: string): Observable<number[]> {
    const url = `${this.baseUrl}/getResponseTime/${apiConfigId}`;
    return this.http.get<number[]>(url);
  }

  fetchpayload(apiConfigId: string): Observable<number[]> {
    const url = `${this.baseUrl}/getPaylodSize/${apiConfigId}`;
    return this.http.get<number[]>(url);
  }
}
