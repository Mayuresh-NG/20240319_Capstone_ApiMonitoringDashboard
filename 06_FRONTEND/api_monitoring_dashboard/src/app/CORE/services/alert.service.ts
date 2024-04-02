import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

  sendAlert(apiId: string, message: string): Observable<any> {
    return this.http.post<any>(`/api/alert/${apiId}`, { message });
  }
}
