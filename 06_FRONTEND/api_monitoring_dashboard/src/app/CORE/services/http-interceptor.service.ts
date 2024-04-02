import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    return next.handle(request).pipe(
      tap(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        if (responseTime > 5000) { // Example threshold value (in milliseconds)
          this.alertService.sendAlert(request.url, `Response time exceeded threshold: ${responseTime}ms`).subscribe(
            () => console.log('Alert sent successfully'),
            error => console.error('Error sending alert:', error)
          );
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
