import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../CORE/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  email: string = '';

  constructor(private signupService: SignupService, private router: Router) {}

  userInfo: any;
  isDropdownOpen: boolean = false;
  viewProfile(): void {
    this.signupService.getUserInfo().subscribe(
      (response) => {
        console.log('User Info:', response);
        this.userInfo = response;
      },
      (error) => {
        console.error('Failed to fetch user info:', error);
      }
    );
  }

  logout(): void {
    this.signupService.logoutUser();
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
