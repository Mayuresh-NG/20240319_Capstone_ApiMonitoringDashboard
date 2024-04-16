import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../CORE/services/api.service';
import { SearchService } from '../../CORE/services/search.service';
import { Subscription } from 'rxjs';
import { MonitorService } from '../../CORE/services/monitor.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import Swal from 'sweetalert2';
import { SharedDataService } from '../../CORE/services/storage.service';

@Component({
  selector: 'app-api-management',
  templateUrl: './api-management.component.html',
  styleUrl: './api-management.component.css',
})
export class ApiManagementComponent implements OnInit, OnDestroy {
  monitoringInProgress = false;
  filteredApis: Api[] = [];
  searchQuerySubscription = new Subscription();
  
  currentTheme: string = '';
  private subscription: Subscription;

  ngOnInit(): void {
    this.fetchApiConfigs();
    this.searchQuerySubscription = this.searchService.searchQuery$.subscribe(
      (query) => {
        this.filterApis(query);
      }
    );
  }

  ngOnDestroy(): void {
    this.searchQuerySubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  apis: Api[] = [];

  constructor(
    private apiService: ApiService,
    private searchService: SearchService,
    private monitorService: MonitorService,
    private sharedDataService: SharedDataService,
    private dialog: MatDialog
  ) {this.subscription = this.sharedDataService.getData().subscribe(theme => {
    this.currentTheme = theme;
  });}

  toggleMonitoring(api: any, event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    if (!api.monitoringInProgress) {
      Swal.fire({
        icon: 'info',
        title: 'Start Monitoring?',
        text: 'Do you want to start monitoring for this API?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Start Monitoring',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.startMonitoring(api, event);
          button.classList.add('monitoring-active');
          api.monitoringInProgress = true;
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Stop Monitoring?',
        text: 'Do you want to stop monitoring for this API?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Stop Monitoring',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.stopMonitoring(api , event);
          button.classList.remove('monitoring-active');
          api.monitoringInProgress = false;
        }
      });
    }
  }
  

  stopMonitoring(api: any, event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    button.classList.remove('monitoring-active');
    console.log('stop monitoring clicked');
    // Call the service to stop monitoring
    this.monitorService.stopMonitoring().subscribe(
      () => {
        this.monitoringInProgress = false;
      },
      (error) => {
        console.error('Error stopping monitoring:', error);
      }
    );
  }

  filterApis(query: string): void {
    if (!query) {
      // If the search query is empty or null, show all APIs
      this.filteredApis = this.apis;
    } else {
      // Filter the APIs based on the search query
      this.filteredApis = this.apis.filter(
        (api) =>
          api.name.toLowerCase().includes(query.toLowerCase()) ||
          api.apiUrl.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  addApi(): void { 
    const newApiData = {
      // Provide the data for the new API configuration
      apiUrl: 'http:localhost:3000/data',
      name: 'New API',
      monitoringInterval: 30000,
    };

    this.apiService.addApi(newApiData).subscribe(
      (response) => {
        console.log('API added successfully:', response);
        this.fetchApiConfigs();
      },
      (error) => {
        console.error('Failed to add API:', error);
      }
    );
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

  confirmDeleteApi(api: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'confirmation-dialog-container',
      width: '400px', // Adjust width as needed
      data: {
        title: 'Confirmation',
        message: `Are you sure you want to delete the API '${api.name}'?` // Confirmation message with API name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed action, proceed with deletion
        this.deleteApi(api); // Pass the API object to the delete function
      } else {
        // User canceled action
        console.log('Action canceled');
      }
    });
  }

  deleteApi(api: any): void {
    this.apiService.deleteApi(api._id).subscribe(
      () => {
        console.log('API deleted successfully');
        this.fetchApiConfigs();
        // Optionally, update the UI to reflect the deletion
      },
      (error) => {
        console.error('Failed to delete API:', error);
        // Handle error
      }
    );
  }

  fetchApiConfigs(): void {
    this.apiService.getApiConfigs().subscribe(
      (configs) => {
        this.apis = configs;
        this.filterApis('');
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

  startMonitoring(api: any, event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    button.classList.add('monitoring-active');
    this.monitorService
      .startMonitoring(api._id, api.monitoringInterval)
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('Monitoring started successfully:', response);
          api.monitoringInProgress = true;
        },
        (error) => {
          // Handle error
          console.error('Error starting monitoring:', error);
        }
      );
  }
}

export class Api {
  editMode: boolean = false; 
  previousValues!: Partial<Api>;
  monitoringInProgress: boolean = false;

  constructor(
    public name: string,
    public apiUrl: string,
    public monitoringInterval: number
  ) {}
}
