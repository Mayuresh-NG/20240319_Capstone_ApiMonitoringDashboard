import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignupService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private signupService: SignupService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard canActivate called');
    console.log('IsLoggedIn:', this.signupService.isLoggedIn());

    if (this.signupService.isLoggedIn()) {
      return true;
    } else {
      console.log('User not logged in. Redirecting to landing page.');
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
