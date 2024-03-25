import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private baseUrl = 'http://localhost:8000/monitor-api'; 

  constructor(private http: HttpClient) { }

  startMonitoring(apiId: string, monitoringInterval: number): Observable<any> {
    const url = `${this.baseUrl}/${apiId}`;
    const headers = new HttpHeaders().set('Monitoring-Interval', monitoringInterval.toString());
    return this.http.post<any>(url, null,{ headers}); 
  }

//   stopMonitoring(apiId:string): Observable<any> {
//     const url = `${this.baseUrl}/${apiId}/stop`;
//     return this.http.post<any>(url, null);
//   }
}
