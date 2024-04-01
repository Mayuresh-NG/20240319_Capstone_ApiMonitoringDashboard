import { Component} from '@angular/core';
import { ApiService } from '../../CORE/services/api.service';

@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrl: './dashboard-data.component.css',
})
export class DashboardDataComponent{
  apis: any[] = []; // Basic structure for API data
  selectedApiId: string="";

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
  }
}
