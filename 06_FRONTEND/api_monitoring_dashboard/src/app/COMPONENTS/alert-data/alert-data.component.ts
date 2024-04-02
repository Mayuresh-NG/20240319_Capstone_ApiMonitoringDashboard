import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alert-data',
  templateUrl: './alert-data.component.html',
  styleUrls: ['./alert-data.component.css'],
})
export class AlertDataComponent {
  @Input() selectedApiId: string = '';

  condition!: number;
  alerts: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const alertData = {
      apiConfigId: this.selectedApiId,
      condition: this.condition, // Example condition value
    };

    this.http
      .post<any>('http://localhost:3000/api/alerts', alertData)
      .subscribe(
        (response) => {
          console.log('Alert condition created successfully:', response);
          // Optionally, display a success message to the user
        },
        (error) => {
          console.error('Failed to create alert condition:', error);
          // Optionally, display an error message to the user
        }
      );
  }
}
