import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  checkResponseTimes(apiConfigId: string, desiredThreshold: number): Observable<boolean> {
    return this.fetchChartData(apiConfigId).pipe(
      map(responseTimes => {
        const exceedThreshold = responseTimes.some(time => time > desiredThreshold);
        return exceedThreshold;
      })
    );
  }
  
  fetchpayload(apiConfigId: string): Observable<number[]> {
    const url = `${this.baseUrl}/getPaylodSize/${apiConfigId}`;
    return this.http.get<number[]>(url);
  }

  fetchthroughput(apiConfigId: string): Observable<number[]> {
    const url = `${this.baseUrl}/throughput/${apiConfigId}`;
    return this.http.get<number[]>(url);
  }

  fetchthReqCount(apiConfigId: string): Observable<number> {
    const url = `${this.baseUrl}/reqCount/${apiConfigId}`;
    return this.http.get<number>(url);
  }

  fetchResponseTimeStat(apiConfigId: string): Observable<{ peakResponseTime: number, minResponseTime: number }> {
    const url = `${this.baseUrl}/responseTimeStat/${apiConfigId}`;
    return this.http.get<{ peakResponseTime: number, minResponseTime: number }>(url);
  }

  fetchAverageStats(apiConfigId: string): Observable<any> {
    const url = `${this.baseUrl}/averageStats/${apiConfigId}`;
    return this.http.get<any>(url);
  }

  fetchP95AndP99ResponseTime(apiConfigId: string): Observable<any> {
    const url = `${this.baseUrl}/p95AndP99ResponseTime/${apiConfigId}`;
    return this.http.get<any>(url);
  }
}
