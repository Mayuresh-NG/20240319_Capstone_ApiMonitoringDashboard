import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../CORE/services/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../../CORE/services/search.service';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../CORE/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  email: string = '';

  constructor(
    private signupService: SignupService,
    private router: Router,
    private searchService: SearchService,
    private apiService: ApiService
  ) {}

  onSearchInputChange(event: any): void {
    const query = event.target.value; // Access value property safely
    this.searchService.setSearchQuery(query);
  }

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
