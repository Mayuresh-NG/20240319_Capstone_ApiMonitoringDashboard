// Import necessary modules and components
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupService } from '../../CORE/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css'],
})
export class LoginPopupComponent {
  showAlert: any;
  showAlerts: any;
  constructor(
    public dialogRef: MatDialogRef<LoginPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router,
    private signupService: SignupService,
    private snackBar: MatSnackBar
  ) {}

  // Close the dialog
  closePopup(): void {
    this.dialogRef.close();
  }

  openPopup(): void {
    // Close the current dialog
    this.closePopup();
    // Open the SignupPopupComponent dialog
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Log when the popup is closed
      console.log('The popup was closed');
    });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgotpassword']);
    this.closePopup();
  }

  email: string = ''; // Initialize username variable
  emailInputFocused: boolean = false; // Track if username input is focused
  passwordInputFocused: boolean = false; // Track if password input is focused
  password: string = ''; // Initialize password variable

  onContinueClick(): void {
    console.log('Username:', this.email); // Log username when "Continue" button is clicked
    console.log('Password:', this.password); // Log password when "Continue" button is clicked
  }

  login() {
    const userData = {
      email: this.email,
      password: this.password,
    };
  
    this.signupService.loginUser(userData).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful!', response);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          confirmButtonColor: '#344E41', // Custom confirm button color
          confirmButtonText: 'Continue to Dashboard', // Custom confirm button text
          showCancelButton: false, // Hide the cancel button
          allowOutsideClick: false, // Prevent dismissing the alert by clicking outside
          allowEscapeKey: false, // Prevent dismissing the alert by pressing the Escape key
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/dashboard-data']);
            this.closePopup();
          }
        });
      },
      (error) => {
        // Handle login error
        console.error('Login failed!', error);
        if (error.status === 400) {
          this.showAlerts = true;
        }
      }
    );
  }
  
  

  hideAlert() {
    this.showAlert = false;
  }
}
