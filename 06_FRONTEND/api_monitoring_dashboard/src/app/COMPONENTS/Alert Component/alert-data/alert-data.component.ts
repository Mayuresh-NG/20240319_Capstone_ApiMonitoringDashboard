import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { SignupService } from '../../../CORE/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteAlertComponent } from '../confirm-delete-alert/confirm-delete-alert.component';
import { ApiService } from '../../../CORE/services/api.service';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../../CORE/services/storage.service';

@Component({
  selector: 'app-alert-data',
  templateUrl: './alert-data.component.html',
  styleUrls: ['./alert-data.component.css'],
})
export class AlertDataComponent implements OnDestroy, OnInit {
  @Input() selectedApiId: string = '';
  currentTheme: string = '';
  private subscription: Subscription;
  condition!: number;
  alerts: any[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private http: HttpClient,
    private signupService: SignupService,
    private dialog: MatDialog,
    private apiService: ApiService
  ) {
    this.subscription = this.sharedDataService.getData().subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  userInfo: any;
  ReceivedAlerts: any[] = [];

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }

  ngOnInit(): void {
    this.signupService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response;

        // Fetch alerts after getting user info
        this.fetchAlerts();
      },
      (error) => {
        console.error('Failed to fetch user info:', error);
      }
    );
  }

  fetchAlerts(): void {
    if (this.userInfo && this.userInfo._id) {
      this.http
        .get<any>(`http://localhost:3000/api/getAlerts/${this.userInfo._id}`)
        .subscribe(
          (response) => {
            console.log('All alerts:', response);
            this.ReceivedAlerts = response;
          },
          (error) => {
            console.error('Failed to get alerts:', error);
          }
        );
    } else {
      console.error('User info not available');
    }
  }

  onSubmit(): void {
    const alertData = {
      userId: this.userInfo._id,
      apiConfigId: this.selectedApiId,
      condition: this.condition,
    };

    console.log(typeof alertData.userId);
    this.http
      .post<any>('http://localhost:3000/api/alerts', alertData)
      .subscribe(
        (response) => {
          console.log('Alert condition created successfully:', response);
          this.fetchAlerts();
        },
        (error) => {
          console.error('Failed to create alert condition:', error);
          // Optionally, display an error message to the user
        }
      );
  }

  confirmDeleteAlert(alert_id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteAlertComponent, {
      panelClass: 'confirmation-dialog-container',
      width: '400px', // Adjust width as needed
      data: {
        title: 'Confirmation',
        message: `Are you sure you want to delete the Alert '${alert_id}'?`, // Confirmation message with API name
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed action, proceed with deletion
        this.deleteApi(alert_id); // Pass the API object to the delete function
      } else {
        // User canceled action
        console.log('Action canceled');
      }
    });
  }

  deleteApi(api: any): void {
    this.apiService.deleteAlert(api._id).subscribe(
      () => {
        console.log('API deleted successfully');
        this.fetchAlerts();
        // Optionally, update the UI to reflect the deletion
      },
      (error) => {
        console.error('Failed to delete API:', error);
        // Handle error
      }
    );
  }
}
