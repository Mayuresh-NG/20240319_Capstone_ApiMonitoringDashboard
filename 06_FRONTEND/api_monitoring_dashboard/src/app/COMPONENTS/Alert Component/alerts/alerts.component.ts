import { Component } from '@angular/core';
import { ApiService } from '../../../CORE/services/api.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css',
})
export class AlertsComponent {
  apis: any[] = []; // Basic structure for API data
  selectedApiId: string = '';

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
    this.selectedApiId = event.target.value;
    console.log(this.selectedApiId);
  }
}
