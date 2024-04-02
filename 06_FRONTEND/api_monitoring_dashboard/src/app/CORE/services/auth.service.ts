import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  signupUser(userData: any) {
    return this.http.post<any>(`${this.baseUrl}/signup`, userData);
  }

  loginUser(userData: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, userData).pipe(
      tap((response) => {
        // Save token to local storage
        localStorage.setItem('apitoken', response.token);
      })
    );
  }

  logoutUser() {
    // Remove token from local storage
    localStorage.removeItem('apitoken');
    const navigationExtras: NavigationExtras = { skipLocationChange: false };
    this.router.navigateByUrl('/landing', navigationExtras);
  }

  getToken() {
    // Retrieve token from local storage
    return localStorage.getItem('apitoken');
  }

  isLoggedIn() {
    // Check if token exists in local storage
    return !!this.getToken();
  }

  getUserInfo(): Observable<any> {
    // Assuming your API endpoint for user information is '/info'
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('apitoken')}`, // Retrieve the token from local storage
    });
    return this.http.get(`${this.baseUrl}/info`, { headers });
  }
}
