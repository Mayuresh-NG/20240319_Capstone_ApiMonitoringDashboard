import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../CORE/services/api.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  apis: any[] = []; // Basic structure for API data

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUserApis(); // Fetch user's APIs when component initializes
  }

  fetchUserApis(): void {
    // Call your API service to fetch user's APIs
    this.apiService.getApiConfigs().subscribe(
      (apis: any[]) => {
        this.apis = apis;
      },
      (error) => {
        console.error('Error fetching user APIs:', error);
      }
    );
  }

  onApiSelect(event: any): void {
    const apiId = event.target.value;
    // Implement logic to open analytics charts for the selected API
    console.log('Selected API:', apiId);
    // Redirect or open analytics charts here
  }
}
