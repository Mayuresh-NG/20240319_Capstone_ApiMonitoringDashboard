import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../CORE/services/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../../CORE/services/search.service';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../CORE/services/api.service';
import Swal from 'sweetalert2';
import { SharedDataService } from '../../CORE/services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  email: string = '';
  currentTheme: string = '';
  private subscription: Subscription;
  constructor(
    private signupService: SignupService,
    private router: Router,
    private searchService: SearchService,
    private apiService: ApiService,
    private sharedDataService: SharedDataService,

  ) {this.subscription = this.sharedDataService.getData().subscribe(theme => {
    this.currentTheme = theme;
  });}
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
    this.sharedDataService.setData(this.currentTheme); 
  }

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'No, keep me logged in'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with logout
        this.signupService.logoutUser();
      } else {
        // User cancelled, do nothing
      }
    });
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
