import { Component } from '@angular/core';
import { ApiService } from '../../CORE/services/api.service';

@Component({
  selector: 'app-api-management',
  templateUrl: './api-management.component.html',
  styleUrl: './api-management.component.css',
})
export class ApiManagementComponent {
  ngOnInit(): void {
    this.fetchApiConfigs();
  }
  apis: Api[] = [];
  constructor(private apiService: ApiService) {}

  addApi(): void {
    const newApiData = {
      // Provide the data for the new API configuration
      apiUrl: 'http:localhost:3000/data',
      name: 'New API',
      monitoringInterval: 30000, // Example monitoring interval in milliseconds
    };

    this.apiService.addApi(newApiData).subscribe(
      (response) => {
        console.log('API added successfully:', response);
        // Handle success, if needed
      },
      (error) => {
        console.error('Failed to add API:', error);
        // Handle error, if needed
      }
    );
    this.fetchApiConfigs();
  }

  saveChanges(api: any): void {
    // Call the API service to update the API configuration
    this.apiService
      .updateApi(api._id, {
        name: api.name,
        apiUrl: api.apiUrl,
        monitoringInterval: api.monitoringInterval,
      })
      .subscribe(
        (updatedApi) => {
          // Update the API data in the frontend if the update is successful
          api.editMode = false; // Exit edit mode
        },
        (error) => {
          console.error('Failed to update API:', error);
          // Handle error (if needed)
        }
      );
  }

  deleteApi(api: any): void {
    this.apiService.deleteApi(api._id).subscribe(
      () => {
        console.log('API deleted successfully');
        // Optionally, update the UI to reflect the deletion
      },
      (error) => {
        console.error('Failed to delete API:', error);
        // Handle error
      }
    );
    this.fetchApiConfigs();
  }

  fetchApiConfigs(): void {
    this.apiService.getApiConfigs().subscribe(
      (configs) => {
        this.apis = configs;
      },
      (error) => {
        console.error('Failed to fetch API configurations:', error);
        // Handle error (if needed)
      }
    );
  }

  editApi(api: any): void {
    api.editMode = true;
    api.previousValues = { ...api };
  }

  cancelEdit(api: Api): void {
    // Restore previous values
    Object.assign(api, api.previousValues);
    api.editMode = false;
  }

  startMonitoring(api: Api): void {
    // Implement start monitoring functionality
  }
}

export class Api {
  editMode: boolean = false; // Add editMode property
  previousValues!: Partial<Api>; // Add previousValues property

  constructor(
    public name: string,
    public apiUrl: string,
    public monitoringInterval: number
  ) {}
}
