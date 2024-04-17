import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../API Management/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-confirm-delete-alert',
  templateUrl: './confirm-delete-alert.component.html',
  styleUrl: './confirm-delete-alert.component.css'
})
export class ConfirmDeleteAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false); // Return false when cancel button is clicked
  }

  onConfirmClick(): void {
    this.dialogRef.close(true); // Return true when confirm button is clicked
  }
}
